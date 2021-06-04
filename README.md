[![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20MacOs%20%7C%20Windows-brightgreen.svg?colorB=191A17)](#)
[![npm](https://img.shields.io/npm/v/react-native-render-html/latest)](https://www.npmjs.com/package/react-native-render-html)
[![npm](https://img.shields.io/npm/v/react-native-render-html/next)](https://www.npmjs.com/package/react-native-render-html)
[![](https://img.shields.io/badge/semver-2.0.0-e10079.svg)](https://semver.org/spec/v2.0.0.html)
[![](https://img.shields.io/codecov/c/gh/meliorence/react-native-render-html)](https://codecov.io/gh/meliorence/react-native-render-html)
[![](https://github.com/meliorence/react-native-render-html/workflows/CI/badge.svg?branch=master)](https://github.com/meliorence/react-native-render-html/actions?query=branch%3Amaster+workflow%3ACI)
[![npm](https://img.shields.io/npm/dm/react-native-render-html.svg?colorB=007ec6)](https://www.npmjs.com/package/react-native-render-html)
[![github issues](https://img.shields.io/github/issues/meliorence/react-native-render-html.svg)](https://github.com/meliorence/react-native-render-html/issues)
[![github closed issues](https://img.shields.io/github/issues-closed/meliorence/react-native-render-html.svg?colorB=44cc11)](https://github.com/meliorence/react-native-render-html/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/discord/736906960041148476?label=discord)](https://discord.gg/dbEMMJM)
[![Rate on Openbase](https://badges.openbase.com/js/rating/react-native-render-html.svg)](https://openbase.com/js/react-native-render-html?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

<br>
<p align="center">
    <a href="#"><img width="124" height="124" src="assets/logo-100x100.svg"></a>
</p>
<h1 align="center">react-native-render-html</h1>
<p align="center">
  <sup>Based on the original work of <a href="https://github.com/Thomas101">Thomas Beverley</a>, props to him.</sup>
</p>
<p align="center">
An iOS/Android pure javascript react-native component that renders your HTML into 100% native views.
</p>
<p align="center">
    <a href="#"><img src="http://i.giphy.com/26tkmjBLvThP0TSak.gif"></a>
</p>
<p align="center">
  <img src="./assets/discovery-expo-qr.png"/><br>
  Scan the QR code, or press the link below from your device to open the Discovery App in <a href="https://expo.io/client">Expo Go</a>.<br>
<a href="exp://exp.host/@jsamr/react-native-render-html-discovery">
  <code>exp://exp.host/@jsamr/react-native-render-html-discovery</code>
</a>
</p>

## Versions

> :warning: **You are on the master branch which is home for the latest development.**
> Check the table bellow to get documentation for your exact
> version. Because the patch version is irrelevant regarding the features of one
> version, we will point to the last patch release of a minor version. You can
> read our full branching policy in the
> [MAINTAINING.adoc](MAINTAINING.adoc#branching) file.

### Stable releases

| Minor | Branch                                                                                    | Documentation                                                                                              | Test Status                                                                                               | Latest                                                                         |
| ----- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 5.1   |  [release/5.1](https://github.com/meliorence/react-native-render-html/tree/release/5.1)   | [release/5.1/README.md](https://github.com/meliorence/react-native-render-html/blob/release/5.1/README.md) | ![CI](https://github.com/meliorence/react-native-render-html/workflows/CI/badge.svg?branch=release%2F5.1) | [![npm](https://img.shields.io/npm/v/react-native-render-html/release/5.1)](#) |
| 4.2   |  [release/4.2](https://github.com/meliorence/react-native-render-html/tree/release/4.2)   | [release/4.2/README.md](https://github.com/meliorence/react-native-render-html/blob/release/4.2/README.md) | ![CI](https://github.com/meliorence/react-native-render-html/workflows/CI/badge.svg?branch=release%2F4.2) | [![npm](https://img.shields.io/npm/v/react-native-render-html/release/4.2)](#) |

<a name="prereleases"></a>

### Pre-releases

| Tag     | Branch      | Test Status                                                                                                    | Latest                                                                  |
| ------- | ----------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| next    | dev/5.x     | [![CI](https://github.com/meliorence/react-native-render-html/workflows/CI/badge.svg?branch=dev%2f5.x)](#)     | [![](https://img.shields.io/npm/v/react-native-render-html/next)](#)    |
| foundry | dev/foundry | [![CI](https://github.com/meliorence/react-native-render-html/workflows/CI/badge.svg?branch=dev%2ffoundry)](#) | [![](https://img.shields.io/npm/v/react-native-render-html/foundry)](#) |

## Install

```bash
npm install react-native-render-html
```

> :city_sunrise: To try out pre-releases up-to-date with development, including many fixes, you are
> encouraged to install the `next` tag versions. With our test-first
> approach, the fixes and features in this branch will have been tested, so the
> chances you encounter a bug is pretty low. If you encounter any issue on a
> pre-release, you don't need to fill a full bug report. Just [comment our
> latest release
> thread](https://github.com/meliorence/react-native-render-html/issues?q=is%3Aissue+is%3Aopen+label%3Arelease).
> To install the `next` version: <pre>npm install react-native-render-html@next</pre>
>
> If you wish, you can also try directly the master branch:
>
> <pre>npm install "github:meliorence/react-native-render-html#master"</pre>


<p align="center">
  <img src="./assets/discovery-expo-qr.png"/><br>
  Scan the QR code, or press the link below from your device to open in <a href="https://expo.io/client">Expo Go</a>.<br>
<a href="exp://exp.host/@jsamr/react-native-render-html-discovery">
  <code>exp://exp.host/@jsamr/react-native-render-html-discovery</code>
</a>
</p>
