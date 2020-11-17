/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
	export interface ProcessEnv {
		HONEYBADGER_API_KEY: string
		HONEYBADGER_REVISION: string
	}
}
