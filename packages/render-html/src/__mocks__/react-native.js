import { Image as RNImage } from 'react-native';

export * from 'react-native';

function getSizeWithHeaders(uri, headers, success, failure) {
  setTimeout(() => {
    let dimensions = [0, 0];
    if (typeof uri === 'string') {
      if (uri === 'error') {
        failure?.apply(null, new Error('Could not fetch image dimensions'));
        return;
      }
      const match = /(\d+)x(\d+)/gi.exec(uri);
      if (!match) {
        dimensions = [640, 360];
      } else {
        dimensions = [parseInt(match[1], 10), parseInt(match[2], 10)];
      }
    }
    success.apply(null, dimensions);
  }, 50);
}

export class Image extends RNImage {
  /**
   * This mock function will parse the uri to find a dimension pattern
   * width x height such as in:
   *
   *     http://image.com/1920x1080
   *
   * and invoke the callback with the extracted dimensions. If none can
   * be extracted, it will use 640x360.
   */
  static getSizeWithHeaders(uri, headers, success, failure) {
    getSizeWithHeaders(uri, headers, success, failure);
  }

  static getSize(uri, success, failure) {
    getSizeWithHeaders(uri, undefined, success, failure);
  }
}

Image.getSizeWithHeaders = jest.fn(Image.getSizeWithHeaders);
Image.getSize = jest.fn(Image.getSize);
