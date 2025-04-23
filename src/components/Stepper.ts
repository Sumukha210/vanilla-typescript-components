import { HtmlElementType } from "./types";

/**
 * @class
 * Reponsible for handling logic like button click handler and other things
 */

class Controller {
  private activeStepperIndex: number;
  private allStepperBtns: NodeListOf<Element>;

  constructor(public section: HTMLElement) {
    this.activeStepperIndex = 1;

    this.allStepperBtns = this.section?.querySelectorAll(".stepper");
    this.section.addEventListener("click", this.sectionClickHandler);

    this.defaultSettings();
  }

  private sectionClickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    this.onStepperClick(target);
  };

  private onStepperClick(target: HTMLElement) {
    const containerElement = target.parentElement?.parentElement;

    if (containerElement?.classList?.contains("stepper")) {
      const targetBtnIndex = Number(
        target.dataset?.index || containerElement.dataset?.index
      );

      this.activeStepperIndex = targetBtnIndex;

      this.makeStepperInActive();
      this.makeStepperActive(target, containerElement);
    }
  }

  private defaultSettings() {
    document.querySelector(".stepper[data-index='1']")?.classList.add("active");

    document.querySelector("#prevBtn")?.setAttribute("disabled", "true");
  }

  private makeStepperActive(
    target: HTMLElement,
    containerElement: HTMLElement
  ) {
    if (target?.tagName?.toLowerCase() === "span") {
      containerElement?.classList?.toggle("active");
    }
  }

  private makeStepperInActive() {
    if (this.allStepperBtns?.length) {
      this.allStepperBtns?.forEach(ele => {
        const activeBtnIndex = Number((ele as HTMLElement)?.dataset?.index);

        if (activeBtnIndex != this.activeStepperIndex) {
          ele.classList.remove("active");
        }
      });
    }
  }
}

/**
 * @class
 * Responsible for rendering elements. Just UI
 */

class View {
  private mainElement: HtmlElementType = null;
  constructor(public content: string[]) {
    this.content = content;
    this.mainElement = document.querySelector("main");

    this.createRootElement();
  }

  private createRootElement() {
    const section = document.createElement("section");
    section.className = `mx-auto flex flex-col gap-6 relative`;
    section.style.width = `${this.content.length * 300}px`;

    this.mainElement?.append(section);
    this.renderStepper(section);
    this.renderNextPrevBtns(section);

    new Controller(section);
  }

  private renderStepBtn() {
    let result = ``;
    let i = 1;

    for (const item of this.content) {
      const isLastStepper = i === this.content.length;
      result += `
      <div data-index=${i} class="relative stepper ${
        !isLastStepper && "stepperLine"
      }">
        <button  class=" bg-[#ebebeb] relative flex items-center z-10 pr-1 font-semibold cursor-pointer ${
          i != 1 && "pl-2"
        }">
            <span
              class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center"
              >${i}</span
            >
            <span class="pl-2">${item}</span>
          </button>
      </div>   
        `;
      i++;
    }

    return result;
  }

  private renderStepper(section: HTMLElement) {
    section.innerHTML = `
        <div class="grid justify-between items-center w-full" style="grid-template-columns:repeat(3,1fr)">
          ${this.renderStepBtn()}
        </div>
    `;
  }

  private renderNextPrevBtns(section: HTMLElement) {
    section.innerHTML += `
    <div class="flex justify-between items-center mr-40">
          <button class="border-2 text-teal-600 px-8 py-2 cursor-pointer border-teal-700 disabled:cursor-not-allowed disabled:opacity-20" id="prevBtn">
            Prev
          </button>
          <button class="border-2 text-teal-600 px-8 py-2 cursor-pointer border-teal-700 disabled:cursor-not-allowed disabled:opacity-20" id="nextBtn">
            Next
          </button>
    </div>
    `;
  }
}

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

new View(steps);
