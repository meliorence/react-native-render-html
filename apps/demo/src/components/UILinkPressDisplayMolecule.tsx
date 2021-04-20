import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react';
import { StyleSheet } from 'react-native';
import { Linking, View } from 'react-native';
import onLinkPressContext from '../state/onLinkPressContext';
import UISnackbarAtom, { UISnackbarAtomProps } from './UISnackbarAtom';
import { TextRoleNucleonProps } from './nucleons/useTextRoleNucleon';

const styles = StyleSheet.create({
  container: { position: 'relative', flexGrow: 1 }
});

const textProps: TextRoleNucleonProps = {
  role: 'bodyInlineCode'
};

export default function UILinkPressDisplayMolecule({
  children
}: PropsWithChildren<{}>) {
  const [url, setUrl] = useState<string | null>(null);
  const onLinkPress = useCallback((href) => {
    setUrl(href);
  }, []);
  const action: UISnackbarAtomProps['action'] = useMemo(
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
      <UISnackbarAtom
        role="uiHyperlink"
        visible={url !== null}
        action={action}
        textProps={textProps}
        onDismiss={() => setUrl(null)}>
        {url}
      </UISnackbarAtom>
    </onLinkPressContext.Provider>
  );
}
