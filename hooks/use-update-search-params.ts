"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = (obj: Record<string, string | number | null | undefined>, options: { scroll: boolean } = { scroll: true }) => {
    const params = new URLSearchParams(searchParams);

    const entries = Object.entries(obj);

    entries.forEach(([key, value]) => {
      value ? params.set(key, `${value}`) : params.delete(key);
    });

    router.replace(`?${params.toString()}`, options);
  };
  return { searchParams, updateSearchParams };
}
