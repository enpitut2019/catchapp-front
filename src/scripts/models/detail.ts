export interface Author {
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
  authors: Author[];
  publishedAt: string;
  keywords: Keyword[];
  url: string;
  created_at: string;
  figures: Figure[];
}

export interface Figure{
figure: string;
explanation: string;
}