import axios from "axios";
import { Paper } from "./models";
import { format } from "date-fns";

const railsHost = process.env.RAILS_HOST;
const parser = new URL(window.location.href);
const paperNameRaw = parser.searchParams.get("name");
const paperIdRaw = parser.searchParams.get("id");
const paperId = Number(paperIdRaw);
if (paperIdRaw === null || isNaN(paperId)) return;

const appendPapers = (papers: Paper[]): void => {
  console.log(paperId);
  //console.log(papers[paperId].id);

  const mainElement = document.getElementById("main");
  const mainContentsElement = document.getElementById("maincontents");
  const toPDFElement = document.getElementById("link");
  //papers.forEach((paper, idx) => {

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

  //title
  const abstractTitleElement = document.createElement("div");
  const authorTitleElement = document.createElement("div");
  const journalTitleElement = document.createElement("div");
  const keywordTitleElement = document.createElement("div");
  const urlTitleElement = document.createElement("div");

  const showFooterElement = document.createElement("div");

  const footerButtomElement = document.createElement("div");
  const footerButtonContentElement = document.createElement("div");
  const footerHrefElement = document.createElement("a");

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

  abstractTitleElement.classList.add("title-block");
  authorTitleElement.classList.add("title-block");
  keywordTitleElement.classList.add("title-block");
  journalTitleElement.classList.add("title-block");
  urlTitleElement.classList.add("title-block");

  showFooterElement.classList.add("show-footer-float-marker");

  footerButtomElement.classList.add("button-block");
  footerButtonContentElement.classList.add("button-block_content");
  footerHrefElement.classList.add("link-block");

  // Elementにテキストを挿入
  titleElement.textContent = papers[paperId].title;
  jaTitleElement.textContent = "(" + papers[paperId].title_ja + ")";
  keywordElement.textContent = "macine learning,computer science";
  journalElement.textContent = papers[paperId].journal;
  citeElement.textContent = "cite：" + papers[paperId].cite_count;
  citedElement.textContent = "cited：" + papers[paperId].cited_count;
  linkElement.setAttribute("href", papers[paperId].pdf_url);
  linkElement.setAttribute("target", "_blank");
  linkElement.textContent = papers[paperId].pdf_url;
  urlElement.appendChild(linkElement);
  dateElement.textContent =
    "published: " +
    format(new Date(papers[paperId].published_at), "yyyy-MM-dd");
  abstractElement.textContent = papers[paperId].abstract;

  paperElement.appendChild(bottomElement);
  bottomElement.appendChild(authorTitleElement);

  // 著者
  if (papers[paperId].authors != null) {
    for (let t = 0; t < papers[paperId].authors.length; t++) {
      const authorElement = document.createElement("div");
      authorElement.classList.add("author-block");
      authorElement.textContent = papers[paperId].authors[t].name;
      bottomElement.appendChild(authorElement);
    }
  }

  const figureElement = document.createElement("div");

  if (papers[paperId].figures != null) {
    if (0 < papers[paperId].figures.length) {
      const imageTitleElement = document.createElement("div");

      figureElement.classList.add("figures-block");
      imageTitleElement.classList.add("title-block");

      imageTitleElement.textContent = "Images";

      bottomElement.appendChild(imageTitleElement);
      bottomElement.appendChild(figureElement);
    }
  }

  //画像&モーダル
  if (papers[paperId].figures != null) {
    for (let i = 0; i < papers[paperId].figures.length; i++) {
      const defaultHrefElement = document.createElement("a");
      const defaultImgElement = document.createElement("img");
      const modalElement = document.createElement("div");
      const modalHrefElement = document.createElement("a");
      const modalWindowElement = document.createElement("div");
      const modalContentElement = document.createElement("div");
      const modalImgElement = document.createElement("img");
      const modalImgExplanationElement = document.createElement("p");
      const modalCloseElement = document.createElement("a");

      // modalのスタイル
      modalElement.classList.add("modal-wrapper");
      defaultImgElement.classList.add("figures-block_img");
      modalHrefElement.classList.add("modal-overlay");
      modalWindowElement.classList.add("modal-window");
      modalContentElement.classList.add("modal-content");
      modalImgElement.classList.add("figures-block_modal-img");
      modalImgExplanationElement.classList.add("figures-block_text");
      modalCloseElement.classList.add("modal-close");
      modalElement.setAttribute("id", "modal-0" + (i + 1));
      modalHrefElement.setAttribute("href", "#!");
      defaultHrefElement.setAttribute("href", "#modal-0" + (i + 1));
      if (papers[paperId].figures.length > 0) {
        defaultImgElement.setAttribute(
          "src",
          papers[paperId].figures[i].figure.url
        );
        modalImgElement.setAttribute(
          "src",
          papers[paperId].figures[i].figure.url
        );
      } else {
        defaultImgElement.setAttribute(
          "src",
          "https://www.music-scene.jp/uploads/junkband/w-noimage_s.jpg"
        );
        modalImgElement.setAttribute(
          "src",
          "https://www.music-scene.jp/uploads/junkband/w-noimage_s.jpg"
        );
      }

      modalImgExplanationElement.textContent =
        "Figure" +
        (i + 1) +
        ":  GSAT's behaviour during one try, N = 500, L = 2150, rst 250 ip";
      modalCloseElement.setAttribute("href", "#!");
      modalCloseElement.textContent = "✕";

      figureElement.appendChild(defaultHrefElement);
      defaultHrefElement.appendChild(defaultImgElement);
      figureElement.appendChild(modalElement);
      modalElement.appendChild(modalHrefElement);
      modalElement.appendChild(modalWindowElement);
      modalWindowElement.appendChild(modalContentElement);
      modalContentElement.appendChild(modalImgElement);
      modalContentElement.appendChild(modalImgExplanationElement);
      modalWindowElement.appendChild(modalCloseElement);
    }
  }

  // フッターボタン
  footerButtomElement.setAttribute("id", "url");
  footerButtomElement.setAttribute("data-element-id", "footer-float");
  footerHrefElement.setAttribute("href", papers[paperId].pdf_url);
  footerHrefElement.textContent = "PDF版を読む";

  abstractTitleElement.textContent = "Abstract";
  authorTitleElement.textContent = "Author";
  journalTitleElement.textContent = "Journal";
  keywordTitleElement.textContent = "Keyword";
  urlTitleElement.textContent = "ArchiveURL";

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
  bottomElement.appendChild(abstractTitleElement);
  bottomElement.appendChild(abstractElement);
  bottomElement.appendChild(urlTitleElement);
  bottomElement.appendChild(urlElement);

  bottomElement.appendChild(footerButtomElement);
  footerButtomElement.appendChild(footerButtonContentElement);
  footerButtonContentElement.appendChild(footerHrefElement);

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
  const sourceUrl = `${railsHost}/search/get_xml`;
  axios.post(sourceUrl, { search_word: paperNameRaw }).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });
});
