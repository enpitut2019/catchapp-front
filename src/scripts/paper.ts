import axios from "axios";
import { Paper, Figure } from "./models";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let MathJax: any;

const railsHost = process.env.RAILS_HOST;
const parser = new URL(window.location.href);
const paperIdRaw = parser.searchParams.get("id");
const paperId = String(paperIdRaw);

let paperTemplate: HTMLTemplateElement | null = null;

const figureCaptionTranslate = (figure: Figure): Promise<Figure> => axios.post(`${railsHost}/figure/${figure.id}/translate`).then(res => res.data as Figure);

const appendPapers = (paper: Paper): void => {
  if (paperIdRaw === null) return;
  if (paperTemplate === null) return;

  console.log(paper);

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
  const abstractToEnSwitchElement = paperElement.querySelector(".switch__to-en")!;
  const abstractToJaSwitchElement = paperElement.querySelector(".switch__to-ja")!;

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
      imgWrapperElement.addEventListener("click", async () => {
        const modalTemplate = document.getElementById("modal-template") as HTMLTemplateElement;
        const modalElement = document.getElementById("figure-modal") as HTMLDivElement;
        const modalContentWrapperElement = modalElement.querySelector(".modal--content-wrapper") as HTMLDivElement;
        const modalContentElement = document.importNode(modalTemplate.content, true);
        const modalImgElement = modalContentElement.querySelector(".modal--img") as HTMLImageElement;
        const modalImgLinkElement = modalContentElement.querySelector(".modal--img-link") as HTMLAnchorElement;
        const modalTextElement = modalContentElement.querySelector(".modal--text__en") as HTMLParagraphElement;
        const modalTextJaElement = modalContentElement.querySelector(".modal--text__ja") as HTMLParagraphElement;
        const switchToJaElement = modalContentElement.querySelector(".switch__to-ja") as HTMLDivElement;
        const switchToEnElement = modalContentElement.querySelector(".switch__to-en") as HTMLDivElement;
        const nextButtonElement = modalContentElement.querySelector(".modal--control__next") as HTMLDivElement;
        const prevButtonElement = modalContentElement.querySelector(".modal--control__prev") as HTMLDivElement;

        // 言語切替ボタンの挙動
        switchToEnElement.addEventListener("click", () => {
          switchToJaElement.classList.add("active");
          switchToEnElement.classList.remove("active");
          modalTextElement.classList.add("active");
          modalTextJaElement.classList.remove("active");
        });
        switchToJaElement.addEventListener("click", () => {
          switchToJaElement.classList.remove("active");
          switchToEnElement.classList.add("active");
          modalTextElement.classList.remove("active");
          modalTextJaElement.classList.add("active");
        });

        // 前後ボタン
        if (imgWrapperElement.nextElementSibling === null) nextButtonElement.style.visibility = "hidden";
        if (imgWrapperElement.previousElementSibling === null) prevButtonElement.style.visibility = "hidden";
        nextButtonElement.addEventListener("click", () => {
          (imgWrapperElement.nextElementSibling as HTMLElement).click();
        });
        prevButtonElement.addEventListener("click", () => {
          (imgWrapperElement.previousElementSibling as HTMLElement).click();
        });

        modalContentWrapperElement.textContent = null;

        // 画像を入れ込む
        modalImgElement.src = figure.figure.url;
        modalImgLinkElement.href = figure.figure.url;

        // 画像の説明を入れ込む
        modalTextElement.textContent = figure.caption || figure.explanation || "";
        if (figure.caption) {
          modalTextJaElement.textContent = figure.caption_ja || "翻訳中です…";
        }

        modalContentWrapperElement.appendChild(modalContentElement);

        // モーダルのアクティブ化
        modalElement.classList.add("active");

        // 翻訳リクエストの発火と更新
        // キャプションは存在するが日本語キャプションが存在しない場合に発火させる
        if (figure.caption !== null && figure.caption_ja === null) {
          const updatedFigure = await figureCaptionTranslate(figure);
          modalTextJaElement.textContent = updatedFigure.caption_ja || "";
        }
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
      appendPapers(paper);
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

  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
};

const closeModal = (): void => {
  const modal = document.getElementById("figure-modal")!;
  modal.classList.remove("active");
};

window.addEventListener("DOMContentLoaded", () => {
  paperTemplate = document.getElementById("paper-template") as HTMLTemplateElement;

  // eslint-disable-next-line @typescript-eslint/camelcase

  axios.get(`${railsHost}/paper/${paperId}`).then(res => {
    const paper = res.data as Paper;
    appendPapers(paper);
  });

  const modalOverlay = document.getElementById("modal-overlay")!;
  const modalCloseButton = document.getElementById("modal-close")!;

  modalOverlay.addEventListener("click", closeModal);
  modalCloseButton.addEventListener("click", closeModal);
});
