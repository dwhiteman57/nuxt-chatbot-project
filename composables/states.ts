import { type IMessage } from "~/interfaces/IMessage";

export const useIsChatting = () => useState("isChatting", () => false);
export const useMessages = () => useState<IMessage[]>("messages", () => []);