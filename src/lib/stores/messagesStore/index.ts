import MessageManager from "./MessageManager";

export function messagesStore(message: string) {
  MessageManager.getInstance().createMessage(message);
}