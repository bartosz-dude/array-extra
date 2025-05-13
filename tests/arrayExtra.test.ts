import { describe, expect, test } from "vitest"
import { ArrayExtra } from "../dist"

test("without", () => {
	const arr = ArrayExtra.of(1, 2, 3)
	expect(arr.without(1)).toEqual([1, 3])
})

describe("toPushedIndex", () => {
	test("index 0", () => {
		const arr = ArrayExtra.of(1, 2, 3)
		const pushed = arr.toPushedIndex(0, 3)
		expect(pushed).toEqual([1, 3, 2, 3])
	})

	test("index >0", () => {
		const arr = ArrayExtra.of(1, 2, 3)
		const pushed = arr.toPushedIndex(1, 1)
		expect(pushed).toEqual([1, 2, 1, 3])
	})
})

describe("toUnshiftedIndex", () => {
	test("index 0", () => {
		const arr = ArrayExtra.of(1, 2, 3)
		const pushed = arr.toUnshiftedIndex(0, 3)
		expect(pushed).toEqual([3, 1, 2, 3])
	})

	test("index >0", () => {
		const arr = ArrayExtra.of(1, 2, 3)
		const pushed = arr.toUnshiftedIndex(1, 3)
		expect(pushed).toEqual([1, 3, 2, 3])
	})
})
