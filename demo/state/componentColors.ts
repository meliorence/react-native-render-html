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
}

export default function ComponentColors(
  themeColors: ColorsShape
): ComponentColors {
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
    }
  };
}
