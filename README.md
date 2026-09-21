> [!IMPORTANT]
> ### The project has been moved to [native-html/render](https://github.com/native-html/render). 
> This repository is now archived and there won't be any active development.

### 🗃️ Releases

| Minor | Branch                                                                                   | Documentation                                                                                              | Latest                                                                         |
| ----- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| next  | master                                                                                   | -                                                                                                          | [![npm](https://img.shields.io/npm/v/react-native-render-html/next)](#)        |
| 6.3   | [release/6.3](https://github.com/meliorence/react-native-render-html/tree/release/6.3)   | [Official Website](https://meliorence.github.io/react-native-render-html/)                                 | [![npm](https://img.shields.io/npm/v/react-native-render-html/release/6.3)](#) |
| 5.1   | [release/5.1](https://github.com/meliorence/react-native-render-html/tree/release/5.1)   | [release/5.1/README.md](https://github.com/meliorence/react-native-render-html/blob/release/5.1/README.md) | [![npm](https://img.shields.io/npm/v/react-native-render-html/release/5.1)](#) |
| 4.2   | [release/4.2](https://github.com/meliorence/react-native-render-html/tree/release/4.2)   | [release/4.2/README.md](https://github.com/meliorence/react-native-render-html/blob/release/4.2/README.md) | [![npm](https://img.shields.io/npm/v/react-native-render-html/release/4.2)](#) |

<a name="prereleases"></a>

## :computer: Install

```bash
npm install react-native-render-html
```

```bash
yarn add react-native-render-html
```

## :speedboat: Basic Usage

```jsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const source = {
  html: `
<p style='text-align:center;'>
  Hello World!
</p>`
};

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
      source={source}
    />
  );
}
```

## :blue_book: Documentation

See our [official website](https://meliorence.github.io/react-native-render-html/) and [the official Discovery App](https://expo.io/@jsamr/react-native-render-html-discovery).

## :iphone: Example

You like to learn by example? We have a tutorial from which the demo GIF has been extracted: [A WebView-free Blog App with React Native Render HTML](https://meliorence.github.io/react-native-render-html/blog/2021/06/27/create-blog-app-rnrh-I).

## :notebook: Changelog

The changelog is available here: [packages/render-html/CHANGELOG.md](./packages/render-html/CHANGELOG.md).

## :bulb: Help

Please refer to [our dedicated document](./HELP.adoc).

## 👥 Community

You're always welcome to join our [discord channel](https://discord.gg/dbEMMJM) :-).

## :pencil: Contributing

Check-out our [contributing guide](./CONTRIBUTING.adoc).

- You can report bugs in [our Issue Tracker](https://github.com/meliorence/react-native-render-html/issues);
- We handle Feature Requests [in our Canny board](https://native-html.canny.io/features).

## :blue_heart: Sponsorship

Want to support this project or hire us to implement a feature? [Check out this page](https://github.com/sponsors/jsamr).

## :balance_scale: License

The source code is licensed under BSD 2-Clause "Simplified" License.
