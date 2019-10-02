import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import HTMLDemo from './src/HTMLDemo';

export default class Demo extends Component {
    render () {
        return (
            <HTMLDemo />
        );
    }
}

AppRegistry.registerComponent('Demo', () => Demo);
