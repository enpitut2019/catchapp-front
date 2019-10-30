import axios from "axios";
import { Paper } from "./models";
import mockPapers from "../mocks/mock";
import { format } from "date-fns";

console.log("hogeeeeee");

const appendPapers = (papers: Paper[]): void => {
  const mainElement = document.getElementById("main");
  papers.forEach(paper => {
    // Element Elementを生成
    const paperElement = document.createElement("div");
    const titleElement = document.createElement("div");
    const urlElement = document.createElement("div");
    const dateElement = document.createElement("div");
    const linkElement = document.createElement("a");

    // Elementにクラスを適用
    paperElement.classList.add("paper");
    titleElement.classList.add("paper--title");
    urlElement.classList.add("paper--url");
    dateElement.classList.add("paper--date");

    // Elementにテキストを挿入
    titleElement.textContent = paper.title;
    linkElement.setAttribute("href", paper.url);
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = paper.url;
    urlElement.appendChild(linkElement);
    dateElement.textContent = format(
      new Date(paper.created_at),
      "yyyy年MM月dd日"
    );
    // 子Elementをpaper Elementに挿入
    paperElement.appendChild(titleElement);
    paperElement.appendChild(urlElement);
    paperElement.appendChild(dateElement);

    // bodyにpaper elementを挿入
    if (mainElement === null) return;
    mainElement.appendChild(paperElement);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  // Production: https://siscorn-checkapp.herokuapp.com/papers/all
  axios.get("https://siscorn-checkapp.herokuapp.com/papers/all").then(res => {
    const papers = res.data.papers as Paper[];
    appendPapers(papers);
  });

  // Development
  // const papers = mockPapers as Paper[];
  // appendPapers(papers);
});
