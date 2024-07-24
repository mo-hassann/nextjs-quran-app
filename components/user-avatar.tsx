import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type props = {
  image?: string | null;
  fullBackText?: string | null;
  className?: string;
};

export default function UserAvatar({ fullBackText, image, className }: props) {
  return (
    <Avatar className={className}>
      <AvatarImage src={image || undefined} />
      <AvatarFallback>{fullBackText?.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
