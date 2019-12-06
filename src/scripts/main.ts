import axios from "axios";
import { Paper } from "./models";
// import mockPapers from "../mocks/mock";
import { format } from "date-fns";

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  papers.forEach((paper, idx) => {
    // Element Elementを生成
    const paperElement = document.createElement("a");
    const paperTextElement = document.createElement("div");
    const contentElement = document.createElement("div");
    const leftElement = document.createElement("div");
    // const citeandcitedElement = document.createElement("div");
    // const textElement = document.createElement("div");
    const titleElement = document.createElement("div");
    const authorsElement = document.createElement("div");
    const keywordsElement = document.createElement("div");
    const citeAndCitedElement = document.createElement("div");
    const citeElement = document.createElement("div");
    const citedElement = document.createElement("div");

    //const urlElement = document.createElement("div");
    const dateElement = document.createElement("div");
    const linkElement = document.createElement("a");
    //const abstractElement = document.createElement("section");
    const figureElement = document.createElement("div");
    const figureImgElement = document.createElement("img");
    // const figureDisElement = document.createElement("section");

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

    //urlElement.classList.add("paper--url");
    dateElement.classList.add("paper--content--text--date");
    //abstractElement.classList.add("paper--abstract");

    figureElement.classList.add("paper--content--left--figures");
    figureImgElement.classList.add("paper--content--left--figures--img");
    // Elementにテキストを挿入
    titleElement.textContent = paper.title;
    //authorElement.textContent = paper.authors[0].name;
    for (let i = 0; i < papers[idx].authors.length; i++) {
      authorsElement.textContent = "Author：" + papers[idx].authors[i].name;
    }

    keywordsElement.textContent = "keyword1";
    citeElement.textContent = "cite：" + papers[idx].cite_count;
    citedElement.textContent = "cited：" + papers[idx].cited_count;
    linkElement.setAttribute("href", paper.url);
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = paper.url;
    //urlElement.appendChild(linkElement);
    dateElement.textContent = format(
      new Date(paper.created_at),
      "yyyy年MM月dd日"
    );
    //abstractElement.textContent = paper.abstract;

    //figureDisElement.textContent = paper.figures[idx].explanation;
    //figureImgElement.setAttribute("src", paper.figures[idx].figure);
    if (papers[idx].figures.length > 0)
      figureImgElement.setAttribute("src", papers[idx].figures[0].figure.url);

    //figureDisElement.textContent = "This figure is...";
    figureElement.appendChild(figureImgElement);
    //figureElement.appendChild(figureDisElement);

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
    //paperElement.appendChild(urlElement);

    //paperElement.appendChild(abstractElement);

    // bodyにpaper elementを挿入
    if (mainElement === null) return;
    mainElement.appendChild(paperElement);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  // Production: https://siscorn-checkapp.herokuapp.com/papers/all
  axios.get("https://siscorn-checkapp.herokuapp.com/papers/all").then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });

  // Development
  // const papers = mockPapers as Paper[];
  // appendPapers(papers);
});
