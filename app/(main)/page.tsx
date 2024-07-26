import SignOutBtn from "@/client/auth/components/sign-out-btn";

import ChapterContainer from "@/client/chapter/components/chapter-container";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <SignOutBtn>
        <Button>sign out</Button>
      </SignOutBtn>
      <ChapterContainer />
    </>
  );
}
