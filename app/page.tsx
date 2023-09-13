"use client";

import LoginCard from "@/components/LoginCard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function Home() {
  const router = useRouter();
  const userEmail = useAppSelector(
    (state: RootState) => state.authentication.userInfo?.email
  );
  const accestoken = useAppSelector(
    (state: RootState) => state.authentication.userInfo?.token
  );

  useEffect((): void => {
    if (userEmail && accestoken) {
      router.push("/user");
    }
  }, [userEmail]);

  return <LoginCard></LoginCard>;
}
