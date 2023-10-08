export default class InputHandler {
  constructor(buffer) {
    this.buffer = buffer
  }

  handle_keydown(key) {
    if (key.length == 1) {
      this.buffer.append_at_cursor(key)
    } else if (key == "Enter") {
      this.buffer.update_line("", this.buffer.cursor.line.value + 1)
    } else if (key == "Backspace") {
      this.buffer.pop()
    } else if (key == "Delete") {
      this.buffer.remove_after_cursor()
    } else if (key == "ArrowLeft") {
      this.buffer.move_cursor_left()
    } else if (key == "ArrowRight") {
      this.buffer.move_cursor_right()
    } else if (key == "ArrowUp") {
      this.buffer.move_cursor_up()
    } else if (key == "ArrowDown") {
      this.buffer.move_cursor_down()
    }
  }
}
