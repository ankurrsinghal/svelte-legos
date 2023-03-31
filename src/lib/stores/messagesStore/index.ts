import type { MessageType } from "./Message";
import MessageManager from "./MessageManager";

export function messagesStore(message: string, type?: MessageType) {
	MessageManager.getInstance().createMessage(message, type);
}
