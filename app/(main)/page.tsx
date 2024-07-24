import SignOutBtn from "@/client/auth/components/sign-out-btn";
import SurahContainer from "@/client/surah/components/surah-container";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";

export default async function Home() {
  return (
    <>
      <SignOutBtn>
        <Button>sign out</Button>
      </SignOutBtn>
      <SurahContainer />
    </>
  );
}
