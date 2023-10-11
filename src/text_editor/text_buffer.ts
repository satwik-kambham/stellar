import { ref } from 'vue'
import Cursor from "./cursor.ts"

export default class TextBuffer {
  constructor(content="") {
    this.cursor = new Cursor()
    this.content = ref(content.split('\n'))
  }

  updateContent(newContent) {
    this.cursor.update(1, 1)
    this.content = newContent.split('\n')
  }

  update_line(new_line, line_number=null) {
    if (!line_number) line_number = this.cursor.line

    if (line_number > this.content.length) {
      this.content.push(new_line)
      this.cursor.update(this.content.length, new_line.length + 1)
    } else {
      this.content[line_number - 1] = new_line
      this.cursor.update(line_number, Math.min(this.cursor.column, new_line.length + 1))
    }
  }

  append_at_cursor(str) {
    // TODO: Handle adding multiple lines at cursor
    const before = this.content[this.cursor.line - 1].slice(0, this.cursor.column - 1)
    const after = this.content[this.cursor.line - 1].slice(this.cursor.column - 1)
    this.update_line(before + str + after, null)
    this.cursor.offset(0, str.length)
  }

  pop() {
    // TODO: Handle removing multiple chars and lines
    if (this.cursor.column == 1 && this.cursor.line == 1) {
      return
    }

    if (this.cursor.column == 1) {
      this.cursor.column = this.content[this.cursor.line - 2].length + 1
      this.content[this.cursor.line - 2] += this.content[this.cursor.line - 1]
      this.content.splice(this.cursor.line - 1, 1)
      this.cursor.offset(-1, 0)
    } else {
      const before = this.content[this.cursor.line - 1].slice(0, this.cursor.column - 2)
      const after = this.content[this.cursor.line - 1].slice(this.cursor.column - 1)
      const column = this.cursor.column
      this.update_line(before + after)
      this.cursor.column = column - 1
    }
  }

  move_cursor_left() {
    if (this.cursor.column == 1) {
      if (this.cursor.line != 1) {
        this.cursor.line -= 1
        this.cursor.column = this.content[this.cursor.line - 1].length + 1
        return true
      }
    } else {
      this.cursor.column -= 1
      return true
    }
    return false
  }

  move_cursor_right() {
    if (this.cursor.column == this.content[this.cursor.line - 1].length + 1) {
      if (this.cursor.line != this.content.length) {
        this.cursor.line += 1
        this.cursor.column = 1
        return true
      }
    } else {
      this.cursor.column += 1
      return true
    }
    return false
  }

  remove_after_cursor() {
    if (this.move_cursor_right()) this.pop()
  }

  move_cursor_up() {
    if (this.cursor.line != 1) {
      this.cursor.line -= 1
      if (this.content[this.cursor.line - 1].length < this.cursor.column) {
        this.cursor.column = this.content[this.cursor.line - 1].length + 1
      }
      return true
    } else {
      if (this.cursor.column == 1) return false
      this.cursor.column = 1
      return true
    }
  }

  move_cursor_down() {
    if (this.cursor.line != this.content.length) {
      this.cursor.line += 1
      if (this.content[this.cursor.line - 1].length < this.cursor.column) {
        this.cursor.column = this.content[this.cursor.line - 1].length + 1
      }
    } else {
      if (this.cursor.column == this.content[this.cursor.line - 1].length + 1)
        return false
      this.cursor.column = this.content[this.cursor.line - 1].length + 1
    }
    return true
  }
}
