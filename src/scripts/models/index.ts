export interface Author {
  id: string;
  name: string;
}

export interface Keyword {
  id: string;
  name: string;
}

export interface Figure {
  figure: {
    url: string;
    id: string;
  };
  explanation: string;
}

export interface Paper {
  abstract: string;
  title: string;
  title_ja: string;
  abstract_ja: string;
  journal: string;
  authors: Author[];
  publishedAt: string;
  keywords: Keyword[];
  url: string;
  created_at: string;
  published_at: string;
  figures: Figure[];
  cite_count: number;
  cited_count: number;
}
