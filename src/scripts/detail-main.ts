import axios from "axios";
import { Paper } from "./models";
import mockPapers from "../mocks/mock";
import { format } from "date-fns";

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  const mainContentsElement = document.getElementById("maincontents");
  const toPDFElement = document.getElementById("link");
  //papers.forEach((paper, idx) => {
    console.log(papers[2].title);
    console.log(papers[2].figures[2].figure.url);

    // Element Elementを生成
    const paperElement = document.createElement("div");
    const topElement = document.createElement("div");
    const bottomElement = document.createElement("div");
    const titleElement = document.createElement("div");
    const jaTitleElement = document.createElement("div");
    const authorElement = document.createElement("div");
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
    // const figureImgElement = document.createElement("img");
    // const figureImg2Element = document.createElement("img");
    // const figureImg3Element = document.createElement("img");

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
    authorElement.classList.add("author-block");
    keywordElement.classList.add("keyword-block");
    journalElement.classList.add("journal-block");
    urlElement.classList.add("url-block");
    abstractElement.classList.add("abstract-block");
    figureElement.classList.add("figures-block");
    // figureImgElement.classList.add("figures-block_img");
    // figureImg2Element.classList.add("figures-block_img");
    // figureImg3Element.classList.add("figures-block_img");

    abstractTitleElement.classList.add("title-block");
    authorTitleElement.classList.add("title-block");
    keywordTitleElement.classList.add("title-block");
    imageTitleElement.classList.add("title-block");
    journalTitleElement.classList.add("title-block");

    showFooterElement.classList.add("show-footer-float-marker");

    // Elementにテキストを挿入
    titleElement.textContent = papers[2].title;
    jaTitleElement.textContent = "(" + papers[2].title_ja + ")";
    authorElement.textContent = "Henggang Cui, Gregory R. Ganger, Phillip B. Gibbons";
    keywordElement.textContent = "macine learning,computer science";
    journalElement.textContent = papers[2].journal;
    citeElement.textContent = "cite：" + papers[2].cite_count;
    citedElement.textContent = "cited：" + papers[2].cited_count;
    linkElement.setAttribute("href", papers[2].url);
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = papers[2].url;
    urlElement.appendChild(linkElement);
    dateElement.textContent = "published: " + format(
      new Date(papers[2].published_at),
      "yyyy-MM-dd"
    );
    abstractElement.textContent = papers[2].abstract;

    //画像らへん
    for (var i = 0; i < papers[2].figures.length; i++) {
        const figureImgElement = document.createElement("img");
        figureImgElement.classList.add("figures-block_img");
        figureImgElement.setAttribute("src", papers[2].figures[i].figure.url);
        figureElement.appendChild(figureImgElement);
    };

    //figureDisElement.textContent = papers[2].figures[1].explanation;
    //figureImgElement.setAttribute("src", papers[2].figures[1].figure);
    // figures.forEach((figure, idx) => {
    //   const figureImgElement = document.createElement("img");
    //   figureImgElement.classList.add("figures-block_img");
    //   figureImgElement.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
    //   //figureImg2Element.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
    //   //figureImg3Element.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
    //   figureElement.appendChild(figureImgElement);
    // };

    abstractTitleElement.textContent = "Abstract";
    authorTitleElement.textContent = "Author";
    imageTitleElement.textContent = "Images";
    journalTitleElement.textContent = "Journal";
    keywordTitleElement.textContent = "Keyword";

    // 子Elementをpaper Elementに挿入
    //top
    paperElement.appendChild(topElement);
    topElement.appendChild(titleElement);
    topElement.appendChild(jaTitleElement);
    topElement.appendChild(dateElement);
    topElement.appendChild(citeNumberElement);
    citeNumberElement.appendChild(citeElement);
    citeNumberElement.appendChild(citedElement);

    //bottom
    //paperElement.appendChild(bottomElement);
    bottomElement.appendChild(authorTitleElement);
    bottomElement.appendChild(authorElement);
    bottomElement.appendChild(keywordTitleElement);
    bottomElement.appendChild(keywordElement);
    bottomElement.appendChild(journalTitleElement);
    bottomElement.appendChild(journalElement);
    bottomElement.appendChild(showFooterElement);
    bottomElement.appendChild(imageTitleElement);
    bottomElement.appendChild(figureElement);
    // figureElement.appendChild(figureImgElement);
    // figureElement.appendChild(figureImg2Element);
    // figureElement.appendChild(figureImg3Element);
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
  //};
};

window.addEventListener("DOMContentLoaded", () => {
  // Production: https://siscorn-checkapp.herokuapp.com/papers/all

  const sourceUrl = "https://siscorn-checkapp.herokuapp.com/papers/all";
  // const sourceUrl = "http://localhost:3000/papers/all";
  axios.get(sourceUrl).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);

    const authors = res.data as Author[];
    appendAuthors(authors);

    const keywords = res.data as Keyword[];
    appendKeywords(keywords);

    const figures = res.data as Figure[];
    appendFigures(figures);
  });

  // Development
  // const papers = mockPapers as Paper[];
  // appendPapers(papers);
});
