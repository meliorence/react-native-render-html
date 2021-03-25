import { ColorsShape } from './themeColors';
import Color from 'color';

export interface ComponentColors {
  navHeader: {
    tintColor: string;
    selectColor: string;
    backgroundColor: string;
  };
  drawer: {
    backgroundColor: string;
    activeTintColor: string;
    activeBackgroundColor: string;
  };
  html: {
    backgroundColor: string;
    color: string;
    border: string;
  };
  snackbar: {
    backgroundColor: string;
  };
  displayLoading: {
    color: string;
  };
  tsSourceBottomButton: {
    backgroundColor: string;
    color: string;
  };
  tide: {};
  sourceBox: {
    color: string;
    backgroundColor: string;
  };
  controls: {
    tintColorOff: string;
    tintColorOn: string;
    trackColorOn: string;
    trackColorOff: string;
  };
}

export default function componentColors(
  themeColors: ColorsShape,
  colorScheme: 'dark' | 'light'
): ComponentColors {
  // const isDark = colorScheme === 'dark';
  const overlay = Color(themeColors.surface).lighten(0.75).string();
  return {
    navHeader: {
      tintColor: themeColors.onPrimary,
      selectColor: themeColors.accent,
      backgroundColor: themeColors.primary
    },
    drawer: {
      backgroundColor: overlay,
      activeTintColor: themeColors.accent,
      activeBackgroundColor: Color(themeColors.primary).alpha(0.1).string()
    },
    html: {
      backgroundColor: themeColors.background,
      color: themeColors.text,
      border: themeColors.border
    },
    snackbar: {
      backgroundColor: themeColors.notification
    },
    displayLoading: {
      color: themeColors.accent
    },
    tsSourceBottomButton: {
      backgroundColor: themeColors.primary,
      color: themeColors.accent
    },
    tide: {},
    sourceBox: {
      color: themeColors.background,
      backgroundColor: themeColors.text
    },
    controls: {
      tintColorOn: themeColors.accent,
      tintColorOff: themeColors.card,
      trackColorOn: Color(themeColors.accent).alpha(0.5).string(),
      trackColorOff: Color(themeColors.placeholder).alpha(0.3).string()
    }
  };
}
