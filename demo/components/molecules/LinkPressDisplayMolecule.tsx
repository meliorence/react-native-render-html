import React, {
  ComponentProps,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react';
import { StyleSheet } from 'react-native';
import { Linking, View } from 'react-native';
import { RenderHTMLProps } from 'react-native-render-html';
import { Snackbar } from 'react-native-paper';
import { useComponentColors } from '../../state/ThemeProvider';
import onLinkPressContext from '../../state/onLinkPressContext';
import TextNucleon from '../nucleons/TextNucleon';

const styles = StyleSheet.create({
  container: { position: 'relative', flexGrow: 1 }
});

export default function LinkPressDisplayMolecule({
  children
}: PropsWithChildren<{}>) {
  const [url, setUrl] = useState<string | null>(null);
  const onLinkPress = useCallback<Required<RenderHTMLProps>['onLinkPress']>(
    (evt, href) => {
      setUrl(href);
    },
    []
  );
  const { backgroundColor } = useComponentColors('snackbar');
  const action: ComponentProps<typeof Snackbar>['action'] = useMemo(
    () => ({
      label: 'browse',
      onPress: () => {
        url && Linking.openURL(url);
      }
    }),
    [url]
  );
  return (
    <onLinkPressContext.Provider value={onLinkPress}>
      <View style={styles.container}>{children}</View>
      <Snackbar
        visible={url !== null}
        action={action}
        onDismiss={() => setUrl(null)}>
        <TextNucleon mono style={{ color: backgroundColor }}>
          {url}
        </TextNucleon>
      </Snackbar>
    </onLinkPressContext.Provider>
  );
}
