export interface MangaManhwa {
  avgRating: number;
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
  type: Author[];
  authors: Author[];
  genres: Author[];
  ratings: Rating[];
  comments: Comment[];
  chapters: Chapter[];
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
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

export interface Comment {
  id: number;
  userId: string;
  mangaManhwaId: number;
  chapterId: null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: number;
  userId: string;
  mangaManhwaId: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}
