import axios from "axios";
import { Paper } from "./models";
import mockPapers from "../mocks/mock";
import { format } from "date-fns";

console.log("hogeeeeee");

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  papers.forEach((paper, idx,) => {
    // Element Elementを生成
    const paperElement = document.createElement("div");
    const titleElement = document.createElement("div");
    const authorElement = document.createElement("div");
    const keywordElement = document.createElement("div");
    const journalElement = document.createElement("div");
    const citeElement = document.createElement("div");
    const citedElement = document.createElement("div");
    const urlElement = document.createElement("div");
    const dateElement = document.createElement("div");
    const linkElement = document.createElement("a");
    const abstractElement = document.createElement("section");
    const figureElement = document.createElement("div");
    const figureImgElement = document.createElement("img");
    const figureDisElement = document.createElement("section");

    // Elementにクラスを適用
    paperElement.classList.add("paper");
    titleElement.classList.add("paper--title");
    authorElement.classList.add("paper--author");
    keywordElement.classList.add("paper--keyword");
    journalElement.classList.add("paper--journal");
    citeElement.classList.add("paper--cite");
    citedElement.classList.add("paper--cited");
    urlElement.classList.add("paper--url");
    dateElement.classList.add("paper--date");
    abstractElement.classList.add("paper--abstract");
    figureElement.classList.add("paper--figures");

    // Elementにテキストを挿入
    titleElement.textContent = paper.title;
    authorElement.textContent = "author1";
    keywordElement.textContent = "keyword,keyword2";
    journalElement.textContent = "求人ジャーナル";
    citeElement.textContent = "引用数：3";
    citedElement.textContent = "被引用数：5";
    linkElement.setAttribute("href", paper.url);
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = paper.url;
    urlElement.appendChild(linkElement);
    dateElement.textContent = format(
      new Date(paper.created_at),
      "yyyy年MM月dd日"
    );
    abstractElement.textContent = paper.abstract;

    //figureDisElement.textContent = paper.figures[idx].explanation;
    //figureImgElement.setAttribute("src", paper.figures[idx].figure);
    figureImgElement.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
    figureDisElement.textContent = "EXPLANATION";
    figureElement.appendChild(figureImgElement);
    figureElement.appendChild(figureDisElement);

    // 子Elementをpaper Elementに挿入
    paperElement.appendChild(titleElement);
    paperElement.appendChild(authorElement);
    paperElement.appendChild(keywordElement);
    paperElement.appendChild(journalElement);
    paperElement.appendChild(citeElement);
    paperElement.appendChild(citedElement);
    paperElement.appendChild(dateElement);
    paperElement.appendChild(urlElement);
    paperElement.appendChild(figureElement);
    paperElement.appendChild(abstractElement);


    // bodyにpaper elementを挿入
    if (mainElement === null) return;
    mainElement.appendChild(paperElement);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  // Production: https://siscorn-checkapp.herokuapp.com/papers/all

  const sourceUrl = "https://siscorn-checkapp.herokuapp.com/papers/all";
  // const sourceUrl = "http://localhost:3000/papers/all";
  axios.get(sourceUrl).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });

  // Development
  // const papers = mockPapers as Paper[];
  // appendPapers(papers);
});
