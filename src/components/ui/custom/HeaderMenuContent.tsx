"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { GoListUnordered } from "react-icons/go";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface HeaderMenuProps {
  currentChapterTitle: string;
  allChapters: { slug: string; title: string }[];
  previousSlug: string | null;
  nextSlug: string | null;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  currentChapterTitle,
  allChapters,
  previousSlug,
  nextSlug,
}) => {
  return (
    <div className="sticky top-0 z-20 border-b bg-card">
      <div className="lg:px-5 flex justify-between w-full relative h-[50px] lg:h-[52px]">
        <div className="flex items-center flex-1 overflow-x-hidden truncate">
          <div className="flex items-center h-full">
            <div className="flex relative items-center w-full cursor-pointer">
              <div className="flex w-full">
                <div className="flex flex-row">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button size={"icon"} variant={"ghost"}>
                        <GoListUnordered className="w-6 h-6" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="z-[500]">
                      <DrawerHeader>
                        <DrawerTitle>ตอนทั้งหมด</DrawerTitle>
                        <DrawerDescription>
                          เลือกไปยังตอนที่คุณต้องการ
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="max-h-[50vh] overflow-y-scroll flex flex-col items-center gap-1">
                        {allChapters.map((chapter) => (
                          <Link
                            key={chapter.slug}
                            href={`/comic/chapter/${chapter.slug}`}
                            className={`w-full p-1 text-left ${
                              currentChapterTitle === chapter.title
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                          >
                            <Button
                              variant="ghost"
                              className="w-full text-left"
                            >
                              {chapter.title}
                            </Button>
                          </Link>
                        ))}
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  <Button
                    className="font-medium p-0 ml-5 cursor-default text-foreground hover:no-underline"
                    variant={"link"}
                  >
                    <p className="line-clamp-none text-left truncate text-sm w-[130px] md:w-[450px] lg:w-[380px] xl:w-[400px]">
                      {currentChapterTitle}
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full h-full text-muted-foreground">
            <div className="flex items-center gap-1 lg:gap-4">
              <Button disabled={!previousSlug} size={"icon"} variant={"ghost"}>
                {previousSlug ? (
                  <Link href={`/comic/chapter/${previousSlug}`}>
                    <ChevronLeft />
                  </Link>
                ) : (
                  <ChevronLeft />
                )}
              </Button>

              <Button disabled={!nextSlug} size={"icon"} variant={"ghost"}>
                {nextSlug ? (
                  <Link href={`/comic/chapter/${nextSlug}`}>
                    <ChevronRight />
                  </Link>
                ) : (
                  <ChevronRight />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
