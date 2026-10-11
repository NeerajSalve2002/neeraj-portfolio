"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getServerYear() {
  return null;
}

export default function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getCurrentYear, getServerYear);
  return year;
}
