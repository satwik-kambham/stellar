import { ref } from 'vue'
import { expect, test } from 'vitest'
import TextBuffer from '../../src/text_editor/text_buffer.ts'

test('basic constructor', () => {
  const buffer = ref(new TextBuffer())
  expect(buffer.value.content).toStrictEqual([""])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(1)
})

test('update line - 1', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(2, 2)
  buffer.value.update_line("xyza")
  expect(buffer.value.content).toStrictEqual(["abc", "xyza", "ghi"])
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(2)
})

test('update line - 2', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(2, 4)
  buffer.value.update_line("xy", 1)
  expect(buffer.value.content).toStrictEqual(["xy", "def", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(3)
})

test('update line - 3', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(2, 2)
  buffer.value.update_line("xyza", 4)
  expect(buffer.value.content).toStrictEqual(["abc", "def", "ghi", "xyza"])
  expect(buffer.value.cursor.line).toBe(4)
  expect(buffer.value.cursor.column).toBe(5)
})

test('update line - 4', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(2, 2)
  buffer.value.update_line("", 6)
  expect(buffer.value.content).toStrictEqual(["abc", "def", "ghi", ""])
  expect(buffer.value.cursor.line).toBe(4)
  expect(buffer.value.cursor.column).toBe(1)
})

test('append at cursor', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(2, 2)
  buffer.value.append_at_cursor("xyza")
  expect(buffer.value.content).toStrictEqual(["abc", "dxyzaef", "ghi"])
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(6)
})

test('remove char when cursor at 1, 1', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(1, 1)
  buffer.value.pop()
  expect(buffer.value.content).toStrictEqual(["abc", "def", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(1)
})

test('remove last char in line', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(1, 4)
  buffer.value.pop()
  expect(buffer.value.content).toStrictEqual(["ab", "def", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(3)
})

test('remove single char before cursor', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 3)
  buffer.value.pop()
  expect(buffer.value.content).toStrictEqual(["abc", "xza", "ghi"])
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(2)
})

test('remove empty line', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "", "ghi"]
  buffer.value.cursor.update(2, 1)
  buffer.value.pop()
  expect(buffer.value.content).toStrictEqual(["abc", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(4)
})

test('merge with prev line when removing char', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 1)
  buffer.value.pop()
  expect(buffer.value.content).toStrictEqual(["abcxyza", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(4)
})

test('move cursor left - 1', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 2)
  expect(buffer.value.move_cursor_left()).toBe(true)
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(1)
})

test('move cursor left - 2', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(1, 1)
  expect(buffer.value.move_cursor_left()).toBe(false)
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(1)
})

test('move cursor left - 3', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 1)
  expect(buffer.value.move_cursor_left()).toBe(true)
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(4)
})

test('move cursor right - 1', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 2)
  expect(buffer.value.move_cursor_right()).toBe(true)
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(3)
})

test('move cursor right - 2', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(3, 4)
  expect(buffer.value.move_cursor_right()).toBe(false)
  expect(buffer.value.cursor.line).toBe(3)
  expect(buffer.value.cursor.column).toBe(4)
})

test('move cursor right - 3', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 5)
  expect(buffer.value.move_cursor_right()).toBe(true)
  expect(buffer.value.cursor.line).toBe(3)
  expect(buffer.value.cursor.column).toBe(1)
})

test('remove char after cursor at EOF', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "def", "ghi"]
  buffer.value.cursor.update(3, 4)
  buffer.value.remove_after_cursor()
  expect(buffer.value.content).toStrictEqual(["abc", "def", "ghi"])
  expect(buffer.value.cursor.line).toBe(3)
  expect(buffer.value.cursor.column).toBe(4)
})

test('remove single char after cursor', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 3)
  buffer.value.remove_after_cursor()
  expect(buffer.value.content).toStrictEqual(["abc", "xya", "ghi"])
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(3)
})

test('remove empty line', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "", "ghi"]
  buffer.value.cursor.update(1, 4)
  buffer.value.remove_after_cursor()
  expect(buffer.value.content).toStrictEqual(["abc", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(4)
})

test('merge with prev line when removing char', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(1, 4)
  buffer.value.remove_after_cursor()
  expect(buffer.value.content).toStrictEqual(["abcxyza", "ghi"])
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(4)
})

test('remove single char at start of line', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 1)
  buffer.value.remove_after_cursor()
  expect(buffer.value.content).toStrictEqual(["abc", "yza", "ghi"])
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(1)
})

test('move cursor up - 1', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abcdef", "xyza", "ghi"]
  buffer.value.cursor.update(2, 2)
  expect(buffer.value.move_cursor_up()).toBe(true)
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(2)
})

test('move cursor up - 2', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(2, 5)
  expect(buffer.value.move_cursor_up()).toBe(true)
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(4)
})

test('move cursor up - 3', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(1, 1)
  expect(buffer.value.move_cursor_up()).toBe(false)
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(1)
})

test('move cursor up - 4', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(1, 3)
  expect(buffer.value.move_cursor_up()).toBe(true)
  expect(buffer.value.cursor.line).toBe(1)
  expect(buffer.value.cursor.column).toBe(1)
})

test('move cursor down - 1', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abcdef", "xyza", "ghi"]
  buffer.value.cursor.update(2, 2)
  expect(buffer.value.move_cursor_down()).toBe(true)
  expect(buffer.value.cursor.line).toBe(3)
  expect(buffer.value.cursor.column).toBe(2)
})

test('move cursor down - 2', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abcdef", "xyza", "ghi"]
  buffer.value.cursor.update(1, 7)
  expect(buffer.value.move_cursor_down()).toBe(true)
  expect(buffer.value.cursor.line).toBe(2)
  expect(buffer.value.cursor.column).toBe(5)
})

test('move cursor down - 3', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(3, 4)
  expect(buffer.value.move_cursor_down()).toBe(false)
  expect(buffer.value.cursor.line).toBe(3)
  expect(buffer.value.cursor.column).toBe(4)
})

test('move cursor down - 4', () => {
  const buffer = ref(new TextBuffer())
  buffer.value.content = ["abc", "xyza", "ghi"]
  buffer.value.cursor.update(3, 2)
  expect(buffer.value.move_cursor_down()).toBe(true)
  expect(buffer.value.cursor.line).toBe(3)
  expect(buffer.value.cursor.column).toBe(4)
})
