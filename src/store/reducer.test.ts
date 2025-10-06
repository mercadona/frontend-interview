import { describe, expect, test } from 'vitest'

import { reducer } from './cartData.hook'
import { Action } from './cartData.type'

describe('reducer', () => {
  test('must increment ', () => {
    const prev = { id1: 2, id2: 3 }
    const action: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: 1 },
    }
    const next = reducer(prev, action)
    expect(next).toEqual({ id1: 3, id2: 3 })
  })
  test('must increment twice ', () => {
    const prev = { id1: 2, id2: 3 }
    const action1: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: 1 },
    }
    const next1 = reducer(prev, action1)
    const action2: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: 1 },
    }
    const next2 = reducer(next1, action2)
    expect(next2).toEqual({ id1: 4, id2: 3 })
  })
  test('must decrement ', () => {
    const prev = { id1: 2, id2: 3 }
    const action: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: -1 },
    }
    const next = reducer(prev, action)
    expect(next).toEqual({ id1: 1, id2: 3 })
  })
  test('must decrement twice ', () => {
    const prev = { id1: 2, id2: 3 }
    const action1: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: -1 },
    }
    const next1 = reducer(prev, action1)
    const action2: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: -1 },
    }
    const next2 = reducer(next1, action2)
    expect(next2).toEqual({ id1: 0, id2: 3 })
  })
  test('must not decrement below zero ', () => {
    const prev = { id1: 0 }
    const action: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id1', increment: -1 },
    }
    const next = reducer(prev, action)
    expect(next).toEqual({ id1: 0 })
  })
  test('must create an id if it does not exist on increment ', () => {
    const prev = {}
    const action: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id3', increment: 1 },
    }
    const next = reducer(prev, action)
    expect(next).toEqual({ id3: 1 })
  })
  test('must create an id if it does not exist on decrement ', () => {
    const prev = {}
    const action: Action = {
      type: 'UPDATE_CART',
      payload: { id: 'id3', increment: -1 },
    }
    const next = reducer(prev, action)
    expect(next).toEqual({ id3: 0 })
  })
})
