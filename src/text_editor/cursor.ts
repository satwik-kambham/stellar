import { ref } from 'vue'

export default class Cursor {
  constructor(line = 1, column = 1) {
    if (line < 1 || column < 1)
      throw new Error("Cursor indexing starts from (1, 1)")
    this.line = ref(line)
    this.column = ref(column)
  }

  update(line, column) {
    if (line < 1 || column < 1)
      throw new Error("Cursor indexing starts from (1, 1)")
    this.line = line
    this.column = column
  }

  offset(line_offset, column_offset) {
    if (this.line + line_offset < 1 || this.column + column_offset < 1)
      throw new Error("Cursor indexing starts from (1, 1)")
    this.line += line_offset
    this.column += column_offset
  }
}
