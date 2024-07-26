"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);

    const hash = window.location.hash;

    router.push(`?${params.toString()}${hash}`);
  };
  return { searchParams, updateSearchParam };
}
