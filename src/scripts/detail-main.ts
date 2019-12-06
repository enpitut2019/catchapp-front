import axios from "axios";
import { Paper } from "./models";
import { format } from "date-fns";

const railsHost = process.env.RAILS_HOST;

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  const mainContentsElement = document.getElementById("maincontents");
  const toPDFElement = document.getElementById("link");

  // Element Elementを生成
  const paperElement = document.createElement("div");
  const topElement = document.createElement("div");
  const bottomElement = document.createElement("div");
  const titleElement = document.createElement("div");
  const jaTitleElement = document.createElement("div");
  const keywordElement = document.createElement("div");
  const journalElement = document.createElement("div");
  const citeNumberElement = document.createElement("div");
  const citeElement = document.createElement("div");
  const citedElement = document.createElement("div");
  const urlElement = document.createElement("div");
  const dateElement = document.createElement("div");
  const linkElement = document.createElement("a");
  const abstractElement = document.createElement("section");

  //image
  const figureElement = document.createElement("div");

  //title
  const abstractTitleElement = document.createElement("div");
  const authorTitleElement = document.createElement("div");
  const imageTitleElement = document.createElement("div");
  const journalTitleElement = document.createElement("div");
  const keywordTitleElement = document.createElement("div");

  const showFooterElement = document.createElement("div");

  // Elementにクラスを適用
  paperElement.classList.add("paper-block");

  topElement.classList.add("paper-block_top");
  titleElement.classList.add("titleelement-block");
  jaTitleElement.classList.add("ja-titleelement-block");
  dateElement.classList.add("date-block");
  citeNumberElement.classList.add("cite-number-block");
  citeElement.classList.add("cite-number-block_cite");
  citedElement.classList.add("cite-number-block_cite");

  bottomElement.classList.add("paper-block_bottom");
  keywordElement.classList.add("keyword-block");
  journalElement.classList.add("journal-block");
  urlElement.classList.add("url-block");
  abstractElement.classList.add("abstract-block");
  figureElement.classList.add("figures-block");

  abstractTitleElement.classList.add("title-block");
  authorTitleElement.classList.add("title-block");
  keywordTitleElement.classList.add("title-block");
  imageTitleElement.classList.add("title-block");
  journalTitleElement.classList.add("title-block");

  showFooterElement.classList.add("show-footer-float-marker");

  // Elementにテキストを挿入
  titleElement.textContent = papers[2].title;
  jaTitleElement.textContent = "(" + papers[2].title_ja + ")";
  keywordElement.textContent = "macine learning,computer science";
  journalElement.textContent = papers[2].journal;
  citeElement.textContent = "cite：" + papers[2].cite_count;
  citedElement.textContent = "cited：" + papers[2].cited_count;
  linkElement.setAttribute("href", papers[2].url);
  linkElement.setAttribute("target", "_blank");
  linkElement.textContent = papers[2].url;
  urlElement.appendChild(linkElement);
  dateElement.textContent =
    "published: " + format(new Date(papers[2].published_at), "yyyy-MM-dd");
  abstractElement.textContent = papers[2].abstract;

  paperElement.appendChild(bottomElement);
  bottomElement.appendChild(authorTitleElement);

  // 著者
  for (let t = 0; t < papers[2].authors.length; t++) {
    const authorElement = document.createElement("div");
    authorElement.classList.add("author-block");
    authorElement.textContent = papers[2].authors[t].name;
    bottomElement.appendChild(authorElement);
  }

  //画像らへん
  for (let i = 0; i < papers[2].figures.length; i++) {
    const figureImgElement = document.createElement("img");
    figureImgElement.classList.add("figures-block_img");
    figureImgElement.setAttribute("src", papers[2].figures[i].figure.url);
    figureElement.appendChild(figureImgElement);
  }

  abstractTitleElement.textContent = "Abstract";
  authorTitleElement.textContent = "Author";
  imageTitleElement.textContent = "Images";
  journalTitleElement.textContent = "Journal";
  keywordTitleElement.textContent = "Keyword";

  // 子Elementをpaper Elementに挿入
  paperElement.appendChild(topElement);
  topElement.appendChild(titleElement);
  topElement.appendChild(jaTitleElement);
  topElement.appendChild(dateElement);
  topElement.appendChild(citeNumberElement);
  citeNumberElement.appendChild(citeElement);
  citeNumberElement.appendChild(citedElement);

  //bottom
  bottomElement.appendChild(keywordTitleElement);
  bottomElement.appendChild(keywordElement);
  bottomElement.appendChild(journalTitleElement);
  bottomElement.appendChild(journalElement);
  bottomElement.appendChild(showFooterElement);
  bottomElement.appendChild(imageTitleElement);
  bottomElement.appendChild(figureElement);
  bottomElement.appendChild(abstractTitleElement);
  bottomElement.appendChild(abstractElement);
  bottomElement.appendChild(urlElement);

  // bodyにpaper elementを挿入
  if (mainElement === null) return;
  mainElement.appendChild(paperElement);

  // bodyにpaper elementを挿入
  if (mainContentsElement === null) return;
  mainContentsElement.appendChild(bottomElement);

  if (toPDFElement === null) return;
  toPDFElement.appendChild(urlElement);
};

window.addEventListener("DOMContentLoaded", () => {
  const sourceUrl = `${railsHost}/papers/all`;
  axios.get(sourceUrl).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);

    // 後から有効化する
    // const authors = res.data as Author[];
    // appendAuthors(authors);

    // const keywords = res.data as Keyword[];
    // appendKeywords(keywords);

    // const figures = res.data as Figure[];
    // appendFigures(figures);
  });
});
