import { Text } from "react-native";

export function extractTextFromInstance(instance) {
  const textChunks = [];
  const texts = instance.findAllByType(Text);
  for (const text of texts) {
    if (typeof text.props.children === "string") {
      textChunks.push(text.props.children);
    }
  }
  return textChunks.join("");
}