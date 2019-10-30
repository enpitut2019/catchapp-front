export interface Authhor {
  id: string;
  name: string;
}

export interface Keyword {
  id: string;
  name: string;
}

export interface Paper {
  abstract: string;
  title: string;
  authors: Authhor[];
  publishedAt: string;
  keywords: Keyword[];
  url: string;
  created_at: string;
}
