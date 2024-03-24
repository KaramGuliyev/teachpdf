import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToAscii(inputString: string) {
  // Remove non Ascii chars
  const resultString = inputString.replaceAll("[^\\x00-\\x7F]", "");
}