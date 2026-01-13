import {
	createDiskBackedLinterHost,
	createEphemeralLinterHost,
	createVFSLinterHost,
} from "@flint.fyi/core";
import path from "node:path";

export interface RuleTesterTSHostOptions {
	defaultCompilerOptions?: Record<string, unknown>;
}

export function createRuleTesterTSHost(
	dirname: string,
	opts: RuleTesterTSHostOptions = {},
) {
	// At the time of writing this, packages/ts/src/rules contains ~120 .ts files.
	// If we set the VFS cwd to dirname ('packages/ts/src/rules'), all 120 .ts files
	// will be included into TS programs. However, if we create a virtual directory
	// that contains only test case fixtures, we will avoid doing extra work.
	// On my machine, this speeds up `pnpm vitest --run packages/ts` from ~22.6s to ~12.5s (1.8x).
	dirname += "/_flint-rule-tester-virtual";
	const fsHost = createEphemeralLinterHost(createDiskBackedLinterHost(dirname));
	const overlay = createVFSLinterHost({
		baseHost: {
			...fsHost,
			stat(pathAbsolute) {
				// must be provided by VFS overlay
				if (pathAbsolute.endsWith("tsconfig.json")) {
					return undefined;
				}
				return fsHost.stat(pathAbsolute);
			},
		},
	});
	overlay.vfsUpsertFile(
		path.join(dirname, "tsconfig.base.json"),
		JSON.stringify(
			{
				compilerOptions: {
					lib: ["esnext"],
					moduleResolution: "bundler",
					strict: true,
					target: "esnext",
					types: [],
					...opts.defaultCompilerOptions,
				},
			},
			null,
			2,
		),
	);
	overlay.vfsUpsertFile(
		path.join(dirname, "tsconfig.json"),
		JSON.stringify(
			{
				extends: "./tsconfig.base.json",
			},
			null,
			2,
		),
	);
	return overlay;
}
