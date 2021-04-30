/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren, useCallback } from 'react';
import { ToolkitProvider, UIToolkitConfig } from '@doc/pages';
import BodyChapterMolecule from '../components/BodyChapterMolecule';
import BodyListAtom from '../components/BodyListAtom';
import BodyListItemAtom from '../components/BodyListItemAtom';
import BodyParagraphAtom from '../components/BodyParagraphAtom';
import RenderHtmlCardOrganism from '../components/RenderHtmlCardOrganism';
import UISourceDisplayMolecule from '../components/UISourceDisplayMolecule';
import { ScrollView } from 'react-native-gesture-handler';
import BodyAdmonitionAtom from '../components/BodyAdmonitionAtom';
import ArticleContainerAtom from '../components/ArticleContainerAtom';
import ArticleHeaderAtom from '../components/ArticleHeader';
import UIHyperlinkAtom from '../components/UIHyperlinkAtom';
import useOnLinkPress from '../hooks/useOnLinkPress';
import { useNavigation } from '@react-navigation/core';
import TextRoleNucleon from '../components/nucleons/TextRoleNucleon';
import svgAssetsIndex from '../svgAssetsIndex';
import { useColorRoles } from '../theme/colorSystem';
import { useSpacing } from '@mobily/stacks';
import CardColorRolesProvider from '../components/croles/CardColorRolesProvider';
import { View } from 'react-native';
import BoxNucleon from '../components/nucleons/BoxNucleon';

const BottomCaption = ({ caption }: { caption: string }) => (
  <BoxNucleon paddingX={2} paddingTop={1}>
    <TextRoleNucleon
      color={useColorRoles().surface.secondaryContent}
      role="caption">
      {caption}
    </TextRoleNucleon>
  </BoxNucleon>
);

const RefBuilder: UIToolkitConfig['RefBuilder'] = ({ name, url }) => {
  const onLinkPress = useOnLinkPress(url);
  return <UIHyperlinkAtom onPress={onLinkPress}>{name}</UIHyperlinkAtom>;
};

const SourceDisplay: UIToolkitConfig['SourceDisplay'] = ({
  content,
  lang,
  showLineNumbers,
  title
}) => (
  <ScrollView
    horizontal
    style={{ flexGrow: 0 }}
    contentContainerStyle={{ minWidth: '100%', flexDirection: 'column' }}>
    <UISourceDisplayMolecule
      content={content}
      language={lang as any}
      showLineNumbers={showLineNumbers}
      paddingVertical={2}
      style={{ alignSelf: 'stretch' }}
    />
    {title && <BottomCaption caption={title} />}
  </ScrollView>
);

const RefDoc: UIToolkitConfig['RefDoc'] = ({ target, children }) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate(`${target.group}-${target.id}`);
  }, [navigation, target.group, target.id]);
  return (
    <UIHyperlinkAtom onPress={onPress}>
      {children || target.title}
    </UIHyperlinkAtom>
  );
};

const Acronym: UIToolkitConfig['Acronym'] = ({ fullName, name }) => {
  return <TextRoleNucleon role="body" children={`${fullName} (${name})`} />;
};

const SvgFigure: UIToolkitConfig['SvgFigure'] = ({ asset, description }) => {
  const Component = svgAssetsIndex[asset];
  const { surface } = useColorRoles();
  const padding = useSpacing(2);
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          backgroundColor: surface.background,
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
      <BottomCaption caption={description} />
    </View>
  );
};

const toolkitConfig: UIToolkitConfig = {
  Container: ArticleContainerAtom,
  Chapter: BodyChapterMolecule,
  Header: ArticleHeaderAtom as any,
  List: BodyListAtom,
  ListItem: BodyListItemAtom,
  Paragraph: BodyParagraphAtom,
  RenderHtmlCard: RenderHtmlCardOrganism as any,
  SourceDisplay,
  Admonition: BodyAdmonitionAtom,
  RefBuilder,
  RefDoc,
  Acronym,
  SvgFigure: (props) => (
    <CardColorRolesProvider>
      <SvgFigure {...props} />
    </CardColorRolesProvider>
  ),
  Hyperlink: ({ url, children }) => (
    <RefBuilder name={children as any} url={url} />
  ),
  InlineCode: (props) => <TextRoleNucleon role="bodyInlineCode" {...props} />
};

export default function PageToolkitProvider({
  children
}: PropsWithChildren<{}>) {
  return <ToolkitProvider config={toolkitConfig}>{children}</ToolkitProvider>;
}
