import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function prefixWith91(obj, propertyName) {
  if (obj && obj[propertyName]) obj[propertyName] = "91 " + obj[propertyName];
  return obj;
}
export function setUpHeaders() {
  const loginToken = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${loginToken}`,
  };
}


export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}.${formattedMonth}.${year}`;
}

