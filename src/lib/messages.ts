export type MessageText =  {
    type : "text";
    text : string;
}

export type MessageCode =  {
    type : "code";
    code : string;
}

export type MessageImage = {
    role : "image";
    image : string;
}

export type Message = {
    role : "assistant" | "user";
    content : Array<MessageText | MessageCode | MessageImage>;
}