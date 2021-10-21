/* eslint-disable react-native/no-inline-styles */
import React, {
  Children,
  Fragment,
  PropsWithChildren,
  ReactElement,
  useCallback
} from 'react';
import { ToolkitProvider, UIToolkitConfig, RefAPIProps } from '@doc/pages';
import BodyChapterMolecule from '../components/BodyChapterMolecule';
import BodySectionMolecule from '../components/BodySectionMolecule';
import BodyListAtom from '../components/BodyListAtom';
import BodyListItemAtom from '../components/BodyListItemAtom';
import BodyParagraphAtom from '../components/BodyParagraphAtom';
import RenderHtmlCardOrganism from '../components/RenderHtmlCardOrganism';
import UISourceDisplayMolecule from '../components/UISourceDisplayMolecule';
import { ScrollView } from 'react-native-gesture-handler';
import BodyAdmonitionAtom from '../components/BodyAdmonitionAtom';
import ArticleContainerAtom from '../components/ArticleContainerAtom';
import UIHyperlinkAtom from '../components/UIHyperlinkAtom';
import { useNavigation } from '@react-navigation/core';
import TextRoleNucleon from '../components/nucleons/TextRoleNucleon';
import svgAssetsIndex from '../svgAssetsIndex';
import { useColorPrimitives, useColorRoles } from '../theme/colorSystem';
import { Stack, useSpacing } from '@mobily/stacks';
import CardColorRolesProvider from '../components/croles/CardColorRolesProvider';
import { Linking, StyleSheet } from 'react-native';
import BoxNucleon from '../components/nucleons/BoxNucleon';
import { WEBSITE_URL } from '@doc/constants';
import URI from 'urijs';
import TNodeTransformDisplayOrganism from '../components/TNodeTransformDisplayOrganism';
import UICardContainer from '../components/UICardContainer';
import { BODY_PARAGRAPH_SPACING } from '../constants';
import MaxWidthContainerAtom from '../components/MaxWidthContainerAtom';

const genericOnLinkPress = (uri: string) => Linking.openURL(uri);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
function useOnLinkPress(uri: string): () => void;
function useOnLinkPress(): (uri: string) => void;
function useOnLinkPress(uri?: string) {
  if (uri) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCallback(() => genericOnLinkPress(uri), [uri]);
  }
  return genericOnLinkPress;
}

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline'
  }
});

const RefBuilder: UIToolkitConfig['RefBuilder'] = ({ name, url, type }) => {
  const onLinkPress = useOnLinkPress(url);
  return (
    <UIHyperlinkAtom
      role={type === 'doc' ? 'body' : 'bodyInlineCode'}
      onPress={onLinkPress}>
      {name}
    </UIHyperlinkAtom>
  );
};

function Header({ children, ...other }: PropsWithChildren<{}>) {
  return (
    <MaxWidthContainerAtom {...other}>
      <Stack space={BODY_PARAGRAPH_SPACING}>{children}</Stack>
    </MaxWidthContainerAtom>
  );
}

function RefAPI({
  name,
  url,
  member,
  full,
  plural /* ,library */
}: RefAPIProps) {
  const { apiRef } = useColorPrimitives();
  const pluralMark = plural ? 's' : '';
  const fullName =
    (member && full ? `${name}.${member}` : member ? member : name) +
    pluralMark;
  const fullUrl = new URI(WEBSITE_URL + url).normalizePath().href();
  return (
    <UIHyperlinkAtom
      role="bodyAPIRef"
      style={{ backgroundColor: apiRef.color }}
      color={apiRef.content}
      onPress={useOnLinkPress(fullUrl)}>
      {fullName}
    </UIHyperlinkAtom>
  );
}

const SourceDisplayInner: UIToolkitConfig['SourceDisplay'] =
  function SourceDisplayInner({ content, lang, showLineNumbers }) {
    return (
      <ScrollView
        horizontal
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <UISourceDisplayMolecule
          content={content}
          language={lang as any}
          showLineNumbers={showLineNumbers}
          paddingVertical={2}
          style={{ alignSelf: 'stretch' }}
        />
      </ScrollView>
    );
  };

const SourceDisplay: UIToolkitConfig['SourceDisplay'] = ({
  title,
  ...other
}) => (
  <UICardContainer style={(other as any).style} title={title}>
    <SourceDisplayInner {...other} />
  </UICardContainer>
);

const RefDoc: UIToolkitConfig['RefDoc'] = ({ target, children, fragment }) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate(`${target.group}-${target.id}`, { fragment });
  }, [navigation, target.group, target.id, fragment]);
  return (
    <UIHyperlinkAtom role="body" style={styles.underline} onPress={onPress}>
      {children || target.title}
    </UIHyperlinkAtom>
  );
};

const Acronym: UIToolkitConfig['Acronym'] = ({ fullName }) => {
  return <TextRoleNucleon role="body" children={fullName} />;
};

const Bold: UIToolkitConfig['Bold'] = ({ children }) => (
  <TextRoleNucleon role="bodyBold" children={children} />
);

const SvgFigure: UIToolkitConfig['SvgFigure'] = ({
  asset,
  description,
  title
}) => {
  const Component = svgAssetsIndex[asset];
  const { surface, codeBackground } = useColorRoles();
  const padding = useSpacing(2);
  return (
    <UICardContainer title={title} caption={description}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          backgroundColor: codeBackground,
          minWidth: '100%',
          justifyContent: 'center',
          padding
        }}>
        <Component
          content={surface.content}
          secondaryContent={surface.secondaryContent}
          codeBlockBg={'rgba(125,125,125,0.2)'}
        />
      </ScrollView>
    </UICardContainer>
  );
};

const toolkitConfig: UIToolkitConfig = {
  Container: ArticleContainerAtom,
  Chapter: BodyChapterMolecule,
  Section: BodySectionMolecule,
  List: BodyListAtom,
  ListItem: BodyListItemAtom,
  Paragraph: BodyParagraphAtom,
  Bold,
  Header,
  RenderHtmlCard: RenderHtmlCardOrganism,
  TNodeTransformDisplay: TNodeTransformDisplayOrganism,
  SourceDisplay,
  Admonition: BodyAdmonitionAtom,
  RefBuilder,
  RefAPI,
  RefDoc,
  Acronym,
  SvgFigure: (props) => (
    <CardColorRolesProvider>
      <SvgFigure {...props} />
    </CardColorRolesProvider>
  ),
  Hyperlink: ({ url, children }) => (
    <UIHyperlinkAtom
      role="body"
      style={styles.underline}
      onPress={useOnLinkPress(url)}>
      {children}
    </UIHyperlinkAtom>
  ),
  InlineCode: (props) => <TextRoleNucleon role="bodyInlineCode" {...props} />,
  DList: ({ children }) => (
    <BoxNucleon padding={2}>
      {Children.map(children as ReactElement[], (c: ReactElement, i) =>
        React.cloneElement(c, { ...c.props, index: Math.floor(i / 2) })
      )}
    </BoxNucleon>
  ),
  DListItem: ({ children, index }: any) => (
    <BoxNucleon
      style={{
        paddingBottom: useSpacing(4),
        paddingLeft: useSpacing(6),
        backgroundColor:
          index % 2 === 0 ? 'rgba(125,125,125,0.2)' : 'rgba(125,125,125,0.1)'
      }}>
      <BodyParagraphAtom style={{}}>{children}</BodyParagraphAtom>
    </BoxNucleon>
  ),
  DListTitle: ({ children, index }: any) => (
    <BoxNucleon
      paddingTop={4}
      padding={2}
      style={{
        flex: 1,
        backgroundColor:
          index % 2 === 0 ? 'rgba(125,125,125,0.2)' : 'rgba(125,125,125,0.1)'
      }}>
      <TextRoleNucleon role="bodyDListHeader">{children}</TextRoleNucleon>
    </BoxNucleon>
  ),
  Conditional: ({ platform, children }) => {
    return platform === 'mobile' ? <Fragment>{children}</Fragment> : null;
  }
};

export default function PageToolkitProvider({
  children
}: PropsWithChildren<{}>) {
  return <ToolkitProvider config={toolkitConfig}>{children}</ToolkitProvider>;
}
