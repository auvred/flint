import { RuleTester } from "@flint.fyi/rule-tester";
import { describe, it } from "vitest";

import { createRuleTesterTSConfig } from "../utils/createRuleTesterTSConfig.ts";

export const ruleTester = new RuleTester({
	defaultFiles: createRuleTesterTSConfig({
		// TODO: use per-test-case tsconfig.json instead -- https://github.com/flint-fyi/flint/issues/621
		lib: ["esnext", "dom"],
	}),
	defaults: { fileName: "file.ts" },
	describe,
	diskBackedFSRoot: import.meta.dirname,
	it,
});
