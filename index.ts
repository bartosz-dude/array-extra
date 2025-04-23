export class ArrayExtra<T extends any[]> extends Array {
	constructor(...items: T) {
		super()
		for (const item of items) {
			this.push(item)
		}
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

	/**
	 * Copies an array, then removes the value at the provided index. If the index is negative, then it removes from the end of the array. If index is beyound the array, then returns just a copy of the array.
	 * @param index The index of the value to remove. If the index is negative, then it removes from the end of the array.
	 * @returns  The copied array with the removed value.
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
}

const a = new ArrayExtra<(number | string)[]>(1, "a", "b")
const b = new ArrayExtra()
a.push("a")
