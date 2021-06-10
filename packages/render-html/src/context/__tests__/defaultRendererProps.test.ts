import { Linking } from 'react-native';
import { defaultAOnPress } from '../defaultRendererProps';

describe('defaultRendererProps', () => {
  describe('defaultAOnPress', () => {
    it('should not throw', async () => {
      Linking.canOpenURL = jest.fn(async () => false);
      await expect(defaultAOnPress({}, 'hi')).resolves.not.toThrow();
      Linking.canOpenURL = jest.fn(async () => true);
      await expect(
        defaultAOnPress({}, 'https://domain.com')
      ).resolves.not.toThrow();
    });
  });
});
