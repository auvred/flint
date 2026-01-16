import { RuleTester } from "@flint.fyi/rule-tester";
import { createRuleTesterTSConfig } from "@flint.fyi/ts";
import { describe, it } from "vitest";

export const ruleTester = new RuleTester({
	defaultFiles: createRuleTesterTSConfig(),
	defaults: { fileName: "file.ts" },
	describe,
	it,
});
