export interface UpdateMangaTypes {
  map(
    arg0: (manga: UpdateMangaTypes) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: number;
  title: string;
  alternativeTitle: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  releaseDate: Date;
  serialization: string;
  viewCount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  type: Type[];
  chapters: Chapter[];
}

interface Chapter {
  number: number;
  id: number;
  mangaManhwaId: number;
  chapterNumber: number;
  urlScrape: string;
  title: string;
  slug: string;
  releaseDate: null;
  createdAt: string;
  updatedAt: string;
}

interface Type {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
