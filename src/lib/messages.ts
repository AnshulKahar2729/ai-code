import { CodeSchema } from "@/lib/schema";
import { DeepPartial } from "ai";
import { ExecutionResult } from "./types";

export type MessageText = {
  type: "text";
  text: string;
};

export type MessageCode = {
  type: "code";
  code: string;
};

export type MessageImage = {
  role: "image";
  image: string;
};

export type Message = {
  role: "assistant" | "user";
  content: Array<MessageText | MessageCode | MessageImage>;
  object?: DeepPartial<CodeSchema>;
  result?: ExecutionResult;
};
