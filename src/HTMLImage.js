import React, { PureComponent } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const defaultImageStyle = { resizeMode: "cover" };
const emptyObject = {};

const styles = StyleSheet.create({
  image: { resizeMode: "cover" },
  errorBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "lightgray",
    overflow: "hidden",
    justifyContent: "center",
  },
  errorText: { textAlign: "center", fontStyle: "italic" },
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
  },
});

function attemptParseFloat(value) {
  const result = parseFloat(value);
  return Number.isNaN(result) ? null : result;
}

function normalizeSize(
  dimension,
  { containerDimension = null, enablePercentWidth = false } = {}
) {
  if (
    dimension === null ||
    dimension === undefined ||
    Number.isNaN(dimension)
  ) {
    return null;
  }
  if (typeof dimension === "number") {
    return dimension;
  }
  if (typeof dimension === "string") {
    if (
      dimension.search("%") !== -1 &&
      enablePercentWidth &&
      typeof containerDimension === "number"
    ) {
      const parsedFloat = attemptParseFloat(dimension);
      if (Number.isNaN(parsedFloat)) {
        return null;
      }
      return (parsedFloat * containerDimension) / 100;
    } else if (dimension.trim().match(/^[\d.]+$/)) {
      return attemptParseFloat(dimension);
    }
  }
  return null;
}

function extractHorizontalSpace({
  marginHorizontal,
  leftMargin,
  rightMargin,
  margin,
} = {}) {
  const realLeftMargin = leftMargin || marginHorizontal || margin || 0;
  const realRightMargin = rightMargin || marginHorizontal || margin || 0;
  return realLeftMargin + realRightMargin;
}

function deriveRequiredDimensionsFromProps({
  width,
  height,
  enablePercentWidth,
  contentWidth,
  flatStyle,
}) {
  const normalizeOptionsWidth = {
    enablePercentWidth,
    containerDimension: contentWidth,
  };
  const normalizeOptionsHeight = {
    enablePercentWidth: false,
  };
  const styleWidth = normalizeSize(flatStyle.width, normalizeOptionsWidth);
  const styleHeight = normalizeSize(flatStyle.height, normalizeOptionsHeight);
  const widthProp = normalizeSize(width, normalizeOptionsWidth);
  const heightProp = normalizeSize(height, normalizeOptionsHeight);
  return {
    width: typeof widthProp === "number" ? widthProp : styleWidth,
    height: typeof heightProp === "number" ? heightProp : styleHeight,
  };
}

function scaleUp(minDimensions, desiredDimensions) {
  const aspectRatio = desiredDimensions.width / desiredDimensions.height;
  if (desiredDimensions.width < minDimensions.width) {
    return scaleUp(minDimensions, {
      width: minDimensions.width,
      height: minDimensions.width / aspectRatio,
    });
  }
  if (desiredDimensions.height < minDimensions.height) {
    return scaleUp(minDimensions, {
      height: minDimensions.height,
      width: minDimensions.height * aspectRatio,
    });
  }
  return desiredDimensions;
}

function scaleDown(maxDimensions, desiredDimensions) {
  const aspectRatio = desiredDimensions.width / desiredDimensions.height;
  if (desiredDimensions.width > maxDimensions.width) {
    return scaleDown(maxDimensions, {
      width: maxDimensions.width,
      height: maxDimensions.width / aspectRatio,
    });
  }
  if (desiredDimensions.height > maxDimensions.height) {
    return scaleDown(maxDimensions, {
      height: maxDimensions.height,
      width: maxDimensions.height * aspectRatio,
    });
  }
  return desiredDimensions;
}

function scale({ minBox, maxBox }, originalBox) {
  return scaleDown(maxBox, scaleUp(minBox, originalBox));
}

function sourcesAreEqual(source1, source2) {
  return (
    (source1 && source2 && source1.uri === source2.uri) || source1 === source2
  );
}

function identity(arg) {
  return arg;
}

function computeImageBoxDimensions(params) {
  const {
    computeImagesMaxWidth,
    contentWidth,
    flattenStyles,
    imagePhysicalWidth,
    imagePhysicalHeight,
    requiredWidth,
    requiredHeight,
  } = params;
  const horizontalSpace = extractHorizontalSpace(flattenStyles);
  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 0,
    minHeight = 0,
  } = flattenStyles;
  const imagesMaxWidth =
    typeof contentWidth === "number"
      ? computeImagesMaxWidth(contentWidth)
      : Infinity;
  const minBox = {
    width: minWidth,
    height: minHeight,
  };
  const maxBox = {
    width:
      Math.min(
        imagesMaxWidth,
        maxWidth,
        typeof requiredWidth === "number" ? requiredWidth : Infinity
      ) - horizontalSpace,
    height: Math.min(
      typeof requiredHeight === "number" ? requiredHeight : Infinity,
      maxHeight
    ),
  };
  if (typeof requiredWidth === "number" && typeof requiredHeight === "number") {
    return scale(
      { minBox, maxBox },
      {
        width: requiredWidth,
        height: requiredHeight,
      }
    );
  }
  if (imagePhysicalWidth != null && imagePhysicalHeight != null) {
    return scale(
      { minBox, maxBox },
      {
        width: imagePhysicalWidth,
        height: imagePhysicalHeight,
      }
    );
  }
  return null;
}

export default class HTMLImage extends PureComponent {
  __cachedFlattenStyles = null;
  __cachedRequirements = null;

  constructor(props) {
    super(props);
    this.invalidateRequirements(props);
    const state = {
      imagePhysicalWidth: null,
      imagePhysicalHeight: null,
      requiredWidth: this.__cachedRequirements.width,
      requiredHeight: this.__cachedRequirements.height,
      imageBoxDimensions: null,
    };
    this.state = {
      ...state,
      imageBoxDimensions: this.computeImageBoxDimensions(props, state),
    };
  }

  static propTypes = {
    source: PropTypes.object.isRequired,
    alt: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    computeImagesMaxWidth: PropTypes.func.isRequired,
    contentWidth: PropTypes.number,
    enableExperimentalPercentWidth: PropTypes.bool,
    imagesInitialDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  };

  static defaultProps = {
    enableExperimentalPercentWidth: false,
    computeImagesMaxWidth: identity,
    imagesInitialDimensions: {
      width: 100,
      height: 100,
    },
  };

  invalidateRequirements(props) {
    const {
      width,
      height,
      contentWidth,
      enableExperimentalPercentWidth,
      style,
    } = props;
    this.__cachedFlattenStyles = StyleSheet.flatten(style) || emptyObject;
    this.__cachedRequirements = deriveRequiredDimensionsFromProps({
      width,
      height,
      contentWidth,
      enablePercentWidth: enableExperimentalPercentWidth,
      flatStyle: this.__cachedFlattenStyles,
    });
  }

  computeImageBoxDimensions(props, state) {
    const { computeImagesMaxWidth, contentWidth } = props;
    const {
      imagePhysicalWidth,
      imagePhysicalHeight,
      requiredWidth,
      requiredHeight,
    } = state;
    const imageBoxDimensions = computeImageBoxDimensions({
      flattenStyles: this.__cachedFlattenStyles,
      computeImagesMaxWidth,
      contentWidth,
      imagePhysicalWidth,
      imagePhysicalHeight,
      requiredWidth,
      requiredHeight,
    });
    return imageBoxDimensions;
  }

  componentDidMount() {
    this.mounted = true;
    if (this.state.requiredWidth == null || this.state.requiredHeight == null) {
      this.fetchPhysicalImageDimensions();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    const sourceHasChanged = !sourcesAreEqual(
      prevProps.source,
      this.props.source
    );
    const requirementsHaveChanged =
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      prevProps.style !== this.props.style;
    const shouldRecomputeImageBox =
      requirementsHaveChanged ||
      this.state.imagePhysicalWidth !== prevState.imagePhysicalWidth ||
      this.state.imagePhysicalHeight !== prevState.imagePhysicalHeight ||
      this.props.contentWidth !== prevProps.contentWidth ||
      this.props.computeImagesMaxWidth !== prevProps.computeImagesMaxWidth;

    if (requirementsHaveChanged) {
      this.invalidateRequirements(this.props);
      this.setState({
        requiredWidth: this.__cachedRequirements.width,
        requiredHeight: this.__cachedRequirements.height,
      });
    }
    if (sourceHasChanged) {
      if (
        this.__cachedRequirements.width === null ||
        this.__cachedRequirements.height === null
      ) {
        this.fetchPhysicalImageDimensions();
      }
    }
    if (shouldRecomputeImageBox) {
      this.setState((state, props) => ({
        imageBoxDimensions: this.computeImageBoxDimensions(props, state),
      }));
    }
  }

  fetchPhysicalImageDimensions(props = this.props) {
    const { source } = props;
    source &&
      source.uri &&
      Image.getSize(
        source.uri,
        (imagePhysicalWidth, imagePhysicalHeight) => {
          this.mounted &&
            this.setState({
              imagePhysicalWidth,
              imagePhysicalHeight,
              error: false,
            });
        },
        () => {
          this.mounted && this.setState({ error: true });
        }
      );
  }

  renderImage(imageBoxDimensions) {
    const { source, style } = this.props;
    return (
      <Image
        source={source}
        style={[defaultImageStyle, style, imageBoxDimensions]}
        testID="image-layout"
      />
    );
  }

  renderAlt() {
    return (
      <View style={styles.errorBox} testID="image-error">
        {this.props.alt ? (
          <Text style={styles.errorText}>{this.props.alt}</Text>
        ) : (
          false
        )}
      </View>
    );
  }

  renderPlaceholder() {
    return (
      <View
        style={this.props.imagesInitialDimensions}
        testID="image-placeholder"
      />
    );
  }

  renderContent() {
    const { error, imageBoxDimensions } = this.state;
    if (error) {
      return this.renderAlt();
    }
    if (imageBoxDimensions === null) {
      return this.renderPlaceholder();
    }
    return this.renderImage(imageBoxDimensions);
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}
