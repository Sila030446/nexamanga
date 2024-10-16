export interface PopularMangaTypes {
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
  genres: Genre[];
  authors: Author[];
  avgRating: number;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Type {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
