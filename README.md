# react-native-render-html

An iOS/Android pure javascript react-native component that renders your HTML into 100% native views. It's made to be extremely customizable and easy to use and aims at being able to render anything you throw at it.

> Based on the original work of [Thomas Beverley](https://github.com/Thomas101), props to him.

![react-native-render-html](http://i.giphy.com/26tkmjBLvThP0TSak.gif)

## Table of contents

- [react-native-render-html](#react-native-render-html)
    - [Table of contents](#table-of-contents)
    - [Install](#install)
    - [Basic usage](#basic-usage)
    - [Props](#props)
    - [Demo](#demo)
    - [Creating custom renderers](#creating-custom-renderers)
    - [Styling](#styling)
    - [Images](#images)
    - [Ignoring HTML content](#ignoring-html-content)

## Install

`npm install react-native-render-html --save` or `yarn add react-native-render-html`

## Basic usage

```javascript
import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

export default class Demo extends Component {
    render () {
        return (
            <ScrollView style={{ flex: 1 }}>
                <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>
        );
    }
}
```

## Props

Prop | Description | Type | Required/Default
------ | ------ | ------ | ------
`renderers` | Your [custom renderers](#creating-custom-renderers) | `object` | Optional, some default ones are supplied (`<a>`, `<img>`...)
`html` | HTML string to parse and render | `string` | Required
`uri` | *(experimental)* remote website to parse and render | `string` | Optional
`decodeEntities` | Decode HTML entities of your content | `bool` | Optional, defaults to `true`
`imagesMaxWidth` | Resize your images to this maximum width, see [images](#images) | `number` | Optional
`onLinkPress` | Fired with the event and the href as its arguments when tapping a link | `function` | Optional
`tagsStyles` | Provide your styles for specific HTML tags, see [styling](#styling) | `object` | Optional
`classesStyles` | Provide your styles for specific HTML classes, see [styling](#styling) | `object` | Optional
`containerStyle` | Custom style for the container of the renderered HTML | `object` | Optional
`emSize` | The default value in pixels for `1em` | `number` | `14`
`ignoredTags` | HTML tags you don't want rendered, see [ignoring HTML content](#ignoring-html-content) | `array` | Optional, `['head', 'scripts']`
`ignoredStyles` | CSS styles from the `style` attribute you don't want rendered, see [ignoring HTML content](#ignoring-html-content) | `array` | Optional
`ignoreNodesFunction` | Return true in this custom function to ignore nodes very precisely, see [ignoring HTML content](#ignoring-html-content) | `function` | Optional

## Demo

This component comes with a demo that showcases every feature presented here. It's very useful to keep track of bugs and rendering differences between the different versions of react-native.

**It is mandatory** to refer to an example of the demo or to provide one when submitting an issue or a pull request for a new feature.

Feel free to write more advanced examples and submit a pull-request for it, it will probably be very useful for other users.

## Creating custom renderers

This is very useful if you want to make some very specific styling of your HTML content, or even implement custom HTML tags.

Just pass an object to the `renderers` prop with the tag name as the key, an a function as its value, like so :

```javascript
renderers: {
    hr: () => <View style={{ width: '100%', height: 1, backgroundColor: 'blue' }} />
}
```

Here, we have overriden the default `<br />` renderer and made it a blue line.

You can also create your own tags and use them in your HTML content :

```javascript
const content = `<bluecircle></bluecircle>`;
...

renderers: {
    bluecircle: () => <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'blue' }} />
}
```

Your renderers functions receive several arguments that will be very useful to make some very specific rendering.

* `htmlAttribs`: attributes attached to the node, parsed in a react-native way
* `children` : array with the children of the node
* `convertedCSSStyles` : conversion of the `style` attribute from CSS to react-native's stylesheet
* `passProps` : various useful information : `groupInfo`, `parentTagName`, `parentIsText`...

## Styling

In addition to your custom renderers, you can apply specific styles to HTML tags (`tagsStyles`) or HTML classes (`classesStyles`). You can also combine these styles with your custom renderers.

Styling options override thesmelves, so you might render a custom HTML tag with a [custom renderer](#creating-custom-renderers) like `<bluecircle>`, make it green with a class `<bluecircle class="make-me-green">` or make it red by styling the tag itself.

The default style of your custom renderer will be merged to the one from your `classesStyles` which will also be merged by the `style` attribute.

Here's an usage example

```javascript
// props
    tagsStyles: { i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' } },
    classesStyles: { 'last-paragraph': { textAlign: 'right', color: 'teal', fontWeight: '800' } }

const html = `
    <i>Here, we have a style set on the "i" tag with the "tagsStyles" prop.</i>
    <p class="last-paragraph">Finally, this paragraph is style through the classesStyles prop</p>`;
```

![](https://puu.sh/xF7Jx/e4b395975d.png)

## Images

By default, unstyled images will be rendered with their respective height and width without resizing. You can force their dimensions by using the `style` attribute in your HTML content, or [style](#styling) them with a class or through the `<img>` tag.

If you can't set the dimension of each image in your content, you might find the `imagesMaxWidth` prop useful. It resizes (and keeps proportions) your images to a maximum width, ensuring that your images won't overflow out of your viewport.

A nice trick, demonstrated in the [basic usage of this module](#basic-usage) is to use the `Dimensions` API of react-native : `imagesMaxWidth={Dimensions.get('window').width}`. You could substract a value to it to make a margin.

Please note that if you set width AND height through any mean of styling, `imagesMaxWidth` will be ignored.

Images with broken links will render an empty square with a thin border, similar to what safari renders in a webview.

Please note that all of these behaviours are implemented in the default `<img>` renderer. If you want to provide your own `<img>` renderer, you'll have to make this happen by yourself. You can use the `img` function in `HTMLRenderers.js` as a starting point.

## Ignoring HTML content

You can't expect native components to be able to render *everything* you can find in your browser. And you might not entirely trust your contributors, so here are 3 props allowing you to prevent disasters without sanitizing your HTML on the server-side (that doesn't mean you shouldn't !).

* `ignoredTags` : array of ignored HTML tags, by default `head` and `scripts` are removed
* `ignoredStyles` : array of ignored CSS rules. Nothing is ignored by default
* `ignoreNodesFunction` : this is a cumbersome, yet powerful, way of ignoring very specific stuff.

**Please note** that if you supply `ignoredTags`, you will override the default ignored ones. There are *a lot* of them, if you want to keep them and add you own, you can do something like : 

```javascript
import { IGNORED_TAGS } from 'react-native-render-html/HTMLUtils';
...

// your props
ignoredTags={[ ...IGNORED_TAGS, 'tag1', 'tag2']}
```

`ignoreNodesFunction` receives 3 parameters : `node`, `parentTagName` and `parentIsText`.

`node` is the result of the HTML parsing, which allows you to look for children, check the parent's markup and much more. `parentTagName` is a conveniant way to access the parent of your node, and `parentIsText` is a great way to make sure you won't be rendering a `<View>` inside a `<Text>` which, right now, makes react-native crash.
