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
  published_at: string;
  keywords: Keyword[];
  url: string;
  created_at: string;
  figures: Figure[];
  pdf_url: string;
  journal: string;
  title_ja: string;
  cite_count: int;
  cited_count: int;
}

export interface Figure{
  figure: string;
  explanation: string;
}