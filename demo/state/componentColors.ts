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
  demoSectionTitle: {
    backgroundColor: string;
    color: string;
  };
  demoCaption: {
    backgroundColor: string;
    color: string;
  };
}

export default function componentColors(
  themeColors: ColorsShape
): ComponentColors {
  const backgroundIsDark = Color(themeColors.background).isDark();
  return {
    navHeader: {
      tintColor: themeColors.onPrimary,
      selectColor: themeColors.accent,
      backgroundColor: themeColors.primary
    },
    drawer: {
      backgroundColor: Color(themeColors.surface).lighten(0.75).string(),
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
    demoSectionTitle: {
      backgroundColor: backgroundIsDark
        ? Color(themeColors.background).lighten(0.3).string()
        : Color(themeColors.primary).lighten(1.3).string(),
      color: themeColors.text
    },
    demoCaption: {
      backgroundColor: themeColors.primary,
      color: themeColors.onPrimary
    }
  };
}
