import React from "react";
import { StyleSheet } from "react-native";
import { render, waitFor } from "react-native-testing-library";
import HTMLImage from "../HTMLImage";

describe("HTMLImage", () => {
  describe("scaling logic", () => {
    it("should use width and height from styles", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 320,
        height: 180,
      };
      const { findByTestId } = render(
        <HTMLImage style={style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject(style);
    });
    it("should use width and height from props", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 320,
        height: 180,
      };
      const { findByTestId } = render(<HTMLImage {...style} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject(style);
    });
    it("should scale down required dimensions to contentWidth prop when appropriate", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 320,
        height: 180,
      };
      const contentWidth = 160;
      const { findByTestId } = render(
        <HTMLImage contentWidth={contentWidth} {...style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: contentWidth,
        height: contentWidth / (style.width / style.height),
      });
    });
    it("should scale the image to contentWidth prop when appropriate when only width or height is required", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 320,
      };
      const contentWidth = 160;
      const { findByTestId } = render(
        <HTMLImage contentWidth={contentWidth} {...style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: contentWidth,
        height: contentWidth / (640 / 360),
      });
    });
    it("should scale the image down when only width or height is required", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 320,
      };
      const { findByTestId } = render(<HTMLImage {...style} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 320,
        height: 180,
      });
    });
    it("should use physical dimensions when no width or height requirements are provided", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const { findByTestId } = render(
        <HTMLImage contentWidth={800} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 640,
        height: 360,
      });
    });
    it("should handle 0-width and height requirements", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 0,
        height: 0,
      };
      const { findByTestId } = render(<HTMLImage {...style} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 0,
        height: 0,
      });
    });
    it("should handle 0-width or height requirements", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: 0,
      };
      const { findByTestId } = render(<HTMLImage {...style} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 0,
        height: 0,
      });
    });
    it("should handle maxWidth requirements", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        maxWidth: 320,
      };
      const { findByTestId } = render(
        <HTMLImage style={style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 320,
        height: 180,
      });
    });
    it("should handle maxHeight requirements", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        maxHeight: 180,
      };
      const { findByTestId } = render(
        <HTMLImage style={style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 320,
        height: 180,
      });
    });
    it("should handle minWidth requirements", async () => {
      const source = { uri: "http://via.placeholder.com/10x12" };
      const style = {
        minWidth: 30,
      };
      const { findByTestId } = render(
        <HTMLImage style={style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 30,
        height: 36,
      });
    });
    it("should handle minHeight requirements", async () => {
      const source = { uri: "http://via.placeholder.com/10x12" };
      const style = {
        minHeight: 36,
      };
      const { findByTestId } = render(
        <HTMLImage style={style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 30,
        height: 36,
      });
    });
  });
  describe("special units", () => {
    it("should ignore requirements in percentage when enableExperimentalPercentWidth or contentWidth props are not set", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: "50%",
      };
      const { findByTestId } = render(<HTMLImage {...style} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 640,
      });
    });
    it("should support strings for width and height which can be parsed to floats", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        width: "50",
      };
      const { findByTestId } = render(<HTMLImage {...style} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 50,
      });
    });
    describe("when given enableExperimentalPercentWidth + contentWidth props", () => {
      it("should support requirements in percentage", async () => {
        const source = { uri: "http://via.placeholder.com/640x360" };
        const contentWidth = 250;
        const style = {
          width: "50%",
        };
        const { findByTestId } = render(
          <HTMLImage
            enableExperimentalPercentWidth
            contentWidth={250}
            {...style}
            source={source}
          />
        );
        const image = await findByTestId("image-layout");
        expect(image).toBeTruthy();
        expect(StyleSheet.flatten(image.props.style)).toMatchObject({
          width: contentWidth * 0.5,
        });
      });
      it("should constrain a percentage width with the value returned by computeImagesMaxWidth", async () => {
        const source = { uri: "http://via.placeholder.com/640x360" };
        const contentWidth = 250;
        const style = {
          width: "80%",
        };
        const { findByTestId } = render(
          <HTMLImage
            enableExperimentalPercentWidth
            computeImagesMaxWidth={(c) => c * 0.7}
            contentWidth={250}
            {...style}
            source={source}
          />
        );
        const image = await findByTestId("image-layout");
        expect(image).toBeTruthy();
        expect(StyleSheet.flatten(image.props.style)).toMatchObject({
          width: contentWidth * 0.7,
        });
      });
      it("should ignore percentage heights", async () => {
        const source = { uri: "http://via.placeholder.com/640x360" };
        const contentWidth = 250;
        const style = {
          height: "10%",
        };
        const { findByTestId } = render(
          <HTMLImage
            enableExperimentalPercentWidth
            contentWidth={250}
            {...style}
            source={source}
          />
        );
        const image = await findByTestId("image-layout");
        expect(image).toBeTruthy();
        expect(StyleSheet.flatten(image.props.style)).toMatchObject({
          width: contentWidth,
          height: (360 / 640) * contentWidth,
        });
      });
    });
  });
  describe("capabilities regarding spacing", () => {
    it("should take into account horizontal margins when scaling down", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const style = {
        margin: 25,
        marginHorizontal: 30,
      };
      const { findByTestId } = render(
        <HTMLImage contentWidth={200} style={style} source={source} />
      );
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject({
        width: 200 - 30 * 2,
      });
    });
  });
  describe("when changing props", () => {
    it("should update box width and height when requirements change", async () => {
      const source = { uri: "http://via.placeholder.com/640x360" };
      const initialStyle = {
        width: 640,
        height: 360,
      };
      const nextStyle = {
        width: 320,
        height: 180,
      };
      const { findByTestId, update } = render(
        <HTMLImage {...initialStyle} source={source} />
      );
      update(<HTMLImage {...nextStyle} source={source} />);
      const image = await findByTestId("image-layout");
      expect(image).toBeTruthy();
      expect(StyleSheet.flatten(image.props.style)).toMatchObject(nextStyle);
    });
    it("should update uri and fetch new dimensions when source changes", async () => {
      const initialSource = { uri: "http://via.placeholder.com/640x360" };
      const nextSource = { uri: "http://via.placeholder.com/1920x1080" };
      const { findByTestId, update, getByTestId } = render(
        <HTMLImage source={initialSource} />
      );
      const image1 = await findByTestId("image-layout");
      expect(image1).toBeTruthy();
      expect(StyleSheet.flatten(image1.props.style)).toMatchObject({
        width: 640,
        height: 360,
      });
      update(<HTMLImage source={nextSource} />);
      await waitFor(() => findByTestId("image-layout"));
      const image2 = getByTestId("image-layout");
      expect(image2).toBeTruthy();
      expect(StyleSheet.flatten(image2.props.style)).toMatchObject({
        width: 1920,
        height: 1080,
      });
    });
    it("should retain inline style prior to attributes width and height to compute print dimensions", async () => {
      const { findByTestId, getByTestId } = render(
        <HTMLImage
          width="1200"
          height="800"
          contentWidth={500}
          enableExperimentalPercentWidth
          style={{
            width: "50%",
            height: 100,
          }}
          source={{ uri: "http://via.placeholder.com/1200x800" }}
        />
      );
      await waitFor(() => findByTestId("image-layout"));
      const image2 = getByTestId("image-layout");
      expect(image2).toBeTruthy();
      expect(StyleSheet.flatten(image2.props.style)).toMatchObject({
        width: 250,
        height: 100,
      });
    });
  });
});
