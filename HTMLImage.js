import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;

export default class HTMLImage extends Component {

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

        Image.getSize(source.uri, (width, height) => {
            this.setState({
                width: imagesMaxWidth && width > imagesMaxWidth ? imagesMaxWidth : width,
                height: imagesMaxWidth && width > imagesMaxWidth ? height / (width / imagesMaxWidth) : height
            });
        });
    }

    render () {
        const { source, style, passProps } = this.props;

        return (
            <Image source={source} style={[style, {width: this.state.width, height: this.state.height, resizeMode: 'cover'}]} {...passProps} />
        );
    }
}
