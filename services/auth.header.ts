"use client";

import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";

export default function authHeader() {
  const accesToken = getUserFromLocalStorage()?.token;

  if (accesToken) {
    return { Authorization: "Bearer " + accesToken };
  } else {
    return { Authorization: "" };
  }
}
