import { type RollupOptions } from "rollup"
import typescript from "@rollup/plugin-typescript"

export default {
	plugins: [typescript()],
	input: "./index.ts",
	output: {
		dir: "dist",
		name: "array-extra",
	},
} satisfies RollupOptions
