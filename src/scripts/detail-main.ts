import axios from "axios";
import { Paper } from "./models";
import mockPapers from "../mocks/mock";
import { format } from "date-fns";

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  const linkElement = document.getElementById("link");
  console.log(papers[0].title);

  // Element Elementを生成
  const paperElement = document.createElement("div");
  const titleElement = document.createElement("div");
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
  const figureElement = document.createElement("div");
  const figureImgElement = document.createElement("img");
  const figureImg2Element = document.createElement("img");
  const figureImg3Element = document.createElement("img");
  const abstractTitleElement = document.createElement("div");
  const authorTitleElement = document.createElement("div");
  const imageTitleElement = document.createElement("div");
  const journalTitleElement = document.createElement("div");
  const keywordTitleElement = document.createElement("div");

  // Elementにクラスを適用
  paperElement.classList.add("paper-block");
  titleElement.classList.add("paper-block_title");
  authorElement.classList.add("paper-block_author");
  keywordElement.classList.add("paper-block_keyword");
  journalElement.classList.add("paper-block_journal");
  citeNumberElement.classList.add("paper-block_cite-number");
  citeElement.classList.add("cite-block");
  citedElement.classList.add("cite-block");
  urlElement.classList.add("paper-block_url");
  dateElement.classList.add("paper-block_date");
  abstractElement.classList.add("paper-block_abstract");
  figureElement.classList.add("paper-block_figures");
  figureImgElement.classList.add("figure-img-block");
  figureImg2Element.classList.add("figure-img-block");
  figureImg3Element.classList.add("figure-img-block");

  abstractTitleElement.classList.add("title-block");
  authorTitleElement.classList.add("title-block");
  keywordTitleElement.classList.add("title-block");
  imageTitleElement.classList.add("title-block");
  journalTitleElement.classList.add("title-block");

  // Elementにテキストを挿入
  titleElement.textContent = papers[0].title;
  authorElement.textContent = "Henggang Cui, Gregory R. Ganger, Phillip B. Gibbons";
  keywordElement.textContent = "macine learning,computer science";
  journalElement.textContent = "Carnegie Mellon University magazine 2019-10, p.115-132";
  citeElement.textContent = "cite：3";
  citedElement.textContent = "cited：5";
  linkElement.setAttribute("href", papers[0].url);
  linkElement.setAttribute("target", "_blank");
  linkElement.textContent = papers[0].url;
  urlElement.appendChild(linkElement);
  dateElement.textContent = format(
    new Date(papers[0].created_at),
    "yyyy年MM月dd日"
  );
  abstractElement.textContent = papers[0].abstract;

  //figureDisElement.textContent = paper.figures[idx].explanation;
  //figureImgElement.setAttribute("src", paper.figures[idx].figure);
  figureImgElement.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
  figureImg2Element.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
  figureImg3Element.setAttribute("src", "https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png");
  abstractTitleElement.textContent = "Abstract";
  authorTitleElement.textContent = "Author";
  imageTitleElement.textContent = "Images";
  journalTitleElement.textContent = "Journal";
  keywordTitleElement.textContent = "Keyword";

  // 子Elementをpaper Elementに挿入
  paperElement.appendChild(titleElement);
  paperElement.appendChild(dateElement);
  paperElement.appendChild(citeNumberElement);
  citeNumberElement.appendChild(citeElement);
  citeNumberElement.appendChild(citedElement);
  paperElement.appendChild(authorTitleElement);
  paperElement.appendChild(authorElement);
  paperElement.appendChild(keywordTitleElement);
  paperElement.appendChild(keywordElement);
  paperElement.appendChild(journalTitleElement);
  paperElement.appendChild(journalElement);
  paperElement.appendChild(imageTitleElement);
  paperElement.appendChild(figureElement);
  figureElement.appendChild(figureImgElement);
  figureElement.appendChild(figureImg2Element);
  figureElement.appendChild(figureImg3Element);
  paperElement.appendChild(abstractTitleElement);
  paperElement.appendChild(abstractElement);
  paperElement.appendChild(urlElement);

  // bodyにpaper elementを挿入
  if (mainElement === null) return;
  mainElement.appendChild(paperElement);

  if (linkElement === null) return;
  linkElement.appendChild(urlElement);
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
