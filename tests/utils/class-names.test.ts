import { classNames } from '../../src/utils/class-names'

describe('classNames', () => {
  it('handles string inputs', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar')
    expect(classNames('foo', '', 'bar')).toBe('foo bar')
  })

  it('handles object inputs', () => {
    expect(classNames({ foo: true, bar: false })).toBe('foo')
    expect(classNames('base', { 'modifier': true })).toBe('base modifier')
  })

  it('handles array inputs', () => {
    expect(classNames(['foo', 'bar'])).toBe('foo bar')
    expect(classNames('base', ['foo', { bar: true }])).toBe('base foo bar')
  })

  it('handles mixed inputs', () => {
    expect(classNames(
      'base',
      { modifier: true, hidden: false },
      ['extra', 'classes'],
      null,
      undefined
    )).toBe('base modifier extra classes')
  })

  it('handles numbers', () => {
    expect(classNames(1, 2, 'foo')).toBe('1 2 foo')
  })
})
