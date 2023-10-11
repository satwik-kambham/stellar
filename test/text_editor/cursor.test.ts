import { ref } from 'vue'
import { expect, test } from 'vitest'
import Cursor from '../../src/text_editor/cursor.ts'

test('basic constructor', () => {
  const cursor = ref(new Cursor())
  expect(cursor.value.line).toBe(1)
  expect(cursor.value.column).toBe(1)
})

test('constructor with arguments', () => {
  const cursor = ref(new Cursor(5, 8))
  expect(cursor.value.line).toBe(5)
  expect(cursor.value.column).toBe(8)
})

test('constructor with invalid arguments', () => {
  expect(() => new Cursor(-5, 8)).toThrowError()
  expect(() => new Cursor(5, 0)).toThrowError()
})

test('update cursor', () => {
  const cursor = ref(new Cursor(5, 8))
  cursor.value.update(7, 9)
  expect(cursor.value.line).toBe(7)
  expect(cursor.value.column).toBe(9)
})

test('update cursor with invalid arguments', () => {
  const cursor = ref(new Cursor(5, 8))
  expect(() => cursor.value.update(-7, -9)).toThrowError()
  expect(() => cursor.value.update(0, 0)).toThrowError()
})

test('offset cursor', () => {
  const cursor = ref(new Cursor(5, 8))
  cursor.value.offset(7, -3)
  expect(cursor.value.line).toBe(5 + 7)
  expect(cursor.value.column).toBe(8 - 3)
})

test('offset cursor with invalid arguments', () => {
  const cursor = ref(new Cursor(5, 8))
  expect(() => cursor.value.offset(-7, -9)).toThrowError()
  expect(() => cursor.value.offset(-5, 1)).toThrowError()
})
