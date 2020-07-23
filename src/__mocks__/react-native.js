import { Image as RNImage } from "react-native";

export * from "react-native";

export class Image extends RNImage {
  static getSize(source, callback) {
      setTimeout(() => callback(640, 360), 0);
  }
}
