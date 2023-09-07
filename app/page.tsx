"use client";

import LoginCard from "@/components/LoginCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";

export default function Home() {
  const router = useRouter();
  const userEmail = useAppSelector(
    (state: RootState) => state.authentication.userInfo?.email
  );

  const user = getUserFromLocalStorage()?.token;

  useEffect((): void => {
    if (userEmail || user) {
      router.push("/user");
    }
  }, [userEmail, user]);

  return <LoginCard></LoginCard>;
}
