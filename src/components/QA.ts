import { HtmlElementType } from "./types";

/**
 * @interface
 *  Includes id, question and content
 */
interface IContent {
  id: string;
  question: string;
  content: string;
}

/**
 * @class
 * containes logic like handlers etc....
 */

class Controller {
  private activeArticle: null | string = null;

  constructor(public section: HtmlElementType) {
    this.section = section;

    this.section?.addEventListener("click", this.sectionClickHandler);
  }

  private sectionClickHandler = (e: MouseEvent) => {
    const btnId = (e?.target as HTMLElement)?.dataset?.btnid;
    this.activeArticle = btnId || null;

    this.toggleArticleBtn();
    this.toggleArticleContent();
  };

  private toggleArticleBtn() {
    const articleBtn = document.querySelector(
      `#${this.activeArticle} button`
    ) as HTMLElement;

    if (articleBtn) {
      articleBtn.textContent = articleBtn.innerText === "+" ? "-" : "+";
    }
  }

  private toggleArticleContent() {
    const articleEleContent = document.querySelector(
      `#${this.activeArticle} .content`
    ) as HTMLElement;

    if (articleEleContent) {
      articleEleContent.classList.toggle("hidden");
    }
  }
}

/**
 * @class
 * Responsible for rendering elements. Just UI
 */

class View {
  private mainElement: HtmlElementType = null;
  constructor(public content: IContent[]) {
    this.content = content;
    this.mainElement = document.querySelector("main");

    this.createRootElement();
  }

  private async createRootElement() {
    const section = document.createElement("section");
    section.className = `w-2xl mx-auto flex flex-col gap-6`;

    this.mainElement?.append(section);
    this.renderElements(section);
    new Controller(section);
  }

  private renderArticle(article: IContent) {
    return `
          <article id="article-${article.id}" class="bg-white p-5 rounded-xl shadow-2xs">
            <div
              class="flex items-center justify-between text-teal-600 font-semibold"
            >
              <h2 class="text-xl">${article.question}</h2>
  
              <button
              data-btnid="article-${article.id}"
                class="text-3xl border-2 font-mono leading-none border-teal-500 rounded-full h-10 w-10 grid place-items-center cursor-pointer"
              >
                +
              </button>
            </div>
  
            <div class="content pt-3 hidden">
              <hr class="border-b border-teal-500 mb-2" />
  
              <div>
                ${article.content}
              </div>
            </div>
          </article>
          `;
  }

  private renderElements(section: HTMLElement) {
    if (section) {
      let articleContent = "";

      for (const article of this.content) {
        articleContent += this.renderArticle(article);
      }

      section.innerHTML = articleContent;
    }
  }
}

const content: IContent[] = [
  {
    id: "1",
    question: "What is TypeScript?",
    content: "TypeScript is a superset of JavaScript that adds static typing.",
  },
  {
    id: "2",
    question: "What is an interface in TypeScript?",
    content: "An interface defines the structure that an object should follow.",
  },
  {
    id: "3",
    question: "How do you declare a variable in TypeScript?",
    content:
      "You can use let, const, or var — just like in JavaScript — with optional type annotations.",
  },
];

new View(content);
