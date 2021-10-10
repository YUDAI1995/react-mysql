module.exports = class Todo {
  id;
  text;
  isDone;
  constructor(id, text, isDone) {
    this.id = id;
    this.text = text;
    this.isDone = isDone;
  }
}
