# [6.0.0-alpha.24](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.23...v6.0.0-alpha.24) (2021-04-17)


### Bug Fixes

* list marker doesn't pick `fontSize` ([64bf900](https://github.com/meliorence/react-native-render-html/commit/64bf9007a3b8cba2cfe6bf1011896dfae8862e77))

# [6.0.0-alpha.23](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.22...v6.0.0-alpha.23) (2021-04-17)


### Code Refactoring

* extract internal types to a separate file ([27421ad](https://github.com/meliorence/react-native-render-html/commit/27421ade83906c76a3bc0a2b569d8c41467bec38))
* extract renderer-specific props to `renderersProps` ([f338963](https://github.com/meliorence/react-native-render-html/commit/f338963ac25d5bd5c1062df954bc25b530cad713))
* move `enableExperimentalPercentWidth` to `renderersProps.img` ([0612a94](https://github.com/meliorence/react-native-render-html/commit/0612a9431c8615d4a7d93c6ca69ae0d7fba2f2f1))
* move `onLinkPress` to `renderersProps.a.onPress` ([5c31ff9](https://github.com/meliorence/react-native-render-html/commit/5c31ff98bdba81f929e4b343c8cadb58b4092fec))


### Features

* configure `enableExperimentalRtl` in `renderersProps.ol|ul` ([2b6b0be](https://github.com/meliorence/react-native-render-html/commit/2b6b0bea66e71c3e97bcd4fdab3bdad2c1a11f1d))
* configure `getFallbackListStyleTypeFromNestLevel` in `renderersProps.ol|ul` ([540a22c](https://github.com/meliorence/react-native-render-html/commit/540a22c4b397d8b395fa681f4df0ddaa769da817))
* configure margins removal for nested lists in renderersProps.ol|ul ([15b161c](https://github.com/meliorence/react-native-render-html/commit/15b161c057ac897f516c87c92689ca74077fbecf))
* export `defaultListStyleSpecs` for customization. ([6c2420b](https://github.com/meliorence/react-native-render-html/commit/6c2420b76024c266513a5c6edf377a2eb8dcb22c))
* new prop `customListStyleSpecs` to support additional `list-style-type` ([190af19](https://github.com/meliorence/react-native-render-html/commit/190af1928d1c6ac87fdb55aedba15892e0e0350d))
* support "start" attribute in ol and ul elements ([0f87b22](https://github.com/meliorence/react-native-render-html/commit/0f87b22c539bb7e531e71dcd5fb4a9563f0bcb98)), closes [#336](https://github.com/meliorence/react-native-render-html/issues/336)
* support "upper-latin" and "lower-lattin" list-style-type CSS props ([1a2c595](https://github.com/meliorence/react-native-render-html/commit/1a2c595825a9bea82c5542f85e8244af2128b543))
* support `enableRemove*MarginIfNested` for list renderers ([54e4182](https://github.com/meliorence/react-native-render-html/commit/54e418282c0f46e87543589694b4cb3653e238d4))
* support experimental RTL mode for ol and ul elements ([0954d8b](https://github.com/meliorence/react-native-render-html/commit/0954d8b380245be2372c18e5d70629dd14787fc9))


### BREAKING CHANGES

* `getStyleFromNestLevel` prop for list renderers has been dropped. If you need conditional style for list renderers based on nest level,   implement a custom list renderer with `useInternalRenderer` and check the passed markers nest level. 
* `getListStyleTypeFromNestLevel` prop for list renderers has been renamed to `getFallbackListStyleTypeFromNestLevel`.
* `useTTree` and `useTRenderEngine` have been removed from barrel exports since they are considered internals. If you were using those, please let me know.
* `enableExperimentalPercentWidth` has been discontinued. Use `renderersProps.img.enableExperimentalPercentWidth` instead.
* `onLinkPress` prop has been discontinued. Use `renderersProps.a.onPress` instead.
* `sharedProps` and `useSharedProps` don't provide `renderersProps` anymore. Explicitly consume those via `useRendererProps`.
* `initialImagesDimensions` has been moved to `renderersProps.img.initialDimensions`

# [6.0.0-alpha.22](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.21...v6.0.0-alpha.22) (2021-03-30)


### Features

* `GenericPressable` prop to customize the component wrapping interactive views ([a29468d](https://github.com/meliorence/react-native-render-html/commit/a29468de6422d916dfcfa44f04c5f43c519f776a)), closes [#472](https://github.com/meliorence/react-native-render-html/issues/472)
* `pressableHightlightColor` prop to customize pressable appearance ([d3c5b4d](https://github.com/meliorence/react-native-render-html/commit/d3c5b4dee23795613b5c00685203f42b6708e91e))

# [6.0.0-alpha.21](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.20...v6.0.0-alpha.21) (2021-03-24)


### Bug Fixes

* alignment of alpha list style prefixes with varying line height ([c041527](https://github.com/meliorence/react-native-render-html/commit/c041527e51edbe3137495e01681a0f11cee8efb5))
* alignment of unordered list prefixes ([b2cd6b6](https://github.com/meliorence/react-native-render-html/commit/b2cd6b6d1cd991c6c541d476d7a36911b1fde66d))
* list prefixes transparent when no baseStyle.color provided ([873b897](https://github.com/meliorence/react-native-render-html/commit/873b89742f4ef6513f3054e1b2f94d5c7f520c87))
* list style prefixes now inherit from font*(weight,style,family) ([f77db8a](https://github.com/meliorence/react-native-render-html/commit/f77db8a23a6020070b7e9419d0ec176ef8ba23a9))
* updated react dependency in podspec to enable build in Xcode 12 (for iOS >= 12) ([#464](https://github.com/meliorence/react-native-render-html/issues/464)) ([c55319b](https://github.com/meliorence/react-native-render-html/commit/c55319bce51f28631a6bb5b5828433a0e52e9270)), closes [/github.com/facebook/react-native/issues/29633#issuecomment-694187116](https://github.com//github.com/facebook/react-native/issues/29633/issues/issuecomment-694187116)


### Features

* support decimal-leading-zero list style type prefix ([5ab6d6f](https://github.com/meliorence/react-native-render-html/commit/5ab6d6f9cb68e99361c0d4329e3ac79e3dcb9501))
* support disclosure-* list style type prefixes ([c9aa2fb](https://github.com/meliorence/react-native-render-html/commit/c9aa2fbb4bd02644af92397a0fa9d9b6ed0298b6))
* support lower-greek list style type prefixes ([9e6f66b](https://github.com/meliorence/react-native-render-html/commit/9e6f66b42377915f69ded76fc1956c92187c660e))
* support lower-latin and upper-latin list prefix styles ([d42f688](https://github.com/meliorence/react-native-render-html/commit/d42f6884bfa33197f75d306526097df144b504f3))

# [6.0.0-alpha.20](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.19...v6.0.0-alpha.20) (2021-02-20)


### Features

* better extensibility of custom renderers with generic type arg ([b827937](https://github.com/meliorence/react-native-render-html/commit/b8279372abef50f66d8a6cbc3bfd0ddaab982bdc))

# [6.0.0-alpha.19](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.18...v6.0.0-alpha.19) (2021-02-20)


### Features

* **ts:** new generic argument for renderers `propsFromParent` prop ([dd7ff6c](https://github.com/meliorence/react-native-render-html/commit/dd7ff6cc656cff3223cf36a1ae6837e73fdfb8ac))


### Performance Improvements

* memoize `TDocumentRenderer` to prevent rendering from ascendents ([b5dffea](https://github.com/meliorence/react-native-render-html/commit/b5dffea5ea9ce07f65aac1713b8202c3a9498c3d))

# [6.0.0-alpha.18](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.17...v6.0.0-alpha.18) (2021-02-18)


### Bug Fixes

* `TNode.nodeIndex` gives the index before collapsing ([ba63d59](https://github.com/meliorence/react-native-render-html/commit/ba63d599bbe2439114ed215f4227b8bfca879ab7))


### Features

* allow module augmentation for renderers prop via `BaseRenderersProps` ([341b4c3](https://github.com/meliorence/react-native-render-html/commit/341b4c381540acf88f89189e82dc7dd8108bf71a))


### Performance Improvements

* limit rerenderings via memoization ([9a17d99](https://github.com/meliorence/react-native-render-html/commit/9a17d998994de329c7168e5cb36f0c410290772c))

# [6.0.0-alpha.17](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.16...v6.0.0-alpha.17) (2021-02-15)


### Bug Fixes

* prop `onDocumentMetadataLoaded` not invoked ([90cc1f6](https://github.com/meliorence/react-native-render-html/commit/90cc1f68d0259095b20822e94c264336c4519a80))
* prop `onTTreeChange` not invoked ([7d08dd6](https://github.com/meliorence/react-native-render-html/commit/7d08dd60669ba8cd3a688bc46e7b89332ef15d4a))


### Features

* access `sharedProps` from custom renderers ([3dc8f0c](https://github.com/meliorence/react-native-render-html/commit/3dc8f0cf43292044bfd136ff7d11e4daa8445c56))
* add `defaultProps` to `TNodeRenderer` for convinience ([8b6dad9](https://github.com/meliorence/react-native-render-html/commit/8b6dad9f3739ed8699bf4b5affacfecac554ad2d))
* add `react-native` field in package.json for metro ([d2e89ef](https://github.com/meliorence/react-native-render-html/commit/d2e89efba2a3cb3bbdd7ca8b2cbe35659da4d785))
* export `defaultSystemFonts` and `defaultFallbackFonts` ([eb3070b](https://github.com/meliorence/react-native-render-html/commit/eb3070b7d74ca3c1bbf4f3f3c4db44c0829ed9e4))
* implement strictly margin collapsing computation ([28fc95b](https://github.com/meliorence/react-native-render-html/commit/28fc95b7dd70600063389ec5a5707499d284bd97))
* new `markers` prop for custom renderers ([7f49593](https://github.com/meliorence/react-native-render-html/commit/7f49593711259a76755c883a8eb78fda765cc4c3))
* new `propsFromParent` in custom renderers and children renderers ([1d445e7](https://github.com/meliorence/react-native-render-html/commit/1d445e7c53ad165d7aad4dddaba43d96f0fb64a8)), closes [#228](https://github.com/meliorence/react-native-render-html/issues/228)
* new `setMarkersForTNode` prop ([c7b922e](https://github.com/meliorence/react-native-render-html/commit/c7b922ee675160a51f205e37e3f2180af6e77bcf))
* support `nodeIndex` and `parent` fields in `TNode` ([942fcbc](https://github.com/meliorence/react-native-render-html/commit/942fcbc049dfee6ba0fb94fd0b772f02930bcaaf))
* support default system fonts for Windows, Macos and web ([ebece1d](https://github.com/meliorence/react-native-render-html/commit/ebece1d7ef9950c7c1fb1407cac07b7bd3f67c05))


### BREAKING CHANGES

* - `hasAnchorAncestor` prop has been removed from custom
  renderers and children renderers. If you need to know if a node has an
  anchor ancestor, use the new Marker API, which is released along.
- `collapsedMarginTop` prop has been removed from children renderers. If
  you were directly using it, use `propsFromParent.collapsedMarginTop`
  instead. If you were just setting this prop to `null` to avoid
  typescript errors, just remove this prop.

# [6.0.0-alpha.16](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.15...v6.0.0-alpha.16) (2021-02-12)


### Code Refactoring

* accurate typings for `RenderHTMLSharedProps`, `useSharedProps` ([7f57318](https://github.com/meliorence/react-native-render-html/commit/7f57318c8e6e3476a8a7ea564301054eb7aa4c3e))
* discontinue `listPrefixRenderers` prop ([98a04ca](https://github.com/meliorence/react-native-render-html/commit/98a04ca2d4e37b660a6aee6b60dc9a8adafdefba))


### BREAKING CHANGES

* (typescript users) renamed `RenderHTMLPassedProps` to
`RenderHTMLSharedProps` for consistency. In addition, changed signature
of `useSharedProps` and `userRendererProps`. These hooks now take as
first generic type arugment the shape of `renderersProps`.
* `listPrefixRenderers` prop has been discontinuated. You
should use a custom renderer for lists instead.

# [6.0.0-alpha.15](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.14...v6.0.0-alpha.15) (2021-02-11)


### Bug Fixes

* avoid extraneous re-renders in `useIMGElementState` hook ([f3f3b81](https://github.com/meliorence/react-native-render-html/commit/f3f3b817100b742711e13d33b62845f248750b79))
* pressable block elements should receive `viewProps` ([3134be1](https://github.com/meliorence/react-native-render-html/commit/3134be12b98462c689b70eda4799fd3dc2e12514))


### Features

* accessibility for images with role and label ([02b5232](https://github.com/meliorence/react-native-render-html/commit/02b5232b12f5661d6a28fe71bf54682d84e0fb6d))
* new `cachedNaturalDimensions` prop to `useIMGelementState` hook ([eaca370](https://github.com/meliorence/react-native-render-html/commit/eaca370bb990e7e47d600a8318f38366846f847a))
* new `TRenderEngineProvider` and `RenderHTMLFragment` components ([38176ed](https://github.com/meliorence/react-native-render-html/commit/38176edba3a3571e316c27bf7279f9bbc0f1899f))
* new `useIMGElementStateWithCache` hook for images ([7958f43](https://github.com/meliorence/react-native-render-html/commit/7958f437f8cd3f3ead81ffb614dd505cb90bae95))
* reeport useful types from css-processor ([78c5a93](https://github.com/meliorence/react-native-render-html/commit/78c5a932db55a5d16ffa6c43fd544db2ec468ef0))
* reeport useful variables and types from transient-render-engine ([7043e0c](https://github.com/meliorence/react-native-render-html/commit/7043e0c5d36897765863573377bc767d64300ef6))
* reuse 'img' renderer internal logic w/t `useIMGElementState` hook ([79e9158](https://github.com/meliorence/react-native-render-html/commit/79e9158df6035306a312c7fa835759441aa2dc06)), closes [#424](https://github.com/meliorence/react-native-render-html/issues/424)
* support accessibility for `a` elements ([69623c8](https://github.com/meliorence/react-native-render-html/commit/69623c84f75c0955d7764c68908f37302706984c)), closes [#285](https://github.com/meliorence/react-native-render-html/issues/285)
* support source.headers in `useIMGElementState` hook ([e4a0877](https://github.com/meliorence/react-native-render-html/commit/e4a0877293a37b904e9c52ff27ac2abafa82efac))
* warn user of API misusage even when `debug` is set to false ([f5dd83c](https://github.com/meliorence/react-native-render-html/commit/f5dd83c58e06d1f4e4fdcd6750c2a2a508f38dc4))

# [6.0.0-alpha.14](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.13...v6.0.0-alpha.14) (2021-02-09)


### Features

* graceful handling of missing `source` prop ([4a41dff](https://github.com/meliorence/react-native-render-html/commit/4a41dff5d174471091e9af99658cfdfdf3df45f7))

# [6.0.0-alpha.13](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.12...v6.0.0-alpha.13) (2021-02-08)


### Bug Fixes

* don't peer-depend on prop-types, instead depend directly ([e346dca](https://github.com/meliorence/react-native-render-html/commit/e346dcace79c130552b8af093cb919b4e755329f))
* use urijs instead of URL API ([c27c8c1](https://github.com/meliorence/react-native-render-html/commit/c27c8c13be638b35d705c526290c52d9caeaf9fe)), closes [#460](https://github.com/meliorence/react-native-render-html/issues/460)

# [6.0.0-alpha.12](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.11...v6.0.0-alpha.12) (2021-02-03)


### Bug Fixes

* missing `onPress` handling in TPhrasingRenderer ([718d8a3](https://github.com/meliorence/react-native-render-html/commit/718d8a38751f41ff8af50aebda76ab913a8c8a03))


### Features

* add `defaultViewProps` prop ([d78a74b](https://github.com/meliorence/react-native-render-html/commit/d78a74bd47b41316ab3872f0db5fbbf30f118a4f))
* add `target` argument to `onLinkPress` handler ([ae035f4](https://github.com/meliorence/react-native-render-html/commit/ae035f4d7c9672e5d748559d2e50066b6e6718a0))
* distinguish between rendered embedded and others ([f7693b3](https://github.com/meliorence/react-native-render-html/commit/f7693b39edbd0b9ce0134e8aaaf4a6490348fa90))
* new `onDocumentMetadataLoaded` prop ([14db262](https://github.com/meliorence/react-native-render-html/commit/14db2626a2126e001e81569da67728997489382b))
* port `domNodeToHTMLString` ([54a100c](https://github.com/meliorence/react-native-render-html/commit/54a100ca48c6c36abf0de474795810f8105e91ba))
* support a minimal table renderer ([46d6d0c](https://github.com/meliorence/react-native-render-html/commit/46d6d0c4f61f3573446e278310a6adedb6618608))
* support relative URLs and document metadata (`useDocumentMetadata` and `useNormalizedUrl` hooks) ([22220d4](https://github.com/meliorence/react-native-render-html/commit/22220d4229bf2d151411e591e854e57e6543e7d2))

# [6.0.0-alpha.11](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.10...v6.0.0-alpha.11) (2021-01-27)


### Bug Fixes

* inject `textProps` in TText renderers ([29ea34c](https://github.com/meliorence/react-native-render-html/commit/29ea34c6b7d3bfb8f1cc876bc974bc3e545e8e66))
* missing proptype (`onHTMLLoaded`) ([74a56ae](https://github.com/meliorence/react-native-render-html/commit/74a56ae9699c13925c27fbc880c85835d3d69f17))
* prettier, consistant and scalable list rendering ([7c2e26a](https://github.com/meliorence/react-native-render-html/commit/7c2e26a22591fa60edc02976aebe46640e918c23))


### Code Refactoring

* drop `ignoreNodesFunction` ([97ffc8d](https://github.com/meliorence/react-native-render-html/commit/97ffc8dd0ee659c2dcaf02734115df95882880ee))
* remove `containerStyle` and `customContainer` props ([dab1d25](https://github.com/meliorence/react-native-render-html/commit/dab1d251a133c6d8a2eb9142d7256bd777f15280))


### Features

* add `getStyleFromNetstLevel` prop to HTMLListElement ([5695fea](https://github.com/meliorence/react-native-render-html/commit/5695fea9ee13ec13648535a332cda482ddb99192))
* expose default renderers logic for extensibility ([691f9cf](https://github.com/meliorence/react-native-render-html/commit/691f9cfb8280bdeeda5d9240a50b328f9cbf27ff)), closes [#424](https://github.com/meliorence/react-native-render-html/issues/424)
* implement `defaultTextProps` prop ([13d7abf](https://github.com/meliorence/react-native-render-html/commit/13d7abfaca0b7f25435f7ef8d0abfa5a4a97b179))
* implement `useInternalRenderer` hook to reuse internal rendering logic ([add307c](https://github.com/meliorence/react-native-render-html/commit/add307cd29bb3682ea2180eee06c2b9292033013))
* implement `computeEmbeddedMaxWidth` prop as per RFC001@2.0.0 ([9ee8475](https://github.com/meliorence/react-native-render-html/commit/9ee8475c9cf15c9af88b78a7ea119ec2a8aa49df))
* nesting ol and ul will result in disinct bullet style types ([a18016f](https://github.com/meliorence/react-native-render-html/commit/a18016ff1fd7692c78d140d25c819a877416276d)), closes [#312](https://github.com/meliorence/react-native-render-html/issues/312)
* port `alterData`, `alterChildren` and `alterNode` ([1e0002b](https://github.com/meliorence/react-native-render-html/commit/1e0002b4a405bacbfba7cb647c1a8121f91d6b69))
* port `ignoreDOMNode` hook ([8a0d14f](https://github.com/meliorence/react-native-render-html/commit/8a0d14f3b9782e0d3bfea6aa820811ab9923275e))
* port `ignoredTags` prop ([9d2f5d5](https://github.com/meliorence/react-native-render-html/commit/9d2f5d57658cf30bc382682ef3be94a5b0f1d37b))
* port `emSize` prop ([f567532](https://github.com/meliorence/react-native-render-html/commit/f5675320585bdbb309769dc4133226e24762d039))
* safe typeguards in `extendDefaultRenderer` ([eb565df](https://github.com/meliorence/react-native-render-html/commit/eb565df60462b50a8efbc40afbdc8d060721a235))
* support `htmlParserOptions` prop ([3e5de96](https://github.com/meliorence/react-native-render-html/commit/3e5de966d227876b6d69d7c925514254d5e5f695))
* support `source` prop, identical to react-native-webview ([ed74eb9](https://github.com/meliorence/react-native-render-html/commit/ed74eb9b45993f260d6dea988abdd164c15f0f4b))
* support `WebView` and `defaultWebViewProps` ([fe177d7](https://github.com/meliorence/react-native-render-html/commit/fe177d74a64a07660abc97155df9159c1b39d40a))


### BREAKING CHANGES

* `ignoreNodesFunction` has been renamed
`ignoreDOMNode`.
* the names of hooks to alter DOM content have been
changed for clarity:

  - `alterData` becomes `alterDOMData`
  - `alterChildren` becomes `alterDOMChildren`
  - `alterNode` becomes `alterDOMElement`
* dropped ptSize prop. Point is supposed to be an
absolute (pixel independant) size and unfit for display devices. It will
be translated by the CSS processor to an absolute unit.
* `containerStyle` and `customContainer` props have been
dropped. Use `baseStyle` prop instead to style the root component.
* drop `textSelectable` and `allowFontScaling`. Use
`defaultTextProps.selectable` and `defaultTextProps.allowFontScaling`
instead.
* `uri` and `html` props have been dropped. Replace `uri`
with `source={{ uri: 'http://...' }}` and `html` with
`source={{ html: '<div> ...' }}`. The former now allows `body`,
`headers` and `method` fields.
* `decodeEntities` prop has been dropped. Pass this
option to `htmlParserOptions` prop instead.
* `computeImagesMaxWidth` has been replaced with
`computeEmbeddedMaxWidth`. The two props are very similar, but the latest
takes an extra argument, "tagName", which is the tag for which a width
constrain should be enforced. It is planned to work with the
@native-html/iframe-plugin extension.
* the object returned by `splitBoxModelStyle` has more
legible field names, `boxModelStyle` and `otherStyle`.
* `extendRenderer` has been renamed to
`extendDefaultRenderer`. Also note:

  - The first argument can be the name of the tag to extend;
  - The second argument is now a partial model;

# [6.0.0-alpha.10](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.9...v6.0.0-alpha.10) (2020-12-03)


### Bug Fixes

* use unicode escape sequences inside regex literal instead of string ([1299514](https://github.com/meliorence/react-native-render-html/commit/1299514d094fa8f680883d43c96efafbfabc3ab4))

# [6.0.0-alpha.9](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.8...v6.0.0-alpha.9) (2020-12-01)

### Features

* export useSharedProps ([0490d49](https://github.com/meliorence/react-native-render-html/commit/0490d49d13e85ed48f77bd996fc5d945c82bb057))

# [6.0.0-alpha.8](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.7...v6.0.0-alpha.8) (2020-11-30)


### Bug Fixes

* discard unsupported CSS inline methods (calc, var) ([b722a78](https://github.com/meliorence/react-native-render-html/commit/b722a784ec4c734569b9f0632f70912a74a99afc))
* prettier, consistant and scalable list rendering ([af826a3](https://github.com/meliorence/react-native-render-html/commit/af826a3067b368b38acd24e00f37074562e79afc))
* regression [#172](https://github.com/meliorence/react-native-render-html/issues/172) (passing Image-specific styles to img component) ([916d977](https://github.com/meliorence/react-native-render-html/commit/916d9770788e93baa875ffc2f19275159f1b8687))
* whitespace collapsing, collapse the penultimate child (TPhrasing) ([223cef2](https://github.com/meliorence/react-native-render-html/commit/223cef2e45b9d82ace7cc388a2d69bbb000ea6f0))
* whitespace collapsing, handling of form feed characters (\n) ([e5d20c6](https://github.com/meliorence/react-native-render-html/commit/e5d20c64eb63df2c251ca4e54c9c32c000afe4b6))


### Features

* new renderChild prop to TChildrenRenderer ([274355e](https://github.com/meliorence/react-native-render-html/commit/274355e01783bc0dc1c3909599654182ef018902))

# [6.0.0-alpha.7](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.6...v6.0.0-alpha.7) (2020-11-28)


### Bug Fixes

* splitBoxModelStyle, avoid picking undefined props in style ([e5f58bb](https://github.com/meliorence/react-native-render-html/commit/e5f58bbbc61ab3261a3e022e0eec26b3e6006088))


### BREAKING CHANGES

* the object returned by splitBoxModelStyle has more
legible field names, boxModelStyle and otherStyle.

# [6.0.0-alpha.6](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.5...v6.0.0-alpha.6) (2020-11-27)


### Features

* polished API for extendDefaultRenderer ([bb1fbeb](https://github.com/meliorence/react-native-render-html/commit/bb1fbeb5e500d19dcf1fffa1a003082041ff9754))


### BREAKING CHANGES

* extendRenderer has been renamed to
extendDefaultRenderer. Also note:

- The first argument can be the name of the tag to extend;
- The second argument is now a partial model;

# [6.0.0-alpha.5](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.4...v6.0.0-alpha.5) (2020-11-27)


### Bug Fixes

* inject textProps in TText renderers ([5453f95](https://github.com/meliorence/react-native-render-html/commit/5453f95ee4b7ca4c6e51df271fcb85ad5bb49fd3))


### Features

* support TText tnode in TNodeChildrenRenderer ([00183cc](https://github.com/meliorence/react-native-render-html/commit/00183cce8e1f67de701e99e626bc5b542b60ff39))

# [6.0.0-alpha.4](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.3...v6.0.0-alpha.4) (2020-11-27)


### Bug Fixes

* spread styles passed to TDefaultTextRenderer ([d167f95](https://github.com/meliorence/react-native-render-html/commit/d167f95217197dba2db07a5c53c82eb533567fca))


### Code Refactoring

* distinguish props from TDefaultRenderer and custom renderers ([0f2c41d](https://github.com/meliorence/react-native-render-html/commit/0f2c41d83eca7cd27c3d157af2c6edae10dc8fa1))


### Features

* add new splitBoxModelStyle utility ([3b0586c](https://github.com/meliorence/react-native-render-html/commit/3b0586ccfcbb0c0ddf3933bda10f130917741a9e))


### BREAKING CHANGES

* renderer props (and TDefaultRendererProps) don't pass
props to their underlying element. Instead, they pass `viewProps` if they
are view-based, and `textProps` if they are text-based. Only `onPress` is
still directly passed to the underlying element. Finally, a third prop
is available, `type`, useful for mixed renderers to know the type of the
underlying element (Text or View).

# [6.0.0-alpha.3](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.2...v6.0.0-alpha.3) (2020-11-26)


### Features

* new extendRenderer utility ([23faca0](https://github.com/meliorence/react-native-render-html/commit/23faca08e08e02a4be4f465b00ea6add3232ffbd))

# [6.0.0-alpha.2](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-alpha.1...v6.0.0-alpha.2) (2020-11-26)


### Bug Fixes

* the LoadHTML component should reflect html changes ([9d1ab9f](https://github.com/meliorence/react-native-render-html/commit/9d1ab9f90210ee0d27ebd334848c6a9585c40128))

# [6.0.0-alpha.1](https://github.com/meliorence/react-native-render-html/compare/v5.0.0-alpha.2...v6.0.0-alpha.1) (2020-11-25)

### Bug Fixes

* better handling of anchors ([f23d825](https://github.com/meliorence/react-native-render-html/commit/f23d8250ac10fc2e1c3209483da9e935d0b52d86))
* image not aligning properly because of mismerging of styles ([956053d](https://github.com/meliorence/react-native-render-html/commit/956053d4a89ba1f8df00d9b47ede169002a1ad7d))
* images honor styles and physical size in "alt" (error) mode ([a9edfde](https://github.com/meliorence/react-native-render-html/commit/a9edfdea2fbe98cb7d265e02d1288ddbc0b83806))
* in <img> tags, style dimensions should prevail over attributes ([670a7d5](https://github.com/meliorence/react-native-render-html/commit/670a7d59467f7b1243f509ee5308e20ee7d14cad))
* missing proptype (onHTMLLoaded) ([fca6898](https://github.com/meliorence/react-native-render-html/commit/fca6898f7ed62e3180e9a15fb1391601002931ce))
* use onError to evaluate the fetch state of the image ([d8a9333](https://github.com/meliorence/react-native-render-html/commit/d8a93337ecf0d84ddf34f236802b1f961450dc98))

### Features

* enableExperimentalMarginCollapsing prop ([42bfa53](https://github.com/meliorence/react-native-render-html/commit/42bfa53d786a3afb3f551a21882fc157aa6b935d))
* fallbackFonts and systemFonts props for font selection ([25deb02](https://github.com/meliorence/react-native-render-html/commit/25deb020c9465763b562bcf0bac47427a67ee6c3))
* implement RenderHTMLDebug wrapper component to warn users ([1fb72d7](https://github.com/meliorence/react-native-render-html/commit/1fb72d727c7904400f1bfd99c537a09be1f36448))
* new prop "onTTreeChange" ([8353db6](https://github.com/meliorence/react-native-render-html/commit/8353db6612f388cde351669684fa4123402b2ee3))
* new renderers API ([d94f409](https://github.com/meliorence/react-native-render-html/commit/d94f4090c222a3dfbc856241a56e4c3aad80ddbb))
* onHTMLLoaded prop ([ef65140](https://github.com/meliorence/react-native-render-html/commit/ef6514087e516a2d7c4ca2bd13cb022c471edb8e))
* support for loading HTML from URI ([2fba800](https://github.com/meliorence/react-native-render-html/commit/2fba800ba1bfb574caf37cedf181e4b4398e2163))
* triggerTREInvalidationPropNames prop ([8a18fdb](https://github.com/meliorence/react-native-render-html/commit/8a18fdb89faee3c9defa97ca4622ea9fda9495d2))

### Performance Improvements

* avoid calls to getImageDimensions API when provided in attrs ([2c6211e](https://github.com/meliorence/react-native-render-html/commit/2c6211e5165d634ab5af9397b7fa649c15d0ddc8))

# v5.1.1

## Bugfixes

- wrong `nodeIndex` for children of `ul` and `ol` tags
- `alterChildren` function return type

# v5.1.0

## Bugfixes

- prop `source.uri` failing to cause HTML to load

## Features

- `allowWhitespaceNodes` prop to avoid removal of whitespace-filled text nodes
- re-renders on `baseFontStyle` updates (port from dev/4.x branch)
# v5.0.1

## Bugfixes

- Accurate typescript typings for `onParsed`, `alterData`, `alterChildren`
  (thanks [@SPWizard01](https://github.com/SPWizard01))

# v5.0.0

## Enhancements

- New `source` prop which deprecates `html` and `uri` props. This prop
  supports `method`, `body` and `headers` fields :rocket:
- Brand new `HTMLImage` component which should be much better at adapting its
  size to available width. For this to happen, **you must** pass `contentWidth`
  prop. We recommend using `useWindowDimensions().width` to handle screen
  rotation gracefully. If you don't want your images to grow after a certain
  size, you could use `computeEmbeddedMaxWidth`. Read the RFC document [“A
  Deterministic Approach to Embedded Content
  Scaling”](https://github.com/meliorence/react-native-render-html/blob/master/rfc/001-A-deterministic-approach-to-embedded-content-scaling.adoc)
  for more details.
- New prop `computeEmbeddedMaxWidth` (see usage above).
- New prop `contentWidth` (see usage above).
- New prop `htmlParserOptions` to override
  [htmlparser2](https://github.com/fb55/htmlparser2/wiki/Parser-options)
  ParserOptions object, thanks [@fabianlee1211](https://github.com/fabianlee1211).
- `onLinkPress` has now a default value: open links with `Linking` API
  (recommended).
- Add Podspec file, thanks [@systemride](https://github.com/systemride)
- New `WebView` optional prop for plugins which requires it, see
  [@native-html/plugins](https://github.com/native-html/plugins), thanks
  [@IjzerenHein](https://github.com/IjzerenHein)
- New `defaultTextProps`, thanks [@Peretz30](https://github.com/Peretz30)
- New `defaultWebViewProps` for `WebView`-based plugins (tables, iframes...).
- Export `constructStyles`, `getParentsTagsRecursively`,
  `getClosestNodeParentByTag` and `IGNORED_TAGS` from index.js.
- New `domNode` field in `passProps`.
- New `domNodeToHTMLString` util to get the HTML representation of a DOM node.
- The internal pre-render tree structure is now typed (`TransientNode`) as well as `onParsed`.

## Bugfixes

- Image getting blur on iOS, [#141](https://github.com/meliorence/react-native-render-html/issues/141);
- `img`'s tag `resizeMode` property not modifiable through `tagStyles`, [#172](https://github.com/meliorence/react-native-render-html/issues/172);
- `imagesMaxWidth` not working, [#412](https://github.com/meliorence/react-native-render-html/issues/412)

## DEPRECATED PROPS (removed in v6)

- `allowFontScaling`, use `defaultTextProps.allowFontScaling` instead;
- `textSelectable`, use `defaultTextProps.selectable` instead;
- `decodeEntities`, use `htmlParserOptions.decodeEntities` instead.
- `html`, use `source.html` instead.
- `uri`, use `source.uri` instead.

## BREAKING CHANGES

- (TypeScript users), requires minimum TypeScript version 3.5 (was 2.0)
- `iframe` tag element is not rendered anymore, and `react-native-webview` has
  been removed from peer dependencies; use
  [`@native-html/iframe-plugin`](https://github.com/native-html/plugins/tree/master/packages/iframe-plugin#readme)
  instead, which supports `onLinkPress` and scales to content width :rocket:.
- `imagesMaxWidth` and `staticContentMaxWidth` have been discontinued in favor
  of `computeEmbeddedMaxWidth`. This function takes the provided `contentWidth`
  as 1st argument, tag name as 2d argument and returns the max width of the
  embedded (iframe, image...).
- In the `passProps` 4th argument of renderer functions, the field
  `rawChildren` has been renamed to `transientChildren`.

# v4.2.5

## Bugfixes

- re-render `HTML` component on `baseFontStyle` updates

# v4.2.4

## Bugfixes

- `src` attributes starting with "//" in `img` and `iframe` elements are not rendered ([#408](https://github.com/meliorence/react-native-render-html/issues/408))

# v4.2.3

## Bugfixes

- Rendered HTML with uri prop displays “undefined” ([#256](https://github.com/meliorence/react-native-render-html/issues/256))
- Custom wrapper ignored ([#276](https://github.com/meliorence/react-native-render-html/issues/276)), thanks [@tomdaniel-it](https://github.com/tomdaniel-it)

## Enhancements

- `HTML`: use a proxy method `setStateSafe` to avoid updating while unmounted.

# v4.2.2

## Bugfixes

- Translated elements bloated with HTML component props ([#384](https://github.com/meliorence/react-native-render-html/issues/384), [#383](https://github.com/meliorence/react-native-render-html/issues/383))
- Unable to resolve stream module ([#244](https://github.com/meliorence/react-native-render-html/issues/244))
- `textSelectable` not working for tagName `textwrapper` ([#193](https://github.com/meliorence/react-native-render-html/issues/193)), thanks [@brsaylor2](https://github.com/brsaylor2)
- CSS font-family values ignored because of false positive match ([#266](https://github.com/meliorence/react-native-render-html/issues/266))
- CSS text-align unrecognized value ([#252](https://github.com/meliorence/react-native-render-html/issues/252))
- CSS inline rules with "none" values ([#319](https://github.com/meliorence/react-native-render-html/issues/319))
- CSS restrict display attribute to flex and none ([#257](https://github.com/meliorence/react-native-render-html/issues/257))
- Typos in IGNORED_TAGS arrays ([#249](https://github.com/meliorence/react-native-render-html/issues/249), [#272](https://github.com/meliorence/react-native-render-html/issues/272))
- Re-render after classesStyles and tagsStyles updates ([#343](https://github.com/meliorence/react-native-render-html/issues/343), [#377](https://github.com/meliorence/react-native-render-html/issues/377)), thanks [@jorgemasta](https://github.com/jorgemasta)
- Image size computed after HTMLImage component marked as mounted, thanks [@laurynas](https://github.com/laurynas)

## Enhancements

- Replace deprecated references to RN PropTypes with loose types, thanks [denissb](https://github.com/denissb)
- “Dumb” support for `acronym` tag, thanks [Brainyoo](https://github.com/Brainyoo)
- Stricter handling of CSS rules !important directives stripping

## Miscellaneous

- Added a [CHANGELOG](https://github.com/meliorence/react-native-render-html/tree/v4.2.2/CHANGELOG.MD) (#314)
- Each fix [has his regression test implemented along](https://github.com/meliorence/react-native-render-html/tree/v4.2.2/src/__tests__)
- Some behaviors have been tested to prepare the ground for future refactorings
- Upgraded lint tooling to prepare for PR guidelines and CI

# v4.2.1

## Improvements

- Add typescript definitions #341 (thanks @jsamr and to everyone that helped him !)

# v4.2.0

**⚠️ `react-native-webview` is now a peer dependency**. As a result, you need to install it yourself. Please follow [the plugin's instructions](https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md).

---

- Fix deprecation warnings for componentWillReceiveProps, ...WillUpdate (thanks [@peacechen](https://github.com/peacechen))
- Fix crashes with `<iframe>` tag (thanks [@Ryabchikus](https://github.com/Ryabchikus))
- Upgraded demo app to RN 0.59.10 (fixes build issues on XCode 11) (thanks [@IjzerenHein](https://github.com/IjzerenHein))
- Use `baseFontSize` for `<a>` tags

# v4.1.1

## Important note

⚠️ **As of this release, `react-native-render-html` is now compatible with RN < 0.58 once again. Feel free to upgrade from `3.10.0` to `4.1.1` regardless of your RN version.** ⚠️

## Bugfixes

- Prevent crash when encountering css functions like `style="calc(100% - 20px);"`
- Prevent crash when encountering `normal` and `unset` keys

# v4.1.0

## Features

- Add a default renderer for `<pre>`. This lets you display preformatted text such as code inside your content with a monospace font. #196
- Add `allowFontScaling` prop. #157 (thanks @amhinson !)
- Support `srcdoc` in `<iframe>` tags. #148 (thanks @charpeni !)

![](https://i.imgur.com/SAjVPDC.png)

## Bugfixes

- Properly display an error when fetching a remote content to display has failed. #199 (thanks @Alex123456780)
- Fix the rendering of nested lists, like `<ul>` inside `<ol>` #173 (thanks @muhamad-rizki)
- Don't update `HTMLImage`'s state after it's been unmounted. This prevents warnings during development. 4fca299
- Don't strip line breaks in `<pre>` tags #196 (thanks @henry40408 !)

## Miscellaneous

- Remove useless `stream` dependency from `package.json` #190 (thanks @ramuse !)
- Fix typo in the documentation #205 (thanks @ajmeese7 !)

# v4.0.0

#### ⚠️ **This version requires react-native 0.58 and up. If you're using an older version, please stick to the version 3 of this plugin.** ⚠️

## Bugfixes

- Prevent crash on react-native 0.58 and above since `ViewStylePropTypes` and `ImageStylesPropTypes` have been deprecated. (thanks @ChrisEdson !)

# v3.10.0

## Features

- Add `renderersProps` prop. This lets you pass a set of props to your custom renderers, allowing you to style them furthermore without duplicating the renderers code. For instance, if you create a `blockquote` custom renderer, you can alter its color depending on the data you're rendering.

Example :

```javascript
<HTML source={...} renderers={renderers} renderersProps={{ color: 'blue' } />
<HTML source={...} renderers={renderers} renderersProps={{ color: 'red' } />

const renderers = {
    blockquote: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        const { renderersProps } = passProps;
        // rendersProps : { color: blue/red }

        return ...
    }
}
```

## Rework

- The logic that applies text styling has been rewritten from scratch. The previous implementation had a lot of flaws that were hard to debug. This should be a much needed improvement addressing some of the oldest issues of this plugin. [The new algorithm is explained here](https://github.com/meliorence/react-native-render-html/issues/102#issuecomment-375594792).

⚠️ _Although this shouldn't be a breaking change, your current rendering might be taking into account the previous buggy implementation. Upgrading to `3.10.0` might break some of your advanced text styling, just because it's now working as it should have from the beginning._ ⚠️

## Bugfixes

- Is some cases, text nodes used to be wrapped in additional `<p>` tags. This could have unintended style effects. Let's now wrap them in a new custom tag that behaves like an inline tag, but without styling : `textwrapper`

# v3.9.2

## Miscellaneous

- Minor fix with the npm release, no code change from the previous version.

# v3.9.1

## Features

- Handle absolute font sizes : medium, xx-small, small... (thanks @ikhsanalatsary) Closes #122
- Add `ptSize` prop (thanks @ikhsanalatsary)
- Improve `<iframe>` rendering, letting you set their dimensions through `tagsStyles` & `classesStyles`. These are overriden by `height` and `width` html attributes. Closes #110

## Bugfixes

- Addresses issues when `fontWeight` property mistakenly got converted from string to a number. This resulted in crashes due to the wrong type. (thanks @mchudy !) Closes #111
- Prevent a crash when rendering an `<img>` if you happen to have a style on your HTML container that's not an array (thanks @ikhsanalatsary) Closes #120
- Remove `!important` annotations that prevented some styles from being rendered Closes #121

## Miscellaneous

- Fix typos & `baseFontStyle` value in README (thanks @charpeni) Closes #116
- `staticContentMaxWidth` and `imagesMaxWidth` now have `Dimensions.get('window').width` as their default values

# v3.9.0

## Features

- Add `staticContentMaxWidth` prop, letting you set a maximal width for "non-responsive" renderers (only `<iframe>` for now)
- All attributes are now passed in `onLinkPress` : `evt`, `href`, `htmlAttribs` (thanks @barbogast !)
- Add `allowedStyles` prop, excluding everything but these ones (thanks @krystofcelba !)

# v3.8.1

## Bugfixes

- Properly merge `baseFontStyle` and default text styles, fixes #96

# v3.8.0

## Features

- Add `getClosestNodeParentByTag` to the available utils functions
- Add `textSelectable` prop (thanks @hyb175 !)
  > On iOS, you can copy the text, but not actually select what you want. This is a bug from react-native, see https://github.com/facebook/react-native/issues/13938
- Add default renderer for `<s>` (thanks @hyb175 !)

## Bugfixes

- The component should now re-render accordingly to your props updates ! Fixes #89, closes #83 as well as many other related issues
  > This is very important, especially if you need to update your rendering
  > after it’s been displayed, or simply if you want to use hot reloading.
- `inherit` styles won't crash the rendering anymore, fixes #87

## Improvements

- `ignoredStyles` prop will now also remove styling passed directly through HTML attributes, see #86

## Miscellaneous

- Removed `lodash.isequal` dependency
- Rename iOS demo app with a more recognizable name

# v3.7.0

## Features

- You can now alter the `RNElements` (basically the representation of your DOM elements into native components) with the `onParsed` prop, letting you customize even more your content.

## Bugfixes

- Add missing `parentTag` to elements, fixing an important regression where your `tagsStyles` may not be applied. (thanks @Krizzu !)

## Miscellaneous

- Updated the demo with the latest version of `react-native` and its dependencies.

# v3.6.0

## New features

- Add `alterNode` prop that lets you change the values parsed from your HTML before it's rendered. It's extremely powerful as a last resort to add some very specific styling or circumvent rendering problems.
- You can now set your custom renderers as inline components. By default, your renderers will still behave as blocks.

## Fixes

- `<ul>` and `<ol>` styles aren't hardcoded anymore, you can now style them normally. (thanks @jonathonlui !)
- `<a>` tags will properly use your `ignoredStyles` prop (thanks @YeatsLu !)

# v3.5.1

- Fix : prevent crash with specific styling. This happens when the renderer is applying text-specific styles from a View wrapper to its Text children.

# v3.5.0

## New features

- Add `baseFontStyle` prop, **(replacing `baseFontSize` !)** allowing you to provide complete default styling to your text elements (#25)
- Add `listsPrefixesRenderers` prop, allowing you to customize the bullets and numbers rendered in your `<ul>` and `<ol>` lists
- Add `imagesInitialDimensions` prop
- Finished writing the base code for loading and parsing remote websites. Added a basic loader and error handlers.
- Add `remoteLoadingView` & `remoteErrorView` props
- Add `onParsed` prop, this is fired upon first rendering with the the parsing result of `htmlparser2` and of this module
- `HTMLImage`: render the `alt` attribute when images couldn't be displayed
- `HTMLImage`: `width` and `height` attribute now resize your image
- Add `debug` prop, printing the parsing result of `htmlparser2` and of this module after initial rendering

## Fixes

- Make `classesStyles` take precedence over `tagsStyles` (#35)
- Greatly improve text styling nested inside views
- In some cases, raw texts children weren't wrapped with their texts siblings, so their styling wouldn't apply properly
- Title tags like `<h1>`, `<h2>` and so on will always break line between each others
- `HTMLImage`: don't overscale images when `imagesMaxWidth` prop is set to a higher value than the original width of your images
- Correct some edge cases where random line breaks would randomly happen
- Properly render raw texts nested inside `<a>` tags
- `tagsStyles` is now applied `_constructStyles` so your custom renderers have proper styling

# v3.4.0

## New features

- Add `alterData` & `alterChildren` props, allowing you to change your HTML data before the intial rendering !

## Fixes

- Empty lists won't crash (thanks @peacechen !)
- `baseFontSize` prop won't override the `fontSize` set by either : the `style` attribute, the `tagsStyles` and `classesStyles` prop

# v3.3.0

## New features

- Add `customWrapper` prop

## Fixes

- Use `ViewPropTypes` to get rid of the deprecation warning

# v3.2.0

## New features

- Add `baseFontSize` prop so you can change the size of all your texts in a single prop without having to style every text tag (thanks @peacechen !)

## Fixes

- Texts elements that are siblings of `<br>` tags should receive the styling of their parent properly
- Line breaks in your HTML won't actually render line breaks in your native components, for instance :

```html
<p>
  <b>Description</b><br />Some description...<br />
  Item 1, Item 2, Item 3,
</p>
```

Item 1, 2, and 3 will be on the same line, regardless of the line breaks of the snippet.

# v3.1.0

## New features

- Add `decodeEntities` prop (`true` by default)

# v3.0.0

This is a major overhaul of the whole module, adding a lot of features, fixing numerous bugs, and... breaking some things. The whole codebase has been refactored and cleaned-up. The javascript style and linters have been updated accordingly.

## Demo

This component now comes with a demo that showcases every feature. It will be very useful to keep track of bugs and rendering differences between the different versions of react-native.

It will be mandatory to refer to an example of the demo or to provide one when submitting an issue or a pull request for a new feature.

## New features

- The whole parsing and rendering logic has been written from scratch. **It shoud now be able to render anything you throw at it without breaking a sweat** _(we mean without crashing)_
- Greatly improve & fix the default renderer of images, with support for broken links in a browser-like way
- Add support for `em` sizing !
- Add support for percentage sizing !
- Add `ignoredTags` prop, you're now able to get rid of those nasty `<script> or <blink>` (seriously ?) more easily
- Add `ignoredStyles` prop. Want to make sure no `background-color` is applied through the `style` attribute ? You got it
- Add more parameters to your custom renderers, like the CSS styling that has been converted
- (experimental), use a remote website as the source of parsed HTML !
- Add a default renderer for `<iframes>` & `<i>` tags
- Add `classesStyles` prop to style your components with their respective HTML classes
- Add `ignoreNodesFunction` prop so you can ignore HTML tags very precisely

## Fixes

- **You shouldn't encounter random line breaks in your texts** when using tags like `<em>`, `<i>`, `<strong>`... even if they're not wrapped in a parent like `<p>`
- Properly re-render everything if the HTML source changes
- Images nested inside `<a>` should behave and receive taps properly
- Don't crash when tapping an `<a>` tag without `href` attribute
- Prevent the manual prop-checking handling the CSS to RN conversions from drowning you with YellowBoxes

# v2.1.0

Courtesy @duyphambhtech :)

- Remove `shallowCompare` and replace with `PureComponent`
- Fix crash when `<img>` tag has no src attribute
- Render `<br>` tag
- Render `<sub>` and `<sup>`
- Fix import `PropTypes` from `prop-types`
- Convert code to conform to Javascript Standard Style
- Fix crash calling `PropTypes` validators directly

# v2.0.0

Compatibility with react-native 0.43.2+ (react 16)

# v1.0.0

Initial release, usable with react >= 0.20 <= 0.42.2 (react 15)
