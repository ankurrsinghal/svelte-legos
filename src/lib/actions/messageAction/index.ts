import { eventListenerStore } from "$lib/stores/eventListenerStore";
import MessageManager from "./MessageManager";

interface MessageActionParams {
  message: string;
}

export function messageAction<T extends HTMLElement>(
  node: T,
  params: MessageActionParams
) {
  let stop: () => void;

  const destroy = () => {
    stop && stop();
  };

  const update = (params: MessageActionParams) => {
    destroy();
    function handleClick() {
      MessageManager.getInstance().createMessage(params.message);
    }

    ({ stop } = eventListenerStore("click", handleClick, node));
  };

  update(params);

  return {
    update,
    destroy,
  };
}
