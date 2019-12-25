import axios from "axios";
import { Paper } from "./models";
import { format } from "date-fns";

const railsHost = process.env.RAILS_HOST;
const parser = new URL(window.location.href);
const paperNameRaw = parser.searchParams.get("name");
const paperIdRaw = parser.searchParams.get("id");
const paperId = String(paperIdRaw);

const appendPapers = (papers: Paper[]): void => {
  if (paperIdRaw === null) return;

  console.log(papers);
  const paper = papers.find(paper => paper.id == paperId);

  if (paper === undefined) return;

  const mainElement = document.getElementById("main");
  const mainContentsElement = document.getElementById("maincontents");

  // Element Elementを生成
  const paperElement = document.createElement("div");
  const topElement = document.createElement("div");
  const bottomElement = document.createElement("div");
  const titleElement = document.createElement("div");
  const jaTitleElement = document.createElement("div");
  //const keywordElement = document.createElement("div");
  const journalElement = document.createElement("div");
  const citeNumberElement = document.createElement("div");
  const citeElement = document.createElement("div");
  const citedElement = document.createElement("div");
  const urlElement = document.createElement("div");
  const dateElement = document.createElement("div");
  const linkElement = document.createElement("a");
  const abstractElement = document.createElement("section");

  //title
  const abstractTitleElement = document.createElement("div");
  const authorTitleElement = document.createElement("div");
  const journalTitleElement = document.createElement("div");
  //const keywordTitleElement = document.createElement("div");
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
  //keywordElement.classList.add("keyword-block");
  journalElement.classList.add("journal-block");
  urlElement.classList.add("url-block");
  abstractElement.classList.add("abstract-block");

  abstractTitleElement.classList.add("title-block");
  authorTitleElement.classList.add("title-block");
  //keywordTitleElement.classList.add("title-block");
  journalTitleElement.classList.add("title-block");
  urlTitleElement.classList.add("title-block");

  showFooterElement.classList.add("show-footer-float-marker");

  footerButtomElement.classList.add("button-block");
  footerButtonContentElement.classList.add("button-block_content");
  footerHrefElement.classList.add("link-block");

  // Elementにテキストを挿入
  titleElement.textContent = paper.title;
  jaTitleElement.textContent = "(" + paper.title_ja + ")";
  //keywordElement.textContent = "macine learning,computer science";
  if(paper.journal){
    journalElement.textContent = paper.journal;
  }else{
    journalElement.textContent = "journalが取得できませんでした";
  }
  citeElement.textContent = "cite：" + paper.cite_count;
  citedElement.textContent = "cited：" + paper.cited_count;
  linkElement.setAttribute("href", paper.pdf_url);
  linkElement.setAttribute("target", "_blank");
  linkElement.textContent = paper.pdf_url;
  urlElement.appendChild(linkElement);
  dateElement.textContent =
    "published: " + format(new Date(paper.published_at), "yyyy-MM-dd");
  abstractElement.textContent = paper.abstract;

  paperElement.appendChild(bottomElement);
  bottomElement.appendChild(authorTitleElement);

  // 著者
  if (paper.authors !== undefined) {
    for (let t = 0; t < paper.authors.length; t++) {
      const authorElement = document.createElement("div");
      authorElement.classList.add("author-block");
      authorElement.textContent = paper.authors[t].name;
      bottomElement.appendChild(authorElement);
    }
  }

  const figureElement = document.createElement("div");

  if (paper.figures !== undefined) {
    if (0 < paper.figures.length) {
      const imageTitleElement = document.createElement("div");

      figureElement.classList.add("figures-block");
      imageTitleElement.classList.add("title-block");

      imageTitleElement.textContent = "Images";

      bottomElement.appendChild(imageTitleElement);
      bottomElement.appendChild(figureElement);
    }
  }

  //画像&モーダル
  if (paper.figures !== undefined) {
    for (let i = 0; i < paper.figures.length; i++) {
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
      if (paper.figures.length > 0) {
        defaultImgElement.setAttribute("src", paper.figures[i].figure.url);
        modalImgElement.setAttribute("src", paper.figures[i].figure.url);
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

      modalImgExplanationElement.textContent = paper.figures[i].explanation;
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
  footerHrefElement.setAttribute("href", paper.pdf_url);
  footerHrefElement.textContent = "PDF版を読む";

  abstractTitleElement.textContent = "Abstract";
  authorTitleElement.textContent = "Author";
  journalTitleElement.textContent = "Journal";
  //keywordTitleElement.textContent = "Keyword";
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
  //bottomElement.appendChild(keywordTitleElement);
  //bottomElement.appendChild(keywordElement);
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

  const figureUrl = `${railsHost}/papers/get_figure`;
  if (paper.analized !== "Done") {
    // eslint-disable-next-line @typescript-eslint/camelcase
    axios.post(figureUrl, { paper_id: paper.id }).then(res => {
      const paper = res.data as Paper;
      console.log(paper);
      mainElement!.textContent = null;
      mainContentsElement!.textContent = null;
      appendPapers([paper]);
    });
  }

  // bodyにpaper elementを挿入
  if (mainElement === null) return;
  mainElement.appendChild(paperElement);

  // bodyにpaper elementを挿入
  if (mainContentsElement === null) return;
  mainContentsElement.appendChild(bottomElement);
};

window.addEventListener("DOMContentLoaded", () => {
  const sourceUrl = `${railsHost}/search/get_xml`;
  axios.post(sourceUrl, { search_word: paperNameRaw }).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });
});
