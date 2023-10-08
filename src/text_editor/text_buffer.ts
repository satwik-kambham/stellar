import { ref } from 'vue'
import Cursor from "./cursor.ts"

export default class TextBuffer {
  constructor() {
    this.cursor = new Cursor()
    this.content = ref([""])
  }

  update_line(new_line, line_number=null) {
    if (!line_number) line_number = this.cursor.line.value

    if (line_number > this.content.value.length) {
      this.content.value.push(new_line)
      this.cursor.update(this.content.value.length, new_line.length + 1)
    } else {
      this.content.value[line_number - 1] = new_line
      this.cursor.update(line_number, Math.min(this.cursor.column.value, new_line.length + 1))
    }
  }

  append_at_cursor(str) {
    // TODO: Handle adding multiple lines at cursor
    const before = this.content.value[this.cursor.line.value - 1].slice(0, this.cursor.column.value - 1)
    const after = this.content.value[this.cursor.line.value - 1].slice(this.cursor.column.value - 1)
    this.update_line(before + str + after, null)
    this.cursor.offset(0, str.length)
  }

  pop() {
    // TODO: Handle removing multiple chars and lines
    if (this.cursor.column.value == 1 && this.cursor.line.value == 1) {
      return
    }

    if (this.cursor.column.value == 1) {
      this.cursor.column.value = this.content.value[this.cursor.line.value - 2].length + 1
      this.content.value[this.cursor.line.value - 2] += this.content.value[this.cursor.line.value - 1]
      this.content.value.splice(this.cursor.line.value - 1, 1)
      this.cursor.offset(-1, 0)
    } else {
      const before = this.content.value[this.cursor.line.value - 1].slice(0, this.cursor.column.value - 2)
      const after = this.content.value[this.cursor.line.value - 1].slice(this.cursor.column.value - 1)
      const column = this.cursor.column.value
      this.update_line(before + after)
      this.cursor.column.value = column - 1
    }
  }

  move_cursor_left() {
    if (this.cursor.column.value == 1) {
      if (this.cursor.line.value != 1) {
        this.cursor.line.value -= 1
        this.cursor.column.value = this.content.value[this.cursor.line.value - 1].length + 1
        return true
      }
    } else {
      this.cursor.column.value -= 1
      return true
    }
    return false
  }

  move_cursor_right() {
    if (this.cursor.column.value == this.content.value[this.cursor.line.value - 1].length + 1) {
      if (this.cursor.line.value != this.content.value.length) {
        this.cursor.line.value += 1
        this.cursor.column.value = 1
        return true
      }
    } else {
      this.cursor.column.value += 1
      return true
    }
    return false
  }

  remove_after_cursor() {
    if (this.move_cursor_right()) this.pop()
  }

  move_cursor_up() {
    if (this.cursor.line.value != 1) {
      this.cursor.line.value -= 1
      if (this.content.value[this.cursor.line.value - 1].length < this.cursor.column.value) {
        this.cursor.column.value = this.content.value[this.cursor.line.value - 1].length + 1
      }
      return true
    } else {
      if (this.cursor.column.value == 1) return false
      this.cursor.column.value = 1
      return true
    }
  }

  move_cursor_down() {
    if (this.cursor.line.value != this.content.value.length) {
      this.cursor.line.value += 1
      if (this.content.value[this.cursor.line.value - 1].length < this.cursor.column.value) {
        this.cursor.column.value = this.content.value[this.cursor.line.value - 1].length + 1
      }
    } else {
      if (this.cursor.column.value == this.content.value[this.cursor.line.value - 1].length + 1)
        return false
      this.cursor.column.value = this.content.value[this.cursor.line.value - 1].length + 1
    }
    return true
  }
}
