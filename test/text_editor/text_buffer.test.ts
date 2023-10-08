import { expect, test } from 'vitest'
import TextBuffer from '../../src/text_editor/text_buffer.ts'

test('basic constructor', () => {
  const buffer = new TextBuffer()
  expect(buffer.content.value).toStrictEqual([""])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(1)
})

test('update line - 1', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(2, 2)
  buffer.update_line("xyza")
  expect(buffer.content.value).toStrictEqual(["abc", "xyza", "ghi"])
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(2)
})

test('update line - 2', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(2, 4)
  buffer.update_line("xy", 1)
  expect(buffer.content.value).toStrictEqual(["xy", "def", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(3)
})

test('update line - 3', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(2, 2)
  buffer.update_line("xyza", 4)
  expect(buffer.content.value).toStrictEqual(["abc", "def", "ghi", "xyza"])
  expect(buffer.cursor.line.value).toBe(4)
  expect(buffer.cursor.column.value).toBe(5)
})

test('update line - 4', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(2, 2)
  buffer.update_line("", 6)
  expect(buffer.content.value).toStrictEqual(["abc", "def", "ghi", ""])
  expect(buffer.cursor.line.value).toBe(4)
  expect(buffer.cursor.column.value).toBe(1)
})

test('append at cursor', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(2, 2)
  buffer.append_at_cursor("xyza")
  expect(buffer.content.value).toStrictEqual(["abc", "dxyzaef", "ghi"])
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(6)
})

test('remove char when cursor at 1, 1', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(1, 1)
  buffer.pop()
  expect(buffer.content.value).toStrictEqual(["abc", "def", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(1)
})

test('remove last char in line', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(1, 4)
  buffer.pop()
  expect(buffer.content.value).toStrictEqual(["ab", "def", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(3)
})

test('remove single char before cursor', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 3)
  buffer.pop()
  expect(buffer.content.value).toStrictEqual(["abc", "xza", "ghi"])
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(2)
})

test('remove empty line', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "", "ghi"]
  buffer.cursor.update(2, 1)
  buffer.pop()
  expect(buffer.content.value).toStrictEqual(["abc", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(4)
})

test('merge with prev line when removing char', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 1)
  buffer.pop()
  expect(buffer.content.value).toStrictEqual(["abcxyza", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(4)
})

test('move cursor left - 1', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 2)
  expect(buffer.move_cursor_left()).toBe(true)
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(1)
})

test('move cursor left - 2', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(1, 1)
  expect(buffer.move_cursor_left()).toBe(false)
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(1)
})

test('move cursor left - 3', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 1)
  expect(buffer.move_cursor_left()).toBe(true)
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(4)
})

test('move cursor right - 1', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 2)
  expect(buffer.move_cursor_right()).toBe(true)
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(3)
})

test('move cursor right - 2', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(3, 4)
  expect(buffer.move_cursor_right()).toBe(false)
  expect(buffer.cursor.line.value).toBe(3)
  expect(buffer.cursor.column.value).toBe(4)
})

test('move cursor right - 3', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 5)
  expect(buffer.move_cursor_right()).toBe(true)
  expect(buffer.cursor.line.value).toBe(3)
  expect(buffer.cursor.column.value).toBe(1)
})

test('remove char after cursor at EOF', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "def", "ghi"]
  buffer.cursor.update(3, 4)
  buffer.remove_after_cursor()
  expect(buffer.content.value).toStrictEqual(["abc", "def", "ghi"])
  expect(buffer.cursor.line.value).toBe(3)
  expect(buffer.cursor.column.value).toBe(4)
})

test('remove single char after cursor', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 3)
  buffer.remove_after_cursor()
  expect(buffer.content.value).toStrictEqual(["abc", "xya", "ghi"])
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(3)
})

test('remove empty line.value', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "", "ghi"]
  buffer.cursor.update(1, 4)
  buffer.remove_after_cursor()
  expect(buffer.content.value).toStrictEqual(["abc", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(4)
})

test('merge with prev line.value when removing char', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(1, 4)
  buffer.remove_after_cursor()
  expect(buffer.content.value).toStrictEqual(["abcxyza", "ghi"])
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(4)
})

test('remove single char at start of line', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 1)
  buffer.remove_after_cursor()
  expect(buffer.content.value).toStrictEqual(["abc", "yza", "ghi"])
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(1)
})

test('move cursor up - 1', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abcdef", "xyza", "ghi"]
  buffer.cursor.update(2, 2)
  expect(buffer.move_cursor_up()).toBe(true)
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(2)
})

test('move cursor up - 2', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(2, 5)
  expect(buffer.move_cursor_up()).toBe(true)
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(4)
})

test('move cursor up - 3', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(1, 1)
  expect(buffer.move_cursor_up()).toBe(false)
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(1)
})

test('move cursor up - 4', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(1, 3)
  expect(buffer.move_cursor_up()).toBe(true)
  expect(buffer.cursor.line.value).toBe(1)
  expect(buffer.cursor.column.value).toBe(1)
})

test('move cursor down - 1', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abcdef", "xyza", "ghi"]
  buffer.cursor.update(2, 2)
  expect(buffer.move_cursor_down()).toBe(true)
  expect(buffer.cursor.line.value).toBe(3)
  expect(buffer.cursor.column.value).toBe(2)
})

test('move cursor down - 2', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abcdef", "xyza", "ghi"]
  buffer.cursor.update(1, 7)
  expect(buffer.move_cursor_down()).toBe(true)
  expect(buffer.cursor.line.value).toBe(2)
  expect(buffer.cursor.column.value).toBe(5)
})

test('move cursor down - 3', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(3, 4)
  expect(buffer.move_cursor_down()).toBe(false)
  expect(buffer.cursor.line.value).toBe(3)
  expect(buffer.cursor.column.value).toBe(4)
})

test('move cursor down - 4', () => {
  const buffer = new TextBuffer()
  buffer.content.value = ["abc", "xyza", "ghi"]
  buffer.cursor.update(3, 2)
  expect(buffer.move_cursor_down()).toBe(true)
  expect(buffer.cursor.line.value).toBe(3)
  expect(buffer.cursor.column.value).toBe(4)
})
