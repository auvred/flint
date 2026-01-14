import type { LinterHost } from "../types/host.ts";

/**
 * Creates a one-shot `LinterHost` that disables file/directory watching.
 *
 * Useful for single-run linting (e.g. CLI execution, rule tester),
 * where persistent watchers are unnecessary and can affect performance.
 */
export function createEphemeralLinterHost(baseHost: LinterHost): LinterHost {
	return {
		...baseHost,
		watchDirectory() {
			return {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				[Symbol.dispose]() {},
			};
		},
		watchFile() {
			return {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				[Symbol.dispose]() {},
			};
		},
	};
}
