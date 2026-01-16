import { RuleTester } from "@flint.fyi/rule-tester";
import { createRuleTesterTSConfig } from "@flint.fyi/typescript-language";
import { describe, it } from "vitest";

export const ruleTester = new RuleTester({
	defaultFiles: createRuleTesterTSConfig({
		types: ["node"],
		// TODO: remove this; there is a bug in blobReadingMethods - it doesn't respect type from @types/node
		lib: ["dom"],
	}),
	defaults: { fileName: "file.ts" },
	describe,
	diskBackedFSRoot: import.meta.dirname,
	it,
});
