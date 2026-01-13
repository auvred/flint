import { createRuleTesterTSHost, RuleTester } from "@flint.fyi/rule-tester";
import { describe, it } from "vitest";

export const ruleTester = new RuleTester({
	defaults: { fileName: "file.ts" },
	describe,
	host: createRuleTesterTSHost(import.meta.dirname, {
		defaultCompilerOptions: {
			types: ["node"],
			// TODO: remove this; there is a bug in blobReadingMethods - it doesn't respect type from @types/node
			lib: ["DOM"],
		},
	}),
	it,
});
