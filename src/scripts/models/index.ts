/**
 * 【このファイルは何？】
 * このファイルは「型」を管理しているファイルだよ！
 * 例えば、一番最初に定義されている Author を見てみましょう。
 *
 * export interface Author {
 *   id: string;
 *   name: string;
 * }
 *
 * これは「Author型のオブジェクトは string の id と string の name を持っている」ということを意味します。
 * Author型の変数を作る場合は
 *
 * const author: Author = {
 *   id: 'id_of_author',
 *   name: 'name_of_author',
 * }
 *
 * と書けばOKです。TypeScriptでは、型は変数名の後に : で区切って書きます。
 * 型を書くことは省略することもできますが、書いておくとエディタが「この変数は Author なんだな！」と認識してくれ、補完がバッチリ効いてくれて便利です。
 *
 */

/**
 * 【exportって付いてるのは何？】
 * export というキーワードを付けることで、他のTypeScriptファイルからオブジェクトを取得することができるようになります。
 * 例えば Author は export されていますので、他のファイルからは
 *
 * import { Author } from '<このファイル名>'
 *
 * というふうにしてAuthorを取得することができます。
 *
 * src/scripts/main.ts にimportについても書いたので参考にしてください。
 */

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
  };
  explanation?: string; // 非推奨
  caption?: string;
  caption_ja?: string | null;
  id: string;
}

export interface Paper {
  id: string;
  abstract: string;
  title: string;
  title_ja: string;
  abstract_ja: string;
  authors: Author[];
  keywords: Keyword[];
  url: string;
  pdf_url: string;
  created_at: string;
  published_at: string;
  figures: Figure[];
  journal: string;
  cite_count: number;
  cited_count: number;
  analized: string;
}
