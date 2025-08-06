import { BookResponse } from "./types";

export interface SearchBarProps {
  query: string;
  setQuery: (form: string) => void;
}
export interface useFilterReturn {
  query: string;
  setQuery: (form: string) => void;
  filtered: () => BookResponse[];
}

export interface bookDetailsPageProps {
  params: {
    id: number;
  };
}

// GOOGLE API BOOKS interfaces

export interface ImageLinks {
  thumbnail?: string;
  large?: string;
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  imageLinks?: ImageLinks;
  infoLink?: string;
}

export interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface GoogleApiResponse {
  items: GoogleBook[];
}
