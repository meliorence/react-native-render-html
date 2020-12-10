import { Image as RNImage } from "react-native";

export * from "react-native";

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
  static getSize(uri, callback) {
    setTimeout(() => {
      let dimensions = [0, 0];
      if (typeof uri === "string") {
        const match = /(\d+)x(\d+)/gi.exec(uri);
        if (!match) {
          dimensions = [640, 360];
        } else {
          dimensions = [parseInt(match[1], 10), parseInt(match[2], 10)];
        }
      }
      callback.apply(null, dimensions);
    }, 0);
  }
}
