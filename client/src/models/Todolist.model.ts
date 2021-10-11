import { IsNotEmpty } from "class-validator";

export interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

export class TodoItem implements Todo {
  id: string;

  @IsNotEmpty()
  text: string;
  isDone: boolean;

  constructor(id: string, text: string, isDone: boolean) {
    this.id = id;
    this.text = text;
    this.isDone = isDone;
  }
}

export const getUniqueStr = (myStrong?: number) => {
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}