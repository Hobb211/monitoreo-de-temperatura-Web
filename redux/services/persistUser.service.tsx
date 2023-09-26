import { User } from "@/types";

const USER_INFO = "user_info";

export const setUserLocalStorage = (user: User): void =>
  localStorage.setItem(USER_INFO, JSON.stringify({ ...user }));

export const removeUserFromLocalStorage = (): void =>
  localStorage.removeItem(USER_INFO);

export const getUserFromLocalStorage = (): User | undefined => {
  if (typeof window !== "undefined") {
    const userInfo: User | undefined = localStorage.getItem(USER_INFO)
      ? JSON.parse(localStorage.getItem(USER_INFO)!)
      : undefined;
    return userInfo;
  }
  return undefined;
};
