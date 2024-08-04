import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
const fullConfig = resolveConfig(tailwindConfig);
import { useMediaQuery } from "react-responsive";

export default function useScreenSize() {
  const isSm = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens.sm})`,
  });
  const isMd = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens.md})`,
  });
  const isLg = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens.lg})`,
  });
  const isXl = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens.xl})`,
  });
  const is2xlg = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens["2xl"]})`,
  });

  return { isSm, isMd, isLg, isXl, is2xlg };
}
