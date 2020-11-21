import React, { ComponentClass, ComponentType, PureComponent } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageStyle,
  PressableProps
} from 'react-native';
import PropTypes from 'prop-types';
import GenericPressable from '../GenericPressable';
import { ImageDimensions } from '../shared-types';

export interface ImgDimensions {
  width: number;
  height: number;
}

export interface ImgTagProps {
  source: any;
  alt?: string;
  height?: string | number;
  width?: string | number;
  style: ImageStyle;
  testID?: string;
  computeImagesMaxWidth?: (containerWidth: number) => number;
  onPress?: PressableProps['onPress'];
  altColor?: string;
  contentWidth: number;
  enableExperimentalPercentWidth?: boolean;
  imagesInitialDimensions: ImgDimensions;
}

const defaultImageStyle: ImageStyle = { resizeMode: 'cover' };
const emptyObject = {};

const styles = StyleSheet.create({
  image: { resizeMode: 'cover' },
  errorBox: {
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden',
    justifyContent: 'center'
  },
  errorText: { textAlign: 'center', fontStyle: 'italic' },
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

function attemptParseFloat(value: any) {
  const result = parseFloat(value);
  return Number.isNaN(result) ? null : result;
}

function normalizeSize(
  dimension: string | number,
  options: Partial<{
    containerDimension: number | null;
    enablePercentWidth: boolean;
  }> = {}
) {
  const containerDimension = options.containerDimension || null;
  const enablePercentWidth = options.enablePercentWidth || false;
  if (
    dimension === null ||
    dimension === undefined ||
    Number.isNaN(dimension)
  ) {
    return null;
  }
  if (typeof dimension === 'number') {
    return dimension;
  }
  if (typeof dimension === 'string') {
    if (
      dimension.search('%') !== -1 &&
      enablePercentWidth &&
      typeof containerDimension === 'number'
    ) {
      const parsedFloat = attemptParseFloat(dimension);
      if (parsedFloat === null || Number.isNaN(parsedFloat)) {
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
  margin
}: any = {}) {
  const realLeftMargin = leftMargin || marginHorizontal || margin || 0;
  const realRightMargin = rightMargin || marginHorizontal || margin || 0;
  return realLeftMargin + realRightMargin;
}

function deriveRequiredDimensionsFromProps({
  width,
  height,
  enablePercentWidth,
  contentWidth,
  flatStyle
}: any): ImgDimensions {
  const normalizeOptionsWidth = {
    enablePercentWidth,
    containerDimension: contentWidth
  };
  const normalizeOptionsHeight = {
    enablePercentWidth: false
  };
  const styleWidth = normalizeSize(flatStyle.width, normalizeOptionsWidth);
  const styleHeight = normalizeSize(flatStyle.height, normalizeOptionsHeight);
  const widthProp = normalizeSize(width, normalizeOptionsWidth);
  const heightProp = normalizeSize(height, normalizeOptionsHeight);
  return {
    width: typeof widthProp === 'number' ? widthProp : (styleWidth as number),
    height:
      typeof heightProp === 'number' ? heightProp : (styleHeight as number)
  };
}

function scaleUp(
  minDimensions: ImgDimensions,
  desiredDimensions: ImgDimensions
): ImgDimensions {
  const aspectRatio = desiredDimensions.width / desiredDimensions.height;
  if (desiredDimensions.width < minDimensions.width) {
    return scaleUp(minDimensions, {
      width: minDimensions.width,
      height: minDimensions.width / aspectRatio
    });
  }
  if (desiredDimensions.height < minDimensions.height) {
    return scaleUp(minDimensions, {
      height: minDimensions.height,
      width: minDimensions.height * aspectRatio
    });
  }
  return desiredDimensions;
}

function scaleDown(
  maxDimensions: ImgDimensions,
  desiredDimensions: ImgDimensions
): ImgDimensions {
  const aspectRatio = desiredDimensions.width / desiredDimensions.height;
  if (desiredDimensions.width > maxDimensions.width) {
    return scaleDown(maxDimensions, {
      width: maxDimensions.width,
      height: maxDimensions.width / aspectRatio
    });
  }
  if (desiredDimensions.height > maxDimensions.height) {
    return scaleDown(maxDimensions, {
      height: maxDimensions.height,
      width: maxDimensions.height * aspectRatio
    });
  }
  return desiredDimensions;
}

function scale(
  { minBox, maxBox }: { minBox: ImgDimensions; maxBox: ImgDimensions },
  originalBox: ImgDimensions
) {
  return scaleDown(maxBox, scaleUp(minBox, originalBox));
}

function sourcesAreEqual(source1: any, source2: any) {
  return (
    (source1 && source2 && source1.uri === source2.uri) || source1 === source2
  );
}

function identity(arg: any) {
  return arg;
}

function computeImageBoxDimensions(params: any) {
  const {
    computeImagesMaxWidth,
    contentWidth,
    flattenStyles,
    imagePhysicalWidth,
    imagePhysicalHeight,
    requiredWidth,
    requiredHeight
  } = params;
  const horizontalSpace = extractHorizontalSpace(flattenStyles);
  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 0,
    minHeight = 0
  } = flattenStyles;
  const imagesMaxWidth =
    typeof contentWidth === 'number'
      ? computeImagesMaxWidth(contentWidth)
      : Infinity;
  const minBox = {
    width: minWidth,
    height: minHeight
  };
  const maxBox = {
    width:
      Math.min(
        imagesMaxWidth,
        maxWidth,
        typeof requiredWidth === 'number' ? requiredWidth : Infinity
      ) - horizontalSpace,
    height: Math.min(
      typeof requiredHeight === 'number' ? requiredHeight : Infinity,
      maxHeight
    )
  };
  if (typeof requiredWidth === 'number' && typeof requiredHeight === 'number') {
    return scale(
      { minBox, maxBox },
      {
        width: requiredWidth,
        height: requiredHeight
      }
    );
  }
  if (imagePhysicalWidth != null && imagePhysicalHeight != null) {
    return scale(
      { minBox, maxBox },
      {
        width: imagePhysicalWidth,
        height: imagePhysicalHeight
      }
    );
  }
  return null;
}

interface State {
  requiredWidth: number;
  requiredHeight: number;
  imagePhysicalWidth: number | null;
  imagePhysicalHeight: number | null;
  imageBoxDimensions: ImageDimensions | null;
  error: boolean;
}

class ImgTag extends PureComponent<ImgTagProps, State> {
  private __cachedFlattenStyles: Record<string, any> | null = null;
  private __cachedRequirements: ImgDimensions | null = null;
  private mounted = false;

  constructor(props: ImgTagProps) {
    super(props);
    this.invalidateRequirements(props);
    const state = {
      imagePhysicalWidth: null,
      imagePhysicalHeight: null,
      requiredWidth: this.__cachedRequirements!.width,
      requiredHeight: this.__cachedRequirements!.height,
      imageBoxDimensions: null,
      error: false
    };
    this.state = {
      ...state,
      imageBoxDimensions: this.computeImageBoxDimensions(props, state)
    };
  }

  static propTypes: Record<keyof ImgTagProps, any> = {
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
      height: PropTypes.number
    }),
    altColor: PropTypes.string,
    onPress: PropTypes.func,
    testID: PropTypes.string
  };

  static defaultProps: Partial<ImgTagProps> = {
    enableExperimentalPercentWidth: false,
    computeImagesMaxWidth: identity,
    imagesInitialDimensions: {
      width: 100,
      height: 100
    },
    style: {}
  };

  invalidateRequirements(props: ImgTagProps) {
    const {
      width,
      height,
      contentWidth,
      enableExperimentalPercentWidth,
      style
    } = props;
    this.__cachedFlattenStyles = StyleSheet.flatten(style) || emptyObject;
    this.__cachedRequirements = deriveRequiredDimensionsFromProps({
      width,
      height,
      contentWidth,
      enablePercentWidth: enableExperimentalPercentWidth,
      flatStyle: this.__cachedFlattenStyles
    });
  }

  computeImageBoxDimensions(props: ImgTagProps, state: any) {
    const { computeImagesMaxWidth, contentWidth } = props;
    const {
      imagePhysicalWidth,
      imagePhysicalHeight,
      requiredWidth,
      requiredHeight
    } = state;
    const imageBoxDimensions = computeImageBoxDimensions({
      flattenStyles: this.__cachedFlattenStyles,
      computeImagesMaxWidth,
      contentWidth,
      imagePhysicalWidth,
      imagePhysicalHeight,
      requiredWidth,
      requiredHeight
    });
    return imageBoxDimensions;
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchPhysicalImageDimensions();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps: ImgTagProps, prevState: State) {
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
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        requiredWidth: this.__cachedRequirements!.width,
        requiredHeight: this.__cachedRequirements!.height
      });
    }
    if (sourceHasChanged) {
      if (
        this.__cachedRequirements!.width === null ||
        this.__cachedRequirements!.height === null
      ) {
        this.fetchPhysicalImageDimensions();
      }
    }
    if (shouldRecomputeImageBox) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((state: any, props: ImgTagProps) => ({
        imageBoxDimensions: this.computeImageBoxDimensions(props, state)
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
              error: false
            });
        },
        () => {
          this.mounted && this.setState({ error: true });
        }
      );
  }

  renderImage(imageBoxDimensions: ImgDimensions) {
    const { source } = this.props;
    return (
      <Image
        source={source}
        style={[defaultImageStyle, imageBoxDimensions]}
        testID="image-layout"
      />
    );
  }

  renderAlt() {
    const imageBoxDimensions = this.computeImageBoxDimensions(
      this.props,
      this.state
    );
    return (
      <View
        style={[
          styles.errorBox,
          {
            height:
              imageBoxDimensions?.height ||
              this.props.imagesInitialDimensions.height,
            width:
              imageBoxDimensions?.width ||
              this.props.imagesInitialDimensions.width
          }
        ]}
        testID="image-error">
        {this.props.alt ? (
          <Text style={[styles.errorText, { color: this.props.altColor }]}>
            {this.props.alt}
          </Text>
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
    const { width, height, ...remainingStyle } = this.props.style;
    const style = [styles.container, remainingStyle];
    if (this.props.onPress) {
      return (
        <GenericPressable onPress={this.props.onPress} style={style}>
          {this.renderContent()}
        </GenericPressable>
      );
    }
    return <View style={style}>{this.renderContent()}</View>;
  }
}

const ImgTagExport: ComponentClass<Partial<ImgTagProps>> = ImgTag as any;

export default ImgTagExport;
