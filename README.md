# array-extra-utils

A mostly drop in replacement for an array with extra features.

## Usage

`ArrayExtra` class extends the `Array` class, so it can be used everywhere that an array can be used. It implements every method that `Array` has while returning an `ArrayExtra` instead.

To create a new array using `ArrayExtra` you use the static method `of`.

```typescript
const arr = ArrayExtra.of(1, 2, 3)
```

## Typing

Unlike `Array` where generic is the array's item type, `ArrayExtra`'s generic is the whole array type which allows to make tuples using it, which is the default.

```typescript
const arr1 = [1, 2, 3] // type is number[]
const arr2 = [1, 2, 3] as [number, number, number] // type is [number, number, number]
const arr3 = Array.of(1, 2, 3) // type is number[]

const arr4 = ArrayExtra.of(1, 2, 3) // type is ArrayExtra<[number, number, number]>
const arr41 = arr4.toArray() // type is [number, number, number]
const arr5 = arrayExtra.of<number[]>(1, 2, 3) // type is ArrayExtra<number[]>
const arr51 = arr5.toArray() // type is number[]

const arr6 = arrayExtra.of(1, "a", 2) // type is ArrayExtra<[number, string, number]>
const arr7 = arrayExtra.of<[number, "a", number]>(1, "a", 2) // type is ArrayExtra<[number, "a", number]>
```

## The extra methods
<!-- ! Check if Array.isArray actually returns true -->
Checks if the object is an instance of `ArrayExtra`, also `Array.isArray` returns `true` for an instance of `ArrayExtra`.

```typescript
ArrayExtra.isArrayExtra()
```

Returns a copy of the array without item at the provided index, it can be negative to count from the end and when it goes beyound array's length, then it just returns a copy of the array.

```typescript
arr.without()
```

Returns a copy of the `ArrayExtra` but as an instance of `Array`.

```typescript
arr.toArray()
```

Returns a copy of the array with effect of `.unshift()`, not modifing the original array.

```typescript
arr.toUshifted()
```

Returns a copy of the array with effect of `.push()`, not modifing the original array.

```typescript
arr.toPushed()
```

Returns a copy of the array with effect of `.unshift()`, but before the provided index instead of the beggining of the array.

```typescript
arr.toUnshiftedIndex()
```

Returns a copy of the array with effect of `.push()`, but after the provided index instead of the end of the array.

```typescript
arr.toPushedIndex()
```

Normalizes by converting negative index to positive index and checking if it's in array bounds

```typescript
arr.normalizeIndex()
```

## Known issues

These methods have incorrect typing and don't return `ArrayExtra` correctly:

- `reduce`
- `reduceRight`
- `flat`
- `flatMap`

## Support

If you like the package, you can support me by buying me a tea.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E5Z3TEO)
