import { TextStyle } from 'react-native';
import { useColorRoles } from '../../theme/colorSystem';

export type TextRole =
  // UI roles
  | 'headerTitle'
  | 'headerSubtitle'
  | 'uiLabel'
  | 'uiDescription'
  | 'uiMono' // For dynamic numbers
  | 'html'
  | 'source'
  | 'sectionOutline'
  | 'footer'
  | 'uiHyperlink'
  // Body roles
  | 'body'
  | 'bodyBold'
  | 'bodyTable'
  | 'bodyTableHeader'
  | 'bodyHeader1'
  | 'bodyHeader2'
  | 'bodyInlineCode'
  | 'caption';

const FONT_BODY = 'Merriweather_400Regular';
const FONT_BODY_BOLD = 'Merriweather_700Bold';
const FONT_BODY_ITALIC = 'Merriweather_400Regular_Italic';
const FONT_MONO = 'IBMPlexMono_400Regular';
const FONT_MONO_ITALIC = 'IBMPlexMono_400Regular_Italic';
const FONT_UI = 'Merriweather_400Regular';

const roleDefs: Record<
  TextRole,
  { fontSize: number; fontFamily: string } & TextStyle
> = {
  headerTitle: { fontSize: 22, fontFamily: FONT_UI, letterSpacing: 2 },
  headerSubtitle: { fontSize: 14, fontFamily: FONT_MONO },
  body: { fontSize: 16, fontFamily: FONT_BODY, lineHeight: 26 },
  bodyBold: { fontFamily: FONT_BODY_BOLD, fontSize: 16 },
  bodyTable: { fontSize: 14, fontFamily: FONT_BODY },
  bodyTableHeader: { fontSize: 14, fontFamily: FONT_BODY_BOLD },
  bodyHeader1: {
    fontSize: 24,
    fontFamily: FONT_BODY_ITALIC,
    letterSpacing: 1.5
  },
  bodyHeader2: {
    fontSize: 20,
    fontFamily: FONT_BODY_BOLD,
    letterSpacing: 1.2
  },
  caption: { fontSize: 11, fontFamily: FONT_BODY_ITALIC },
  uiDescription: { fontSize: 11, fontFamily: FONT_UI },
  uiLabel: { fontSize: 14, fontFamily: FONT_UI },
  uiMono: { fontSize: 14, fontFamily: FONT_MONO },
  uiHyperlink: { fontSize: 5, fontFamily: FONT_MONO_ITALIC },
  footer: { fontSize: 11, fontFamily: FONT_MONO },
  //@ts-expect-error
  html: { fontSize: 14 },
  //@ts-expect-error
  bodyInlineCode: { fontFamily: FONT_MONO_ITALIC },
  sectionOutline: {
    fontSize: 11,
    fontFamily: FONT_UI,
    textTransform: 'uppercase'
  },
  source: { fontSize: 14, fontFamily: FONT_MONO }
};

export interface TextRoleNucleonProps {
  color?: string;
  align?: 'center' | 'start' | 'end';
  role: TextRole;
}

export default function useTextRoleNucleon({
  role,
  align = 'start',
  color
}: TextRoleNucleonProps) {
  const defaultColor = useColorRoles().surface.content;
  const roleStyle = roleDefs[role];
  return {
    color: color ?? defaultColor,
    textAlign:
      align === 'end' ? 'right' : align === 'start' ? 'left' : 'center',
    ...roleStyle
  } as const;
}
