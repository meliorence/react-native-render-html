import React from 'react';
import { Platform } from 'react-native';
import { render } from '@testing-library/react-native';
import GenericPressable from '../GenericPressable';
import RenderHTMLConfigProvider from '../RenderHTMLConfigProvider';
import TRenderEngineProvider from '../TRenderEngineProvider';

describe('GenericPressable', () => {
  it('should render TouchableHighlight by default', () => {
    render(<GenericPressable />);
  });
  it('should use provided GenericPressable', () => {
    const CustomGenericPressable = jest.fn(() => null);
    render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider GenericPressable={CustomGenericPressable}>
          <GenericPressable />
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
    expect(CustomGenericPressable).toHaveBeenCalled();
  });
  it('should render TouchableNativeFeedback on Android', () => {
    Platform.OS = 'android';
    render(<GenericPressable />);
  });
});
