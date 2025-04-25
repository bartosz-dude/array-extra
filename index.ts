type InnerArray<T extends Array<unknown>> = T[number][]
// type FlatArrayExtra<Arr extends ArrayExtra<unknown[]>, Depth extends number> = {
//     done: Arr;
//     recur: Arr extends ArrayExtra<Array<infer I>> ? FlatArrayExtra<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]> : Arr;
// }[ Depth extends -1 ? "done" : "recur" ]

export class ArrayExtra<T extends Array<unknown>> extends Array<T[number]> {
	static of<T extends Array<unknown>>(...items: T) {
		const arr = new ArrayExtra<T>(items.length)

		for (let i = 0; i < items.length; i++) {
			arr[i] = items[i]
		}

		return arr
	}

	static isArrayExtra(arg: any) {
		return arg instanceof ArrayExtra
	}

	static from<T>(iterable: Iterable<T> | ArrayLike<T>): ArrayExtra<T[]> {
		return ArrayExtra.of(...super.from(iterable))
	}

	static async fromAsync(
		arrayLike:
			| AsyncIterable<unknown>
			| Iterable<unknown>
			| ArrayLike<unknown>
	): Promise<ArrayExtra<unknown[]>> {
		return ArrayExtra.of(...(await super.fromAsync(arrayLike)))
	}

	#normalizeIndex(index: number): number | undefined {
		if (this.length - 1 < index) {
			return undefined
		}

		if (index < 0) {
			const rightIndex = this.length + index

			if (rightIndex < 0) {
				return undefined
			}

			return rightIndex
		}

		return index
	}

	concat(
		...items: (T[number] | ConcatArray<T[number]>)[]
	): ArrayExtra<InnerArray<T>> {
		return ArrayExtra.of(...super.concat(...items))
	}

	filter<S extends T[number]>(
		predicate: (
			value: T[number],
			index: number,
			array: InnerArray<T>
		) => value is S,
		thisArg?: any
	): ArrayExtra<S[]> {
		return ArrayExtra.of(...super.filter(predicate, thisArg))
	}

	map<U>(
		callbackfn: (
			value: T[number],
			index: number,
			array: InnerArray<T>
		) => U,
		thisArg?: any
	): ArrayExtra<U[]> {
		return ArrayExtra.of(...super.map(callbackfn, thisArg))
	}

	// // @ts-expect-error
	// reduce<U>(
	// 	callbackfn: (
	// 		previousValue: U,
	// 		currentValue: T[number],
	// 		currentIndex: number,
	// 		array: InnerArray<T>
	// 	) => U,
	// 	initialValue: U
	// ): U extends unknown[] ? ArrayExtra<U> : U {
	// 	const red = super.reduce(callbackfn, initialValue)

	// 	if (Array.isArray(red)) {
	// 		// @ts-expect-error
	// 		return ArrayExtra.from(red)
	// 	}

	// 	// @ts-expect-error
	// 	return red
	// }

	// // @ts-expect-error
	// reduceRight<U>(
	// 	callbackfn: (
	// 		previousValue: U,
	// 		currentValue: T[number],
	// 		currentIndex: number,
	// 		array: InnerArray<T>
	// 	) => U,
	// 	initialValue: U
	// ): U extends unknown[] ? ArrayExtra<U> : U {
	// 	const red = super.reduceRight(callbackfn, initialValue)

	// 	if (Array.isArray(red)) {
	// 		// @ts-expect-error
	// 		return ArrayExtra.from(red)
	// 	}

	// 	// @ts-expect-error
	// 	return red
	// }

	reverse(): ArrayExtra<T> {
		super.reverse()
		return this
	}

	toReversed(): ArrayExtra<InnerArray<T>> {
		const arr = this.concat()
		arr.reverse()
		return arr
	}

	toSorted(
		compareFn?: ((a: T[number], b: T[number]) => number) | undefined
	): ArrayExtra<InnerArray<T>> {
		const arr = this.concat()
		arr.sort(compareFn)
		return arr
	}

	toSpliced(start: number, deleteCount?: number): ArrayExtra<InnerArray<T>>
	toSpliced(
		start: number,
		deleteCount: number,
		...items: unknown[]
	): ArrayExtra<InnerArray<T>>
	toSpliced(
		start: number,
		deleteCount: number,
		...items: unknown[]
	): ArrayExtra<InnerArray<T>> {
		const arr = this.concat()
		arr.splice(start, deleteCount, ...items)
		return arr
	}

	splice(start: number, deleteCount?: number): ArrayExtra<InnerArray<T>>
	splice(
		start: number,
		deleteCount: number,
		...items: unknown[]
	): ArrayExtra<InnerArray<T>>
	splice(
		start: number,
		deleteCount: number,
		...items: unknown[]
	): ArrayExtra<InnerArray<T>> {
		return ArrayExtra.from(super.splice(start, deleteCount, ...items))
	}

	with(index: number, value: T[number]): ArrayExtra<InnerArray<T>> {
		return ArrayExtra.from(super.with(index, value))
	}

	// flat<A, D extends number = 1>(
	// 	this: A,
	// 	depth?: D | undefined
	// ): ArrayExtra<FlatArray<A, D>[]> {
	// 	// @ts-expect-error
	// 	return ArrayExtra.from(super.flat(depth))
	// }

	/**
	 * Copies an array, then removes the value at the provided index. If the index is negative, then it removes from the end of the array. If index is beyound the array, then returns just a copy of the array.
	 * @param index The index of the value to remove. If the index is negative, then it removes from the end of the array.
	 * @returns The copied array with the removed value.
	 */
	without(index: number) {
		const i = this.#normalizeIndex(index)

		if (i === undefined) {
			return this.concat()
		}

		const front = this.slice(0, i)
		const end = this.slice(i + 1)

		return front.concat(end)
	}

	/**
	 * Copies an array, then inserts new elements before element at the provided index, and returns the new array.
	 * @param index The index of the value to insert before. If the index is negative, then it goes from the end of the array.
	 * @param items Elements to insert before element at the provided index.
	 * @returns The copied array with the inserted values.
	 */
	toUnshiftedIndex(index: number, ...items: InnerArray<T>) {
		const i = this.#normalizeIndex(index)

		if (i === undefined) {
			return
		}

		if (i === 0) {
			this.unshift(...items)
		}

		const front = this.slice(0, i)
		const end = this.slice(i)
		return ArrayExtra.of(...front, ...items, ...end)
	}

	/**
	 * Copies an array, then inserts new elements after element at the provided index, and returns the new array.
	 * @param index The index of the value to insert after. If the index is negative, then it goes from the end of the array.
	 * @param items Elements to insert after element at the provided index.
	 * @returns The copied array with the inserted values.
	 */
	toPushedIndex(index: number, ...items: InnerArray<T>) {
		const i = this.#normalizeIndex(index)

		if (i === undefined) {
			return
		}

		if (i === 0) {
			this.unshift(...items)
		}

		const front = this.slice(0, i)
		const end = this.slice(i)
		return ArrayExtra.of(...front, ...items, ...end)
	}

	/**
	 * Copies an array, then inserts new elements at the start of an array, and returns the new array.
	 * @param items Elements to insert at the start of the array.
	 * @returns The copied array with the appended values.
	 */
	toUnshifted(...items: InnerArray<T>) {
		const arr = this.concat()
		arr.unshift(...items)
		return arr
	}

	/**
	 * Copies an array, then appends new elements to the end of an array, and returns the new array.
	 * @param items New elements to add to the array.
	 * @returns The copied array with the appended values.
	 */
	toPushed(...items: InnerArray<T>) {
		const arr = this.concat()
		arr.push(...items)
		return arr
	}

	toShifted() {
		const arr = this.concat()
		arr.shift()
		return arr
	}

	toPoped() {
		const arr = this.concat()
		arr.pop()
		return arr
	}

	/**
	 * Returns a copy of this ArrayExtra as an Array
	 * @returns The copied array.
	 */
	toArray() {
		return super.concat() as T
	}

	slice(start?: number, end?: number): ArrayExtra<InnerArray<T>> {
		return ArrayExtra.from(super.slice(start, end))
	}
}
