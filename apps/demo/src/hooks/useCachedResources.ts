import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';
import {
  SourceCodePro_400Regular,
  SourceCodePro_400Regular_Italic,
  SourceCodePro_600SemiBold
} from '@expo-google-fonts/source-code-pro';
import {
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_600SemiBold
} from '@expo-google-fonts/raleway';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': SpaceMono_400Regular,
          SourceCodePro_400Regular,
          SourceCodePro_400Regular_Italic,
          SourceCodePro_600SemiBold,
          Raleway_400Regular,
          Raleway_400Regular_Italic,
          Raleway_600SemiBold
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
