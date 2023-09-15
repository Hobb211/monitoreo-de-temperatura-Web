"use client";

import Homepage from "@/components/homepage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function Home() {
  const router = useRouter();
  const currentUser = useAppSelector(
    (state: RootState) => state.authentication.userInfo
  );

  useEffect((): void => {
    if (currentUser) {
      router.push("/user");
    }
  }, [currentUser]);

  return <Homepage></Homepage>;
}
