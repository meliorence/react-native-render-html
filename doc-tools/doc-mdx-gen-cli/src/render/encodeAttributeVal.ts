import { encode } from 'html-entities';

export default function encodeAttributeVal(attrVal: string) {
  return encode(attrVal);
}
