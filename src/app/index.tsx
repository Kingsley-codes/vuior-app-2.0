import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  // useEffect(() => {
  //   router.replace("/(auth)/Sign-in");
  // }, [router]);
  // return null;

  useEffect(() => {
    router.replace("/(dashboard)");
  }, [router]);
  return null;
}
