import { nanoid, customAlphabet } from 'nanoid';

export const generateId = (length: number = 21): string => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const customNanoid = customAlphabet(alphabet, length);
  return customNanoid();
}