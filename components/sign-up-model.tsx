import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignUpModel({ onOpenChange }: { onOpenChange: () => void }) {
  const router = useRouter();
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">create new account</DialogTitle>
          <Image className="w-auto mb-3" src="/imgs/signup-img.svg" alt="sign up" width={400} height={200} />
          <DialogDescription>create new account to access all features.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              router.push("/sign-in");

              onOpenChange();
            }}
            variant="ghost"
            type="submit"
          >
            Sing in
          </Button>
          <Button
            onClick={() => {
              router.push("/sign-up");

              onOpenChange();
            }}
            type="submit"
          >
            Sing up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
