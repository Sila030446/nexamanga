import { MangaManhwa } from "@/app/(home)/comic/types/comicDetail.type";

export interface MangaChapter {
  currentChapter: CurrentChapter;
  previousSlug: null;
  nextSlug: string;
  allChapters: AllChapter[];
}

export interface AllChapter {
  slug: string;
  title: string;
}

export interface CurrentChapter {
  mangaManhwa: MangaManhwa;
  id: number;
  mangaManhwaId: number;
  chapterNumber: number;
  urlScrape: string;
  title: string;
  slug: string;
  releaseDate: null;
  createdAt: Date;
  updatedAt: Date;
  pages: Page[];
}

export interface Page {
  id: number;
  chapterId: number;
  pageNumber: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
