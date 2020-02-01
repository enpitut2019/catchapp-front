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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const images = require("../image/*.png");

const railsHost = process.env.RAILS_HOST;
const sourceUrl = `${railsHost}/papers/search`;
const parser = new URL(window.location.href);
const paperNameRaw = parser.searchParams.get("name");
let currentPage = 0;
let paperTemplate: HTMLTemplateElement | null = null;

// 検索クエリの表示
const searchResultElement = document.createElement("div");
const queryTextElement = document.createElement("p");
searchResultElement.classList.add("search-result");
queryTextElement.classList.add("search-result--query");
queryTextElement.textContent = paperNameRaw + " の検索結果";
searchResultElement.appendChild(queryTextElement);

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  console.log(papers.length);

  if (papers.length < 30) {
    // 検索結果30件未満の場合は「さらに読む」ボタンを表示しない
    const getMoreElement = document.getElementById("next-button")!;
    getMoreElement.style.display = "none";
  }

  if (papers.length === 0) {
    // 検索結果0件の場合はその旨を表示する
    const noResultElement = document.createElement("p");
    noResultElement.classList.add("no-result");
    noResultElement.textContent = "お探しの論文は見つかりませんでした。キーワードが日本語の場合は英語で入力してください。";
    if (mainElement === null) return;
    mainElement.appendChild(noResultElement);
  }

  papers.forEach((paper, idx) => {
    if (paperTemplate === null) return;

    // Elementを作成
    const paperElement = document.importNode(paperTemplate.content, true);

    const paperAnchorElement = paperElement.querySelector(".paper")!;
    const titleElement = paperElement.querySelector(".paper--title__en")!;
    const jaTitleElement = paperElement.querySelector(".paper--title__ja")!;
    const authorsElement = paperElement.querySelector(".paper--authors")!;
    const dateElement = paperElement.querySelector(".paper--date")!;
    const figureImgElement = paperElement.querySelector(".paper--figure")!;

    paperAnchorElement.setAttribute("href", `/paper.html?id=${paper.id}`);

    titleElement.textContent = paper.title;

    // Elementにテキストを挿入
    if (papers[idx].authors !== undefined) {
      for (let i = 0; i < papers[idx].authors.length; i++) {
        authorsElement.textContent = "Author：" + papers[idx].authors[i].name;
      }
    }

    jaTitleElement.textContent = paper.title_ja || "(和訳しています……)";
    dateElement.textContent = format(new Date(paper.published_at), "yyyy年MM月dd日");

    if (papers[idx].figures.length > 0) {
      figureImgElement.setAttribute("src", papers[idx].figures[0].figure.url);
    } else if (paper.analized !== "Done") {
      figureImgElement.classList.add("paper--figure__no-img");
      figureImgElement.setAttribute("src", images["Unanalyzed"]);
    } else {
      figureImgElement.classList.add("paper--figure__no-img");
      figureImgElement.setAttribute("src", images["NoImg"]);
    }

    // bodyにpaper elementを挿入
    if (mainElement === null) return;
    mainElement.appendChild(searchResultElement);
    searchResultElement.appendChild(paperElement);

    if (!paper.title_ja)
      axios
        .get(`${railsHost}/translate`, {
          params: {
            paper: paper.id,
            type: "title",
            text: paper.title
          }
        })
        .then(response => {
          jaTitleElement.textContent = "(" + response.data.text + ")";
          return response;
        });
  });

  // ローディングを非アクティブ化
  const loadingElement = document.getElementById("list-loading")!;
  loadingElement.classList.remove("active");

  // さらに読むボタンをアクティブ化
  const getMoreElement = document.getElementById("next-button")!;
  getMoreElement.classList.add("active");
};

const getMorePapers = (): void => {
  const nextButtonElement = document.getElementById("next-button");
  const loadingElement = document.getElementById("loading");

  // ボタンを非表示にし、ローディングアニメーションを表示する
  if (nextButtonElement && loadingElement) {
    nextButtonElement.style.display = "none";
    loadingElement.style.display = "block";
  }
  axios
    .get(sourceUrl, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      params: { search_word: paperNameRaw, page: ++currentPage }
    })
    .then(res => {
      const papers = res.data as Paper[];
      appendPapers(papers);
    })
    .then(() => {
      // ボタンを表示し、ローディングアニメーションを非表示にする
      if (nextButtonElement && loadingElement) {
        nextButtonElement.style.display = "block";
        loadingElement.style.display = "none";
      }
    });
};

window.addEventListener("DOMContentLoaded", () => {
  paperTemplate = document.getElementById("paper-template") as HTMLTemplateElement;

  // eslint-disable-next-line @typescript-eslint/camelcase
  axios.get(sourceUrl, { params: { search_word: paperNameRaw } }).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });

  const nextButtonElement = document.getElementById("next-button");
  if (nextButtonElement) {
    nextButtonElement.addEventListener("click", getMorePapers);
  }
});
