---
name: Bug Report
about: If you have found a bug, you should chose this template.
title: ''
labels: bug
---

<!--
  MAKE SURE TO READ AND FOLLOW THIS TEMPLATE CLOSELY OR YOUR ISSUE WILL BE
  CLOSED WITHOUT NOTICE
  
  We expect that it will take you about 30 minutes to produce a high-quality
  bug report.  While this may seem like a lot, putting care into issues helps
  us fix them faster.
-->

### Oath

I swear that I have completed these tasks before submitting:

- [ ] I have read the guidelines here: https://git.io/JJchR
- [ ] I have read the documentation here: https://git.io/JJcAl 
- [ ] I have checked that the bug has not been reported yet

### Decision table

<!--
  A good amount of Bug Reports are actually feature requests. To help you with
  that, read and check all the boxes to make sure you really need to fill the
  full template.

  IF YOU LEAVE AT LEAST ONE BOX UNCHECKED, YOU SHOULD INSTEAD OPEN A FEATURE
  REQUEST HERE: https://git.io/JJCeo
-->

- [ ] My issue does not look like “The HTML attribute 'start' is not respected” 
- [ ] My issue does not look like “The HTML element `<video>` is not rendered”

### Bug Report


#### Setup

<!--
  REMARK: you can skip and delete the React Native section if you are providing
  a full reproduction in a snack or git repository which are using the latest
  versions of React Native or Expo SDK.
-->
##### React Native

<!--
  Paste the result of running “npx react-native info” or “expo diagnostics”
  inside the backtics.
-->

```

```

<!--
  REMARK: you can skip and delete the Libraries section if you are providing
  a full reproduction in a snack or git repository which are using the latest
  versions of react-native-webview and react-native-render-html.
-->
##### Libraries

<!--
  Print the versions of each library. You are expected to always test the
  latest version of react-native-render-html.
-->

- react-native-render-html:
- react-native-webview:

<!--
  REMARK: you can skip and delete the Devices section if your issue meets at
  least one of the following criterion:

  - it does not happen on a device, e.g. during bundling or testing with jest;
  - you have demonstrated with a test or a debugging tool that the bug resides
    in the rendering tree (at React level) and not at native level, and thus is
    platform-independent.
-->
#### Devices

<!--
  Give the details of the devices in which you have tested the issue. Please
  also include devices in which you could not reproduce the issue! You are
  welcome to mention simulators and emulators.

  It is required that you test on at least one Android and iOS device. If you
  can reproduce the issue for one device, set "Diagnostic" to "reproduction",
  otherwise set it to "negative".

  If you had a chance to test the issue in production, please add new devices
  entries for each of these, and set the "Environment" value to "production".
-->

- Device 1 <!-- emulator (Google Pixel 3a) -->
  * OS: <!-- Android 9.0 -->
  * Diagnostic: <!-- reproduction / negative -->
  * Environment: <!-- production / development -->
- Device 2 <!-- simulator (iPhone X) -->
  * OS: <!-- iOS 13.0 -->
  * Diagnostic: <!-- reproduction / negative -->
  * Environment: <!-- production / development -->

#### Reproduction

##### Description

<!--
  How would you describe your issue to someone who doesn’t know you or your
  project?  Try to write a sequence of steps that anybody can repeat to see
  the issue.  Be specific! If the bug cannot be reproduced, your issue may be
  closed.

  You must also provide a description of the expected outcome and compare with
  the observed outcome.
-->

(Write your steps here:)

1.
2.
3.

(Describe the expected outcome, and compare it to the observed outcome. You are
encouraged to join screenshots and screencasts, or pictures of the rendering
tree from debugging tools such as flipper)

##### Reproducible Demo

<!--
  Please share a project that reproduces the issue.  There are two ways to do
  it:

    * Create a new app using https://snack.expo.io/ and try to reproduce the
      issue in it.  This is useful if you roughly know where the problem is,
      or can’t share the real code.

    * Or, copy your app and remove things until you’re left with the minimal
      reproducible demo.  This is useful for finding the root cause. You may
      then optionally create a Snack.

  This is a good guide to creating bug demos:
  https://stackoverflow.com/help/mcve Once you’re done, copy and paste the
  link to the Snack or a public GitHub repository below:
-->

(Paste the link to an example project or paste the entirety of the relevant
source code. When deemed appropriate, provide instructions to reproduce the
issue.)

<!--
  What happens if you skip this step?

  Someone will read your bug report, and maybe will be able to help you, but
  it’s unlikely that it will get much attention from the team. Eventually, the
  issue will likely get closed in favor of issues that have reproducible
  demos.

  Please remember that:

    * Issues without reproducible demos have a very low priority.
    * The person fixing the bug would have to do that anyway. Please be
      respectful of their time.
    * You might figure out the issues yourself as you work on extracting it.

  Thanks for helping us help you!
-->
