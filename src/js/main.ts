import axios from "axios";
import { Paper } from "../models";

window.addEventListener("DOMContentLoaded", () => {
  axios.get("/mock.json").then(res => {
    const papers = res.data as Paper[];
    papers.forEach(paper => {
      // Element Elementを生成
      const paperElement = document.createElement("div");
      const titleElement = document.createElement("div");
      const urlElement = document.createElement("div");

      // Elementにクラスを適用
      paperElement.classList.add("paper");
      titleElement.classList.add("paper--title");
      urlElement.classList.add("paper--url");

      // Elementにテキストを挿入
      titleElement.textContent = paper.title;
      urlElement.textContent = paper.url;

      // 子Elementをpaper Elementに挿入
      paperElement.appendChild(titleElement);
      paperElement.appendChild(urlElement);

      // bodyにpaper elementを挿入
      document.body.appendChild(paperElement);
    });
  });
});
