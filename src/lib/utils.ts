import crypto from "crypto-js";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function price2d(value: number | string) {
  return parseFloat(`${value}`).toFixed(2);
}

export function price(value: number | string | undefined) {
  if (value) {
    return parseFloat(`${value}`).toFixed(0);
  }
  return null;
}

export function prettyDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const password = "d6F3Efeq";

export function encrypt(text: string | undefined | null | number | {}) {
  if (text) {
    if (typeof text === "object") text = JSON.stringify(text);

    const result = crypto.AES.encrypt(`${text}`, password);
    var temp = result
      .toString()
      .replace(/\+/g, "xMl3Jk")
      .replace(/\//g, "Por21Ld")
      .replace(/&/g, "Por2O")
      .replace(/=/g, "Ml32");

    return temp;
  }
  return "";
}

export function decrypt(text: string | null | undefined) {
  if (text) {
    var temp = text
      .replace(/Ml32/g, "=")
      .replace(/Por21Ld/g, "/")
      .replace(/xMl3Jk/g, "+");
    const result = crypto.AES.decrypt(temp, password);
    return result.toString(crypto.enc.Utf8);
  } else {
    return "/";
  }
}

export const createSlug = (title: string) => {
  // Convert the string to lowercase
  let slug = title.toLowerCase();

  // Replace spaces with dashes
  slug = slug.replace(/\s+/g, "-");

  // Remove special characters
  slug = slug.replace(/[^a-z0-9-]/g, "");

  // Remove multiple dashes
  slug = slug.replace(/-+/g, "-");

  return slug;
};
