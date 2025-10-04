import { describe, expect, test } from 'vitest'

import { reducer } from './cartData.hook'

describe('reducer', () => {
  test('must increment ', () => {
    const prev = { id1: 2, id2: 3 }
    const next = reducer(prev, 'id1', 1)
    expect(next).toEqual({ id1: 3, id2: 3 })
  })
  test('must increment twice ', () => {
    const prev = { id1: 2, id2: 3 }
    const next1 = reducer(prev, 'id1', 1)
    const next2 = reducer(next1, 'id1', 1)
    expect(next2).toEqual({ id1: 4, id2: 3 })
  })
  test('must decrement ', () => {
    const prev = { id1: 2, id2: 3 }
    const next = reducer(prev, 'id1', -1)
    expect(next).toEqual({ id1: 1, id2: 3 })
  })
  test('must decrement twice ', () => {
    const prev = { id1: 2, id2: 3 }
    const next1 = reducer(prev, 'id1', -1)
    const next2 = reducer(next1, 'id1', -1)
    expect(next2).toEqual({ id1: 0, id2: 3 })
  })
  test('must not decrement below zero ', () => {
    const prev = { id1: 0 }
    const next = reducer(prev, 'id1', -1)
    expect(next).toEqual({ id1: 0 })
  })
  test('must create an id if it does not exist on increment ', () => {
    const prev = {}
    const next = reducer(prev, 'id3', 1)
    expect(next).toEqual({ id3: 1 })
  })
  test('must create an id if it does not exist on decrement ', () => {
    const prev = {}
    const next = reducer(prev, 'id3', -1)
    expect(next).toEqual({ id3: 0 })
  })
})
