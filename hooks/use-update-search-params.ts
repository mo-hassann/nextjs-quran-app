"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = (obj: Record<string, string | number>, options: { scroll: boolean } = { scroll: true }) => {
    const params = new URLSearchParams(searchParams);

    const entries = Object.entries(obj);

    entries.map(([key, value]) => {
      params.set(key, `${value}`);
    });

    router.push(`?${params.toString()}`, options);
  };
  return { searchParams, updateSearchParams };
}
