import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import Article from "@/model/article.model";
import {
  Ban,
  BookmarkPlus,
  HeartPlus,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

interface ArticleBannerProps {
  article: Article;
}

export default function ArticleBanner({ article }: ArticleBannerProps) {
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-fit space-y-7 ">
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>a</AvatarFallback>
        </Avatar>
        <p>{article.authorName}</p>
      </div>
      <div className="flex gap-6 h-full w-full">
        <div className="flex-1  space-y-2">
          <h4 className="text-4xl font-bold">{article.title}</h4>
          <p>{article.description}</p>
        </div>
        <div className="w-60  relative rounded overflow-hidden h-44">
          <Image
            fill
            alt="article image"
            src={
              article.image?.imageUrl ||
              "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-10 items-center">
          <Button size={"icon"} variant={"ghost"}>
            <Sparkles className="text-slate-500" strokeWidth={1} size={22} />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <HeartPlus
              className="text-red-500"
              fill="red"
              strokeWidth={1}
              size={22}
            />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <MessageSquareText
              className="text-slate-500"
              strokeWidth={1}
              size={22}
            />
          </Button>
        </div>
        <div className="flex gap-10 items-center">
          <Button size={"icon"} variant={"ghost"}>
            <BookmarkPlus
              className="text-slate-500"
              strokeWidth={1}
              size={22}
            />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Ban className="text-slate-500" strokeWidth={1} size={22} />
          </Button>
        </div>
      </div>
      <Separator className="my-16" />
    </div>
  );
}
