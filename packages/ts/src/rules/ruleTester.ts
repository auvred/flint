import { createRuleTesterTSHost, RuleTester } from "@flint.fyi/rule-tester";
import { describe, it } from "vitest";

export const ruleTester = new RuleTester({
	defaults: { fileName: "file.ts" },
	describe,
	host: createRuleTesterTSHost(import.meta.dirname, {
		defaultCompilerOptions: {
			// TODO: use per-test-case tsconfig.json instead -- https://github.com/flint-fyi/flint/issues/621
			lib: ["esnext", "dom"],
		},
	}),
	it,
});
