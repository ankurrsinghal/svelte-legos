import { defaultDocument } from "$lib/shared";
import { eventListenerStore } from "$lib/stores/eventListenerStore";

type FunctionMap = [
  "requestFullscreen",
  "exitFullscreen",
  "fullscreenElement",
  "fullscreenEnabled",
  "fullscreenchange",
  "fullscreenerror"
];

// from: https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
const functionsMap: FunctionMap[] = [
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenchange",
    "fullscreenerror",
  ],
  // New WebKit
  [
    "webkitRequestFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror",
  ],
  // Safari iOS WebKit
  [
    "webkitEnterFullscreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    "webkitfullscreenchange",
    "webkitfullscreenerror",
  ],
  // Old WebKit
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    "webkitfullscreenchange",
    "webkitfullscreenerror",
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    "mozfullscreenchange",
    "mozfullscreenerror",
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    "MSFullscreenChange",
    "MSFullscreenError",
  ],
] as any;

export function fullScreenAction<T extends HTMLElement, P extends HTMLElement>(node: T, target?: P) {
  let stop: () => void;

  const destroy = () => {
    stop && stop();
  };

  const update = (target?: P) => {
    destroy();

    const document = defaultDocument;
    const mainTarget = target || document?.querySelector("html");
    let map: FunctionMap = functionsMap[0];
  
    let isSupported = false;
    if (mainTarget && document) {
      for (const m of functionsMap) {
        if (m[1] in document || (mainTarget && m[0] in mainTarget)) {
          map = m;
          isSupported = true;
          break;
        }
      }
    }
  
    const [REQUEST] = map;

    if (!isSupported) return;

    async function handleClick() {
      if (mainTarget) {
        await mainTarget[REQUEST]();
      }
    }

    ({ stop } = eventListenerStore("click", handleClick, node));
  };

  update(target);

  return {
    update,
    destroy,
  };
}
