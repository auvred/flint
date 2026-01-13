import type { LinterHost } from "../types/host.ts";

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
