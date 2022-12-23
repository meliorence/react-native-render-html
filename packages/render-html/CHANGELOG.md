# [6.4.0](https://github.com/meliorence/react-native-render-html/compare/v6.3.4...v6.4.0) (2022-12-23)


### Features

* add switchProp testID value to nativeProps testID attribute ([#574](https://github.com/meliorence/react-native-render-html/issues/574)) ([299b852](https://github.com/meliorence/react-native-render-html/commit/299b852eeb6ec5ce2b08d84fa230408fe21753f3))
* move config for 'img' and 'a' into named interface ([2bd0ba1](https://github.com/meliorence/react-native-render-html/commit/2bd0ba1a6f463fdc095dd4c1cadad9cc3a0a9a6b))

## [6.3.4](https://github.com/meliorence/react-native-render-html/compare/v6.3.3...v6.3.4) (2022-01-24)


### Bug Fixes

* link press on Android doesn't work ([1a429f4](https://github.com/meliorence/react-native-render-html/commit/1a429f4ef7d9677884cb914d5ee93183a7c4367d)), closes [#546](https://github.com/meliorence/react-native-render-html/issues/546)

## [6.3.3](https://github.com/meliorence/react-native-render-html/compare/v6.3.2...v6.3.3) (2022-01-11)

## [6.3.2](https://github.com/meliorence/react-native-render-html/compare/v6.3.1...v6.3.2) (2022-01-11)

## [6.3.1](https://github.com/meliorence/react-native-render-html/compare/v6.3.0...v6.3.1) (2021-12-03)


### Bug Fixes

* bold style not applied to `<b>` tags ([7bd5045](https://github.com/meliorence/react-native-render-html/commit/7bd5045bd6458681e7e6d875cb89c9ee67f8c402)), closes [#539](https://github.com/meliorence/react-native-render-html/issues/539)
* wrong prop reference in warning message ([e03b0ac](https://github.com/meliorence/react-native-render-html/commit/e03b0acda71ac305f983d252875e34f035d605c0)), closes [#541](https://github.com/meliorence/react-native-render-html/issues/541)

# [6.3.0](https://github.com/meliorence/react-native-render-html/compare/v6.2.0...v6.3.0) (2021-11-03)


### Bug Fixes

* `provideEmbeddedHeaders` results in failing fetch for img ([5488259](https://github.com/meliorence/react-native-render-html/commit/54882596c78a7f66aa5f1766820de646866f6bd8)), closes [#533](https://github.com/meliorence/react-native-render-html/issues/533)


### Features

* pass `TNodeChildrenRenderer` as a prop to custom renderers ([9dd2bf1](https://github.com/meliorence/react-native-render-html/commit/9dd2bf15de3e7f30858451a8daed5d3c0973a6e6))

# [6.2.0](https://github.com/meliorence/react-native-render-html/compare/v6.1.0...v6.2.0) (2021-10-23)

This release is focused on accessibility! Moreover, it empowers [model-based custom rendering](https://meliorence.github.io/react-native-render-html/docs/guides/custom-renderers#model-based-custom-rendering) which can now define props passed to `Text` and `View` elements of renderers.

### Bug Fixes

* inaccurate typing for HTMLElementModelRecord ([bd5dfa6](https://github.com/meliorence/react-native-render-html/commit/bd5dfa6f5a6b403c99045720f175e64d884f4742))
* pass `borderless` prop to custom `GenericPressable` ([f06af7a](https://github.com/meliorence/react-native-render-html/commit/f06af7a54294275bbaff21baeacdba56fa8bc3c4))
* never assume the definition of `__DEV__` in the global scope ([f9bb9e9](https://github.com/meliorence/react-native-render-html/commit/f9bb9e969ad6b169ee60940daf1409630589f548))
* **a11y:** anchors should not be set with a11y role "link" when empty href ([dd988fc](https://github.com/meliorence/react-native-render-html/commit/dd988fcc9c9f03aecb1bc20f904cf19e0c5f6ff6))
* **a11y:** anchors are not accessible anymore when `href` is empty or absent ([4e1f2f4](https://github.com/meliorence/react-native-render-html/commit/4e1f2f4b6b46186b564a7ccbf53fecf0877795e0))

### Features

* new `getNativePropsForTnode` util method ([d983d0d](https://github.com/meliorence/react-native-render-html/commit/d983d0d768580307f41d38b70bda06e70122b970))
* **css:** support `user-select` CSS property ([8442b2f](https://github.com/meliorence/react-native-render-html/commit/8442b2fa655a1332035beca99a7fbbdc1d483ec4))
* **a11y:** support `aria-label` and `aria-role` HTML attributes ([2b27f00](https://github.com/meliorence/react-native-render-html/commit/2b27f00c118eae76dec21f0f9cc2af20c9cd6747))
* **a11y:** add accessibilityRole="header" to headings elements (h1...h6) ([1c79bc3](https://github.com/meliorence/react-native-render-html/commit/1c79bc35146f311468d9a69165e813151e2603e1))
* new `reactNativeProps` and `getReactNativeProps` in `HTMLElementModel`, this little change gives model-based custom rendering considerably more leverage. ([4ee1646](https://github.com/meliorence/react-native-render-html/commit/4ee1646b26f8c9e3ea1cd45527f7228dd4a9892b))
* deprecate `getUADerivedStyleFromAttributes` in favor of `getMixedUAStyles` in `HTMLElementModel`, which allows access to the underlying `TNode` and again empowers model-based custom rendering.
* **a11y:** whatwg-compliant accessibility for images ([7fc2907](https://github.com/meliorence/react-native-render-html/commit/7fc2907e38b37398314eadc9ec0200092c4a2304))
* **a11y:** custom renderers passed `onPress` prop now have a11y roles ([11723f0](https://github.com/meliorence/react-native-render-html/commit/11723f0b841fa72a739e75b2c7576231e6ad7662))
* **a11y:** support aria-role="search" and aria-role="presentation" attributes ([c552fe4](https://github.com/meliorence/react-native-render-html/commit/c552fe46667c06ff65312f2c273c0b94f930916d))
* allow `HTMLElementModel.extend` to take a merge function ([9b3a007](https://github.com/meliorence/react-native-render-html/commit/9b3a007cf984c477d851000ac6812f5a91b17a89))
* support `onPress` from element models native props ([7dc5577](https://github.com/meliorence/react-native-render-html/commit/7dc5577405f09e577808172ec4aa4d99c913f5c7))

# [6.1.0](https://github.com/meliorence/react-native-render-html/compare/v6.0.5...v6.1.0) (2021-08-29)

### Features

* add new `renderIndex` and `renderLength` props to `TDefaultRendererProps` ([4f032d3](https://github.com/meliorence/react-native-render-html/commit/4f032d3594e184926847f9c7c20060280f436390))
* new `enableExperimentalBRCollapsing` prop to prevent extraneous spaces ([e019a5a](https://github.com/meliorence/react-native-render-html/commit/e019a5ab046bab01bb307970d4aac2d9a1c59db9)), closes [#516](https://github.com/meliorence/react-native-render-html/issues/516), see [official documentation](https://meliorence.github.io/react-native-render-html/docs/content/textual#line-breaks)
* new `enableExperimentalGhostLinesPrevention` to circumvent RN bug ([3645211](https://github.com/meliorence/react-native-render-html/commit/3645211ca6b6bd8cb43d7298ffbb33a851d34326)), see [official documentation](https://meliorence.github.io/react-native-render-html/docs/content/textual#empty-tags)
* new `provideEmbeddedHeaders` prop to pass headers to img, iframes and other embedded in the future ([2ea1ca6](https://github.com/meliorence/react-native-render-html/commit/2ea1ca6a0fc58aca59ff4fbc080dfeb7f739ff88))
* new `bypassAnonymousTPhrasingNodes` prop ([90b8a3d](https://github.com/meliorence/react-native-render-html/commit/90b8a3d16729d77c073585118ef795aa28d13bd6)), closes [#514](https://github.com/meliorence/react-native-render-html/issues/514)

### Bug Fixes

* prevent list markers from overflowing in a new line ([f2238aa](https://github.com/meliorence/react-native-render-html/commit/f2238aa1cf7643b1923a2dd47fa2acb63a383570))

## [6.0.5](https://github.com/meliorence/react-native-render-html/compare/v6.0.4...v6.0.5) (2021-07-31)


### Bug Fixes

* test presence of "performance" global variable in useProfiler ([7379c9b](https://github.com/meliorence/react-native-render-html/commit/7379c9b9c533a03754e417b21aaa546f566c5436)), closes [#510](https://github.com/meliorence/react-native-render-html/issues/510)

## [6.0.4](https://github.com/meliorence/react-native-render-html/compare/v6.0.3...v6.0.4) (2021-07-19)


### Bug Fixes

* npm v7 peer dependencies on @native-html/* ([3d50b0e](https://github.com/meliorence/react-native-render-html/commit/3d50b0e79b2869deeebc67fcac7719f50d351e9d))

## [6.0.3](https://github.com/meliorence/react-native-render-html/compare/v6.0.2...v6.0.3) (2021-07-19)


### Bug Fixes

* peer-dependency failure wih npm@7 ([002f555](https://github.com/meliorence/react-native-render-html/commit/002f5550e59679facc65b5236198807c99500d52)), closes [#508](https://github.com/meliorence/react-native-render-html/issues/508)

## [6.0.2](https://github.com/meliorence/react-native-render-html/compare/v6.0.1...v6.0.2) (2021-07-18)

*No changes visible to consumers of this library.*
## [6.0.1](https://github.com/meliorence/react-native-render-html/compare/v6.0.0...v6.0.1) (2021-07-17)

*No changes visible to consumers of this library.*

# [6.0.0](https://github.com/meliorence/react-native-render-html/compare/v6.0.0-beta.8...v6.0.0) (2021-07-17)

**The Foundry release is finally stable, and is now-on the recommended version.** [Check out **the announcement blog post** in our brand new website](https://meliorence.github.io/react-native-render-html/blog/2021/06/07/foundry-announcement). We also have a [**migration guide**](https://meliorence.github.io/react-native-render-html/docs/migration-guide) for those who're coming from v5 and below.

*This changelog highlights changes from **v5**. There are no changes since version 6.0.0-beta.8*
### Features

* `GenericPressable` prop to customize the component wrapping interactive views ([707374a](https://github.com/meliorence/react-native-render-html/commit/707374af4d1bed7d2ca0ea521b21df8ef99d12f0)), closes [#472](https://github.com/meliorence/react-native-render-html/issues/472)
* `pressableHightlightColor` prop to customize pressable appearance ([e5dfa1e](https://github.com/meliorence/react-native-render-html/commit/e5dfa1ed0400ea74528a1243d881591ffab7c85b))
* access `sharedProps` from custom renderers ([0d2199e](https://github.com/meliorence/react-native-render-html/commit/0d2199e3e9c607c442149bc4c3e806d8fb14f95f))
* accessibility for images with role and label ([1accaf7](https://github.com/meliorence/react-native-render-html/commit/1accaf7729d7045c97c2db5b5aeed095c708b465))
* add `react-native` field in package.json for metro ([10dfc82](https://github.com/meliorence/react-native-render-html/commit/10dfc822651c1289dcfb480b687657a88c4ee9c2))
* allow module augmentation for renderers prop via `RenderersProps` ([97dabc1](https://github.com/meliorence/react-native-render-html/commit/97dabc1af6a2d216c68ca4d598cf58f8157d2d26))
* configure `enableExperimentalRtl` in `renderersProps.ol|ul` ([96daa5e](https://github.com/meliorence/react-native-render-html/commit/96daa5e55d7cd43130aeecc44fff88f7413e04ca))
* configure `getFallbackListStyleTypeFromNestLevel` in `renderersProps.ol|ul` ([1377ef7](https://github.com/meliorence/react-native-render-html/commit/1377ef76cfd227fe77def500de63792aff1e47f7))
* configure margins removal for nested lists in `renderersProps.ol|ul` ([316e706](https://github.com/meliorence/react-native-render-html/commit/316e70608b3d95c875b80ca51374e1843d1508d3))
* experimental `dangerouslyDisableHoisting` prop ([e6c7328](https://github.com/meliorence/react-native-render-html/commit/e6c7328587d51ae21f2a4b4699a335a529591638))
* export `defaultListStyleSpecs` for customization. ([2f9ed01](https://github.com/meliorence/react-native-render-html/commit/2f9ed01431af3fb30e69ecefbc6fd7eb1de7ad86))
* export `defaultSystemFonts` and `defaultFallbackFonts` ([0c4207c](https://github.com/meliorence/react-native-render-html/commit/0c4207c5eafd4b9fc69f3fbed9d03ef2f6f1ab86))
* export `buildTREFromConfig` for testing ([c13e1a7](https://github.com/meliorence/react-native-render-html/commit/c13e1a7677142e5a584807436615632bb5dbb613))
* new `propsFromParent` in custom renderers and children renderers ([3bc1b52](https://github.com/meliorence/react-native-render-html/commit/3bc1b52b488eefece693be7aef53186f95584f27)), closes [#228](https://github.com/meliorence/react-native-render-html/issues/228)
* new `renderersProps.(ol|ul).enableDynamicMarkerBoxWidth` prop ([f87b9f6](https://github.com/meliorence/react-native-render-html/commit/f87b9f62ad03723668975ecb507d759eb1840afb))
* new `selectDomRoot` prop to select a custom root ([31bbff7](https://github.com/meliorence/react-native-render-html/commit/31bbff7bae9fdbc2946bac1aada9953056e9009a))
* new `setMarkersForTNode` prop ([63caa4d](https://github.com/meliorence/react-native-render-html/commit/63caa4dd0f01a5894615cb2264be923ad65117c2))
* new `useIMGElementStateWithCache` hook for images ([54dc1bc](https://github.com/meliorence/react-native-render-html/commit/54dc1bc55fece6cd492eb61b91574c697e8d50c8))
* new prop `customListStyleSpecs` to support additional `list-style-type` ([84ec025](https://github.com/meliorence/react-native-render-html/commit/84ec02510ee14bdda66c0cdb8f3bbf273ad46337))
* new source type `RenderHTMLSourceDom` to render a DOM object ([eeec894](https://github.com/meliorence/react-native-render-html/commit/eeec89494aa6c45e2a7af6ee5570838996b47759))
* performant multi-instance HTML rendering with `RenderHTMLSource` ([4e4cd09](https://github.com/meliorence/react-native-render-html/commit/4e4cd0997b9d916517d6f0d907eeaedf2f32466b))
* reexport `CustomElementModel` type from TRE ([c5a01f0](https://github.com/meliorence/react-native-render-html/commit/c5a01f08499a1e73868f173ca3b76db928761905))
* reexport `HTMLModelRecord` from TRE ([a9c9cf3](https://github.com/meliorence/react-native-render-html/commit/a9c9cf3f35c41b948ab2cae336310a2a1dcdc78e))
* reexport `isDomNode` and isDomText from TRE ([cedcf7a](https://github.com/meliorence/react-native-render-html/commit/cedcf7a90a56a2b0ba5554ab4192f2f25e1914ba))
* reexport `SetMarkersForTNode` from TRE ([eaa3928](https://github.com/meliorence/react-native-render-html/commit/eaa3928c89880651399a50a28f3ce44f0ef5312c))
* reexport `TNodeDescriptor` from TRE ([157983c](https://github.com/meliorence/react-native-render-html/commit/157983c948c172e131b8b8414b7292f932f3c6ff))
* reexport `TNodePrintOptions` type from TRE ([6f3265c](https://github.com/meliorence/react-native-render-html/commit/6f3265c3c82fef1199fb6f596cd2918a81761a46))
* support `"object-fit"` CSS property for images ([24f72b0](https://github.com/meliorence/react-native-render-html/commit/24f72b0a870791f0f78871713e39161af99fb51d))
* support `"start"` attribute in ol and ul elements ([b9d3154](https://github.com/meliorence/react-native-render-html/commit/b9d31548460f5a23049f4f1132e27bd19b811ae7)), closes [#336](https://github.com/meliorence/react-native-render-html/issues/336)
* support `"upper-latin"` and `"lower-lattin"` list-style-type CSS props ([a0da60d](https://github.com/meliorence/react-native-render-html/commit/a0da60dd29ac7ce124d2161a63d358222db9e131))
* support `enableRemove*MarginIfNested` for list renderers ([e0fe7c6](https://github.com/meliorence/react-native-render-html/commit/e0fe7c6630a0b498847b4196c023fc92bd42f044))
* support `nodeIndex` and `parent` fields in `TNode` ([fe2504c](https://github.com/meliorence/react-native-render-html/commit/fe2504c82c05b37c738db513cb165071fdb0f901))
* support accessibility for `a` elements ([6974ce6](https://github.com/meliorence/react-native-render-html/commit/6974ce68cb790c3de29d969702ef735896b22c01)), closes [#285](https://github.com/meliorence/react-native-render-html/issues/285)
* support `decimal-leading-zero` list style type prefix ([526e226](https://github.com/meliorence/react-native-render-html/commit/526e226c391272d8af571d017a5681c82ef923f8))
* support default system fonts for Windows, Macos and web ([4474dff](https://github.com/meliorence/react-native-render-html/commit/4474dff21fb203792eb5e9bfb2c23ea77966d4fe))
* support `disclosure-*` list style type prefixes ([218982d](https://github.com/meliorence/react-native-render-html/commit/218982d054efe32a31521de4b9905dc97d241cb6))
* support experimental RTL mode for ol and ul elements ([ca139c1](https://github.com/meliorence/react-native-render-html/commit/ca139c14a9dde4b66ae761b6c3488dd55c7e786d))
* support `lower-greek` list style type prefixes ([3aac2c8](https://github.com/meliorence/react-native-render-html/commit/3aac2c813173237846418fd44c8c54ca7f935392))
* support `lower-latin` and upper-latin list prefix styles ([4d4805c](https://github.com/meliorence/react-native-render-html/commit/4d4805c0fcf17bc87d086d61bc437f00ce26b416))
* **ts:** new generic argument for renderers `propsFromParent` prop ([6427732](https://github.com/meliorence/react-native-render-html/commit/642773262db857dec892ffb1145ce8c0bc0e266d))
* add `defaultViewProps` prop ([ce49232](https://github.com/meliorence/react-native-render-html/commit/ce492322023eacbbb8aa6819014ab1ea13132561))
* add `target` argument to `onLinkPress` handler ([139b0c3](https://github.com/meliorence/react-native-render-html/commit/139b0c381124cc9289235e69981bdb9f34b58cea))
* add `getListStyleTypeFromNestLevel` prop to `HTMLListElement` ([5ae3e6a](https://github.com/meliorence/react-native-render-html/commit/5ae3e6a487b2a39fb1d0e78ad24597ecd806c3ea))
* add new `splitBoxModelStyle` utility ([b1adcbc](https://github.com/meliorence/react-native-render-html/commit/b1adcbc864e0cd32be78b03059d4de9c4bb12e4e))
* `enableExperimentalMarginCollapsing` prop ([ae6c553](https://github.com/meliorence/react-native-render-html/commit/ae6c55379aef12868298850457bd2e85682451da))
* export `useSharedProps` ([f1d7b16](https://github.com/meliorence/react-native-render-html/commit/f1d7b1605bc3193796faed1a5a85aa7d6d204b25))
* expose internal renderers building blocks for extensibility ([213fcd7](https://github.com/meliorence/react-native-render-html/commit/213fcd75cac38c8c593011c37ee6af59202ca126)), closes [#424](https://github.com/meliorence/react-native-render-html/issues/424)
* `fallbackFonts` and `systemFonts` props for font selection ([6888a96](https://github.com/meliorence/react-native-render-html/commit/6888a961b2f7c0fb5549e7b7ce81bcb03b6a3418))
* implement `defaultTextProps` prop ([c297ed1](https://github.com/meliorence/react-native-render-html/commit/c297ed1efa627f8e40537394308bb50666a7a146))
* implement `useInternalRenderer` hook to reuse internal rendering logic ([8c292da](https://github.com/meliorence/react-native-render-html/commit/8c292da4cb859a671c0b349b20c11a858532bad4))
* implement `computeEmbeddedMaxWidth` prop as per RFC001@2.0.0 ([6c9d70f](https://github.com/meliorence/react-native-render-html/commit/6c9d70ff80dea03bf12b51b28199deb8aa7b5f15))
* implement `RenderHTMLDebug` wrapper component to warn users ([22625b4](https://github.com/meliorence/react-native-render-html/commit/22625b4a3ed95d8ed91bd3f8307376ada40b06f2))
* new `cachedNaturalDimensions` prop to `useIMGelementState` hook ([ed976bb](https://github.com/meliorence/react-native-render-html/commit/ed976bb93d8ac11784a6110a951c24487bf7404b))
* new `onDocumentMetadataLoaded` prop ([9f55907](https://github.com/meliorence/react-native-render-html/commit/9f55907dc4240494d401ffb67912e2b33e56bb1c))
* new `TRenderEngineProvider` and `RenderHTMLFragment` components ([7d50e72](https://github.com/meliorence/react-native-render-html/commit/7d50e72bb3dcf585e96bd80d475f9c9170be427b))
* new `extendInternalRenderer` utility ([d7bb1da](https://github.com/meliorence/react-native-render-html/commit/d7bb1dafc78fe6de644b5eade920c74292e01af1))
* new prop `onTTreeChange` ([5ecdcab](https://github.com/meliorence/react-native-render-html/commit/5ecdcab276394e4e6512747bbfd9489777a545ab))
* new `renderChild` prop to `TChildrenRenderer` ([db78c54](https://github.com/meliorence/react-native-render-html/commit/db78c5476f612a7ad84e871f2ff5238a569cb25d))
* new renderers API ([2547cba](https://github.com/meliorence/react-native-render-html/commit/2547cbac4da1e458ff7930b4ff3443bae716fd39))
* `onHTMLLoaded` prop ([981b49b](https://github.com/meliorence/react-native-render-html/commit/981b49b43784297ed797c04589fa3a3cc150fb47))
* port `alterData`, `alterChildren` and `alterNode` ([18dc001](https://github.com/meliorence/react-native-render-html/commit/18dc00155f509b58e790e570ac0e695e8d8ad64f))
* reeport useful types from css-processor ([9b5e301](https://github.com/meliorence/react-native-render-html/commit/9b5e3015cab32826882eefe6fac4e9425bb4a6af))
* reeport useful variables and types from transient-render-engine ([0c0a9c6](https://github.com/meliorence/react-native-render-html/commit/0c0a9c64f415bfb7228a64cb3d450d1168bd1a01))
* reuse 'img' renderer internal logic w/t `useIMGElementState` hook ([399eb54](https://github.com/meliorence/react-native-render-html/commit/399eb546cfc837502cd5ff1f9b73502284c3d3dd)), closes [#424](https://github.com/meliorence/react-native-render-html/issues/424)
* support `htmlParserOptions` prop ([624c57e](https://github.com/meliorence/react-native-render-html/commit/624c57eda491ffb7c016dbc0eaa6407bc4ce105f))
* support `source` prop, identical to react-native-webview ([3a16487](https://github.com/meliorence/react-native-render-html/commit/3a16487da8dc334fdc1d25116cd4b848551b6fe6))
* support a minimal table renderer ([7f64d48](https://github.com/meliorence/react-native-render-html/commit/7f64d48bc63bbe95d364aab34f8914d842625825))
* support for loading HTML from URI ([6c07b8d](https://github.com/meliorence/react-native-render-html/commit/6c07b8dcf07efc6ed8b9ea79f4e7dd0f8d934c69))
* support relative URLs and document metadata ([f2cbcfc](https://github.com/meliorence/react-native-render-html/commit/f2cbcfc4c7b289307c204d8e5ee2cfcc90eee3b4))
* support `source.headers` in `useIMGElementState` hook ([a49e958](https://github.com/meliorence/react-native-render-html/commit/a49e9589cdf27e0b2c8d3dfd79cc2c7742f7baf6))
* `triggerTREInvalidationPropNames` prop ([89ee25c](https://github.com/meliorence/react-native-render-html/commit/89ee25ced763d95c1d43128853ba0f2902c71b33))
* `useRendererProps` hook ([87982c4](https://github.com/meliorence/react-native-render-html/commit/87982c4ceecac39dbc72afac7006d2031ffa11d9))
* warn user of API misusage even when `debug` is set to false ([cb5b42b](https://github.com/meliorence/react-native-render-html/commit/cb5b42b313145f94e565f55754816ef0b3dde591))
* new `renderersProps.(ol|ul).markerTextStyle` prop ([6ca54e9](https://github.com/meliorence/react-native-render-html/commit/6ca54e925272fe350e550457b5313af47311b6eb))
* support `renderersProps.(ol|ul).markerBoxStyle` prop ([c929643](https://github.com/meliorence/react-native-render-html/commit/c929643bd396ebcc69c8c59260cf2c73380c4907))
* new dev profiler to get feedback on short updates ([98fd749](https://github.com/meliorence/react-native-render-html/commit/98fd74941c1e00c8666591328a5547f01824628d))
* use aspectRatio style to infer one dimension of images sizes ([e018b30](https://github.com/meliorence/react-native-render-html/commit/e018b30a7d914042cd544930ce02582869be0ba2))
* export `collapseTopMarginForChild` utility ([199be12](https://github.com/meliorence/react-native-render-html/commit/199be1230d964b34b631851ba4831d4415c15203))

### Performance Improvements

* avoid calls to getImageDimensions API when provided in attrs ([4f3d51d](https://github.com/meliorence/react-native-render-html/commit/4f3d51dc3cc0eadd59b0df8bc5bc03a99f904aea))
* bypass anonymous TPhrasing nodes with one child or less ([dad450d](https://github.com/meliorence/react-native-render-html/commit/dad450db8d79c85ba8ab4a8d585d889d033d2234))
* drop `alter*` props in favor of `domVisitors` ([ffb1f58](https://github.com/meliorence/react-native-render-html/commit/ffb1f586f5674e922d6ba0001b1bc8b1011388be))
* increase transient parsing speed by 30% after upgrade to v6.2.1 ([df91a21](https://github.com/meliorence/react-native-render-html/commit/df91a21e6f8e890c147488360dec6a4003dc1781))
* limit rerenderings via memoization ([6512e18](https://github.com/meliorence/react-native-render-html/commit/6512e18ea39511afdbb6a001205f4ea07863f69f))
* memoize `TDocumentRenderer` to prevent rendering from ascendents ([2ec060b](https://github.com/meliorence/react-native-render-html/commit/2ec060bf3f1351d426e2739af57f63d55cd30f08))
* replace `ignoreDOMNode` with `ignoreDomNode` ([9ec6403](https://github.com/meliorence/react-native-render-html/commit/9ec6403d3bc5e4b8a34099824682257951503a5a))
* replace `ignoredTags` with `ignoredDomTags` ([b60d6eb](https://github.com/meliorence/react-native-render-html/commit/b60d6eb143d76a0fcb8bbf1c8c66363c2dcbdaa8))

### Bug Fixes

* loading image component doesn't display alt and borders anymore ([1351ee5](https://github.com/meliorence/react-native-render-html/commit/1351ee598fa5f0c82e2cb8b54ba4f7c4701d8192))
* discard unsupported CSS inline methods (calc, var) ([a2e7578](https://github.com/meliorence/react-native-render-html/commit/a2e757840fea64c2ea81aacb9bb82510959e13a1))
* images honor styles and physical size in "alt" (error) mode ([059e5d6](https://github.com/meliorence/react-native-render-html/commit/059e5d60908c5a4f328038eb4632426686eba1ca))
* in `<img>` tags, style dimensions should prevail over attributes ([de3b473](https://github.com/meliorence/react-native-render-html/commit/de3b47345007b65ef582bc9689cb4131bd883fad))
* list style prefixes now inherit from font*(weight,style,family) ([191c45c](https://github.com/meliorence/react-native-render-html/commit/191c45c14f9ba7ce63591049edb24a1b6e536516))
* don't peer-depend on prop-types, instead depend directly ([27e843e](https://github.com/meliorence/react-native-render-html/commit/27e843e27141daecaa91e3fee6d0b9970bee07ee))

And all these unlisted in commits: [#94](https://github.com/meliorence/react-native-render-html/issues/94), [#118](https://github.com/meliorence/react-native-render-html/issues/118), [#144](https://github.com/meliorence/react-native-render-html/issues/144), [#150](https://github.com/meliorence/react-native-render-html/issues/150), [#151](https://github.com/meliorence/react-native-render-html/issues/151), [#156](https://github.com/meliorence/react-native-render-html/issues/156), [#165](https://github.com/meliorence/react-native-render-html/issues/165), [#227](https://github.com/meliorence/react-native-render-html/issues/227), [#228](https://github.com/meliorence/react-native-render-html/issues/228), [#243](https://github.com/meliorence/react-native-render-html/issues/243), [#263](https://github.com/meliorence/react-native-render-html/issues/263), [#286](https://github.com/meliorence/react-native-render-html/issues/286), [#312](https://github.com/meliorence/react-native-render-html/issues/312), [#336](https://github.com/meliorence/react-native-render-html/issues/336), [#344](https://github.com/meliorence/react-native-render-html/issues/344), [#360](https://github.com/meliorence/react-native-render-html/issues/360), [#369](https://github.com/meliorence/react-native-render-html/issues/369), [#371](https://github.com/meliorence/react-native-render-html/issues/371) [#414](https://github.com/meliorence/react-native-render-html/issues/414), [#418](https://github.com/meliorence/react-native-render-html/issues/418), [#419](https://github.com/meliorence/react-native-render-html/issues/419), [#420](https://github.com/meliorence/react-native-render-html/issues/420), [#424](https://github.com/meliorence/react-native-render-html/issues/424), [#429](https://github.com/meliorence/react-native-render-html/issues/429), [#432](https://github.com/meliorence/react-native-render-html/issues/432), [#470](https://github.com/meliorence/react-native-render-html/issues/470), [#481](https://github.com/meliorence/react-native-render-html/issues/481), [#482](https://github.com/meliorence/react-native-render-html/issues/482), [#484](https://github.com/meliorence/react-native-render-html/issues/484)

### BREAKING CHANGES

*Those are breaking changes from **v5**. Consumers of the beta will not encounter breaking changes.*

* `ignoredTags` has been replaced with `ignoredDomTags` for naming consistency.
* `alterNode`, `alterData` and `alterChildren` have been dropped in favor of `domVisitors`. The latter is an object with 3 optional callbacks, `onElement`, `onDocument` and `onText` which you can use to intercept and tamper nodes during parsing. Take advantage of [domutils](https://github.com/fb55/domutils) library to delete, insert and manipulate those nodes.
* `ignoreNodesFunction` is now `ignoreDomNode` for naming consistency.
* `enableExperimentalPercentWidth` has been discontinued. Use `renderersProps.img.enableExperimentalPercentWidth` instead.
* `onLinkPress` prop has been discontinued. Use `renderersProps.a.onPress` instead.
* `imagesInitialDimensions` has been moved to `renderersProps.img.initialDimensions`
* `listsPrefixesRenderers` prop has been discontinued. Use `customListStyleSpecs` instead.
* dropped `ptSize` prop. Point is supposed to be an absolute (pixel independent) size and unfit for display devices. It will be translated by the CSS processor to an absolute unit.
* `containerStyle` and `customContainer` props have been dropped. Use `baseStyle` prop instead to style the root component.
* drop `textSelectable` and `allowFontScaling`. Use `defaultTextProps.selectable` and `defaultTextProps.allowFontScaling` instead.
* `uri` and `html` props have been dropped. Replace `uri` with `source={{ uri: 'http://...' }}` and `html` with `source={{ html: '<div> ...' }}`. The former now allows `body`, `headers` and `method` fields.
* `decodeEntities` prop has been dropped. Pass this option to `htmlParserOptions` prop instead.
* `computeImagesMaxWidth` has been replaced with `computeEmbeddedMaxWidth`. The two props are very similar, but the latest takes an extra argument, "tagName", which is the tag for which a width constrain should be enforced. It is planned to work with the @native-html/iframe-plugin extension.

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
