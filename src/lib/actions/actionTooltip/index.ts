import { useHover } from "$lib/hooks/useHover";
import { useReadable } from "$lib/hooks/useReadable";

class Tooltip<T extends HTMLElement> {
  contents: string;
  private anchorRect: DOMRect;
  private __container: HTMLDivElement;

  constructor(contents: string, anchor: T) {
    this.contents = contents;
    this.anchorRect = anchor.getBoundingClientRect();
    this.__container = document.createElement('div');;
    this.init();
  }

  private init() {
    this.__container.style.setProperty('position', 'absolute');
    this.__container.style.setProperty('top', '0px');
    this.__container.style.setProperty('left', '0px');
    this.__container.style.setProperty('z-index', '100000');
    this.__container.style.setProperty('background-color', 'black');
    this.__container.style.setProperty('color', 'white');
    this.__container.style.setProperty('padding', '5px 15px');
    this.__container.style.setProperty('border-radius', '4px');
    this.__container.style.setProperty('opacity', '0');
    this.__container.style.setProperty('visibility', 'hidden');
    this.__container.style.setProperty('transition', 'opacity .2s, visibility .2s');
    this.__container.style.setProperty('font-size', '12px');

    this.__container.textContent = this.contents;

    this.mount();
    this.position();
  }

  private mount() {
    document.body.appendChild(this.__container);
  }

  private position() {
    this.__container.style.setProperty('top', (this.anchorRect.top + window.scrollY - this.anchorRect.height - 10) + 'px');
    this.__container.style.setProperty('left', this.anchorRect.left + 'px');
  }

  show() {
    this.__container.style.setProperty('opacity', '1');
    this.__container.style.setProperty('visibility', 'visible');
  }

  hide() {
    this.__container.style.setProperty('opacity', '0');
    this.__container.style.setProperty('visibility', 'hidden');
  }

  unmount() {
    this.__container.remove();
  }
}

export function actionTooltip<T extends HTMLElement>(node: T, content: string) {
  
  const tooltip = new Tooltip(content, node);

  const unsub = useReadable(useHover(node), hover => {
    if (hover) tooltip.show();
    else tooltip.hide();
  });

  return {
    destroy() {
      tooltip.unmount();
      unsub();
    },
  };
}
