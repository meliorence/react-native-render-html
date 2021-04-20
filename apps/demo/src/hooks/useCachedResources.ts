import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';
import {
  WorkSans_400Regular,
  WorkSans_400Regular_Italic
} from '@expo-google-fonts/work-sans';
import { Lora_400Regular } from '@expo-google-fonts/lora';
import { JosefinSans_200ExtraLight } from '@expo-google-fonts/josefin-sans';
import {
  SourceCodePro_400Regular,
  SourceCodePro_600SemiBold
} from '@expo-google-fonts/source-code-pro';
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_400Regular_Italic,
  IBMPlexMono_600SemiBold
} from '@expo-google-fonts/ibm-plex-mono';
import { IBMPlexSerif_400Regular } from '@expo-google-fonts/ibm-plex-serif';
import {
  Merriweather_400Regular,
  Merriweather_400Regular_Italic,
  Merriweather_700Bold
} from '@expo-google-fonts/merriweather';

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
          WorkSans_400Regular,
          WorkSans_400Regular_Italic,
          Lora_400Regular,
          JosefinSans_200ExtraLight,
          SourceCodePro_400Regular,
          SourceCodePro_600SemiBold,
          IBMPlexSerif_400Regular,
          IBMPlexMono_400Regular,
          IBMPlexMono_600SemiBold,
          Merriweather_400Regular,
          Merriweather_400Regular_Italic,
          Merriweather_700Bold,
          IBMPlexMono_400Regular_Italic
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
