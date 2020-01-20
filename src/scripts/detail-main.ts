import axios from "axios";
import { Paper } from "./models";
import { format } from "date-fns";

const railsHost = process.env.RAILS_HOST;
const parser = new URL(window.location.href);
const paperNameRaw = parser.searchParams.get("name");
const paperIdRaw = parser.searchParams.get("id");
const paperId = String(paperIdRaw);

let paperTemplate: HTMLTemplateElement | null = null;

const appendPapers = (papers: Paper[]): void => {
  if (paperIdRaw === null) return;
  if (paperTemplate === null) return;

  console.log(papers);
  const paper = papers.find(paper => paper.id == paperId);

  if (paper === undefined) return;

  const appElement = document.getElementById("app")!;

  // Element Elementを生成
  const paperElement = document.importNode(paperTemplate.content, true);
  const figuresElement = paperElement.querySelector(".paper--figures")!;
  const figureAnalyzingElement = paperElement.querySelector(".paper--figures__analyzing")!;
  const figureNoImgElement = paperElement.querySelector(".paper--figures__no-img")!;
  const titleElement = paperElement.querySelector(".paper--title__en")!;
  const jaTitleElement = paperElement.querySelector(".paper--title__ja")!;
  const journalElement = paperElement.querySelector(".paper--journal")!;
  const arxivLinkElement = paperElement.querySelector(".paper--arxiv-link")! as HTMLAnchorElement;
  const dateElement = paperElement.querySelector(".paper--date")!;
  const pdfLinkElement = paperElement.querySelector(".paper--pdf-link")! as HTMLAnchorElement;
  const abstractEnElement = paperElement.querySelector(".paper--abstract__en")!;
  const abstractJaElement = paperElement.querySelector(".paper--abstract__ja")!;
  const authorsElement = paperElement.querySelector(".paper--authors")!;

  // 翻訳切り替えボタン
  const abstractToEnSwitchElement = paperElement.querySelector(".abstract-switch__to-en")!;
  const abstractToJaSwitchElement = paperElement.querySelector(".abstract-switch__to-ja")!;

  // Elementにテキストを挿入
  titleElement.textContent = paper.title;
  jaTitleElement.textContent = "(" + paper.title_ja + ")";
  journalElement.textContent = paper.journal || "ジャーナルを取得できませんでした";
  dateElement.textContent = "published: " + format(new Date(paper.published_at), "yyyy-MM-dd");

  abstractEnElement.textContent = paper.abstract;
  abstractJaElement.textContent = paper.abstract_ja || "翻訳中……";

  // 翻訳切り替えボタン

  abstractToEnSwitchElement.addEventListener("click", () => {
    abstractEnElement.classList.add("active");
    abstractJaElement.classList.remove("active");
    abstractToEnSwitchElement.classList.remove("active");
    abstractToJaSwitchElement.classList.add("active");
  });

  abstractToJaSwitchElement.addEventListener("click", () => {
    abstractEnElement.classList.remove("active");
    abstractJaElement.classList.add("active");
    abstractToEnSwitchElement.classList.add("active");
    abstractToJaSwitchElement.classList.remove("active");
  });

  if (paper.figures.length > 0) {
    // 画像があるパターン
    const figureTemplate = document.getElementById("figure-template") as HTMLTemplateElement;

    for (const figure of paper.figures.reverse()) {
      const figureElement = document.importNode(figureTemplate.content, true);

      // 画像を設定
      const imgElement = figureElement.querySelector(".paper--figure") as HTMLImageElement;
      imgElement.src = figure.figure.url;

      // 画像を囲むdivがクリックされたときの処理
      const imgWrapperElement = figureElement.querySelector(".paper--figure-wrapper")!;
      imgWrapperElement.addEventListener("click", () => {
        const modalElement = document.getElementById("figure-modal")!;

        // 画像を入れ込む
        const modalImgElement = modalElement.querySelector(".modal--img")! as HTMLImageElement;
        modalImgElement.src = figure.figure.url;

        // 画像の説明を入れ込む
        const modalTextElement = modalElement.querySelector(".modal--text") as HTMLParagraphElement;
        modalTextElement.textContent = figure.explanation;

        // モーダルのアクティブ化
        modalElement.classList.add("active");
      });

      // 全体を囲うdivに追加
      figuresElement.appendChild(figureElement);

      // 画像の表示をアクティブ化
      figuresElement.classList.add("active");

      // 解析中の表示を消す
      figureAnalyzingElement.classList.remove("active");
    }
  } else if (paper.analized === "Done") {
    // 解析が終了しているが画像が無いパターン
    // 解析中の表示を消す
    figureAnalyzingElement.classList.remove("active");

    // 画像無しの表示をアクティブ化
    figureNoImgElement.classList.add("active");
  }

  // フッターボタン
  pdfLinkElement.href = paper.pdf_url;

  // 著者
  for (const author of paper.authors) {
    const authorElement = document.createElement("div");
    authorElement.classList.add("paper--author");
    authorElement.textContent = author.name;
    authorsElement.appendChild(authorElement);
  }

  arxivLinkElement.href = paper.url;
  arxivLinkElement.textContent = paper.url;

  if (paper.analized === "ToDo") {
    const getFigureUrl = `${railsHost}/papers/get_figure`;
    // eslint-disable-next-line @typescript-eslint/camelcase
    axios.post(getFigureUrl, { paper_id: paper.id }).then(res => {
      const paper = res.data as Paper;
      appElement.textContent = null;
      appendPapers([paper]);
    });
  }

  // ローディングアニメーションを無効化
  const loadingElement = document.getElementById("loading")!;
  loadingElement.classList.remove("active");

  // bodyにpaper elementを挿入
  appElement.appendChild(paperElement);

  // railsにabstractの翻訳リクエストを飛ばす
  if (!paper.abstract_ja)
    axios
      .get(`${railsHost}/translate`, {
        params: {
          paper: paper.id,
          type: "abstract",
          text: paper.abstract
        }
      })
      .then(response => {
        abstractJaElement.textContent = response.data.text;
        return response;
      });
};

const closeModal = (): void => {
  const modal = document.getElementById("figure-modal")!;
  modal.classList.remove("active");
};

window.addEventListener("DOMContentLoaded", () => {
  paperTemplate = document.getElementById("paper-template") as HTMLTemplateElement;

  const sourceUrl = `${railsHost}/search/get_xml`;
  // eslint-disable-next-line @typescript-eslint/camelcase
  axios.post(sourceUrl, { search_word: paperNameRaw }).then(res => {
    const papers = res.data as Paper[];
    appendPapers(papers);
  });

  const modalOverlay = document.getElementById("modal-overlay")!;
  const modalCloseButton = document.getElementById("modal-close")!;

  modalOverlay.addEventListener("click", closeModal);
  modalCloseButton.addEventListener("click", closeModal);
});
