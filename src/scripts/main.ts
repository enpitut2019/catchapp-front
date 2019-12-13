/**
 * 【import って付いているのは何？】
 * 他のファイルからオブジェクトをインポートするために、importというキーワードを使います。
 * 例えば src/scripts/models/index.ts では Author が export されていますので、
 *
 * import { Author } from './models'
 *
 * として取得することができます。
 * 普通は ./hoge/fuga.ts とTypeScriptファイルを指定する必要があるのですが、index.ts ファイルは特別扱いで、index.ts を含むディレクトリ(フォルダ)を指定すればOKです。
 *
 * ちなみに、複数のオブジェクトをインポートしたければ
 *
 * import { Author, Figure } from './models'
 *
 * というふうにカンマ区切りでインポートを指定することができます。
 */

import axios from "axios";
import { Paper } from "./models";
import { format } from "date-fns";

const railsHost = process.env.RAILS_HOST;
const parser = new URL(window.location.href);
const paperNameRaw = parser.searchParams.get("name");

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  papers.forEach((paper, idx) => {
    // Element Elementを生成
    const paperElement = document.createElement("a");
    const paperTextElement = document.createElement("div");
    const contentElement = document.createElement("div");
    const leftElement = document.createElement("div");
    const titleElement = document.createElement("div");
    const authorsElement = document.createElement("div");
    const keywordsElement = document.createElement("div");
    const citeAndCitedElement = document.createElement("div");
    const citeElement = document.createElement("div");
    const citedElement = document.createElement("div");
    const dateElement = document.createElement("div");
    const linkElement = document.createElement("a");
    const figureElement = document.createElement("div");
    const figureImgElement = document.createElement("img");

    // Elementにクラスを適用
    paperElement.classList.add("paper");
    paperElement.setAttribute("href", `/detail.html?id=${idx}`);
    contentElement.classList.add("paper--content");
    leftElement.classList.add("paper--content--left");
    citeAndCitedElement.classList.add("paper--content--left--citeandcited");
    paperTextElement.classList.add("paper--content--text");
    titleElement.classList.add("paper--title");
    authorsElement.classList.add("paper--content--text--authors");
    keywordsElement.classList.add("paper--content--text--keywords");
    citeElement.classList.add("paper--content--left--citeandcited--cite");
    citedElement.classList.add("paper--content--left--citeandcited--cited");

    dateElement.classList.add("paper--content--text--date");

    figureElement.classList.add("paper--content--left--figures");
    figureImgElement.classList.add("paper--content--left--figures--img");
    // Elementにテキストを挿入
    titleElement.textContent = paper.title;
    for (let i = 0; i < papers[idx].authors.length; i++) {
      authorsElement.textContent = "Author：" + papers[idx].authors[i].name;
    }

    keywordsElement.textContent = "keyword1";
    citeElement.textContent = "cite：" + papers[idx].cite_count;
    citedElement.textContent = "cited：" + papers[idx].cited_count;
    linkElement.setAttribute("href", paper.url);
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = paper.url;
    dateElement.textContent = format(
      new Date(paper.created_at),
      "yyyy年MM月dd日"
    );

    if (papers[idx].figures.length > 0) {
      figureImgElement.setAttribute("src", papers[idx].figures[0].figure.url);
    } else {
      figureImgElement.classList.add("paper--content--left--figures--no-img");
      figureImgElement.setAttribute(
        "src",
        "https://www.music-scene.jp/uploads/junkband/w-noimage_s.jpg"
      );
    }

    figureElement.appendChild(figureImgElement);

    // 子Elementをpaper Elementに挿入
    paperElement.appendChild(titleElement);
    paperElement.appendChild(contentElement);
    contentElement.appendChild(leftElement);
    contentElement.appendChild(paperTextElement);
    leftElement.appendChild(figureElement);
    leftElement.appendChild(citeAndCitedElement);
    citeAndCitedElement.appendChild(citeElement);
    citeAndCitedElement.appendChild(citedElement);
    paperTextElement.appendChild(authorsElement);
    paperTextElement.appendChild(keywordsElement);

    paperTextElement.appendChild(dateElement);

    // bodyにpaper elementを挿入
    if (mainElement === null) return;
    mainElement.appendChild(paperElement);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const sourceUrl = `${railsHost}/search/get_xml`;
  axios.post(sourceUrl, { name: paperNameRaw }).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });
});
