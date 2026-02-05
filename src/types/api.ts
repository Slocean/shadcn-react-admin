import type { ResultStatus } from "./enum";

// export interface Result<T = unknown> {
// 	status: ResultStatus;
// 	message: string;
// 	data: T;
// }

// 兼容旧版本接口返回结构
export interface Result<T = unknown> {
	success: boolean;
	message: string;
	code: ResultStatus;
	result: T;
	timestamp: number;
}
