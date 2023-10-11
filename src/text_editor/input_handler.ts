export default class InputHandler {
  constructor(buffer) {
    this.buffer = buffer;
    // this.buffer.append_at_cursor("ABCD")
    // console.log(this.buffer);

  }

  handle_keydown(key) {
    if (key.length == 1) {
      this.buffer.value.append_at_cursor(key);
    } else if (key == "Enter") {
      this.buffer.value.update_line("", this.buffer.value.cursor.line + 1);
    } else if (key == "Backspace") {
      this.buffer.value.pop();
    } else if (key == "Delete") {
      this.buffer.value.remove_after_cursor();
    } else if (key == "ArrowLeft") {
      this.buffer.value.move_cursor_left();
    } else if (key == "ArrowRight") {
      this.buffer.value.move_cursor_right();
    } else if (key == "ArrowUp") {
      this.buffer.value.move_cursor_up();
    } else if (key == "ArrowDown") {
      this.buffer.value.move_cursor_down();
    }
  }
}
