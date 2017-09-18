import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;

export default class HTMLImage extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };
    }

    static propTypes = {
        source: PropTypes.object.isRequired,
        style: Image.propTypes.style,
        imagesMaxWidth: PropTypes.number
    }

    componentDidMount () {
        const { source, imagesMaxWidth } = this.props;

        Image.getSize(
            source.uri,
            (width, height) => {
                this.setState({
                    width: imagesMaxWidth && width > imagesMaxWidth ? imagesMaxWidth : width,
                    height: imagesMaxWidth && width > imagesMaxWidth ? height / (width / imagesMaxWidth) : height
                });
            },
            () => {
                console.log('failed getsize for', source);
                this.setState({ error: true });
            }
        );
    }

    validImage (source, style, props = {}) { 
        return (
            <Image
              source={source}
              style={[ style, { width: this.state.width, height: this.state.height, resizeMode: 'cover' }]}
              {...props}
            />
        );
    }

    get errorImage () {
        return (
            <View style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'lightgray' }} />
        );
    }

    render () {
        const { source, style, passProps } = this.props;
        console.log('HTMLImage', this);

        return !this.state.error ? this.validImage(source, style, passProps) : this.errorImage;
    }
}
