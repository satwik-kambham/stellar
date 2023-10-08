import { expect, test } from 'vitest'
import Cursor from '../../src/text_editor/cursor.ts'

test('basic constructor', () => {
  const cursor = new Cursor()
  expect(cursor.line.value).toBe(1)
  expect(cursor.column.value).toBe(1)
})

test('constructor with arguments', () => {
  const cursor = new Cursor(5, 8)
  expect(cursor.line.value).toBe(5)
  expect(cursor.column.value).toBe(8)
})

test('constructor with invalid arguments', () => {
  expect(() => new Cursor(-5, 8)).toThrowError()
  expect(() => new Cursor(5, 0)).toThrowError()
})

test('update cursor', () => {
  const cursor = new Cursor(5, 8)
  cursor.update(7, 9)
  expect(cursor.line.value).toBe(7)
  expect(cursor.column.value).toBe(9)
})

test('update cursor with invalid arguments', () => {
  const cursor = new Cursor(5, 8)
  expect(() => cursor.update(-7, -9)).toThrowError()
  expect(() => cursor.update(0, 0)).toThrowError()
})

test('offset cursor', () => {
  const cursor = new Cursor(5, 8)
  cursor.offset(7, -3)
  expect(cursor.line.value).toBe(5 + 7)
  expect(cursor.column.value).toBe(8 - 3)
})

test('offset cursor with invalid arguments', () => {
  const cursor = new Cursor(5, 8)
  expect(() => cursor.offset(-7, -9)).toThrowError()
  expect(() => cursor.offset(-5, 1)).toThrowError()
})
