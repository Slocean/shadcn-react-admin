import type { Result } from "#/api";
import apiClient from "../apiClient";

// 登录请求参数
export interface SignInReq {
	username: string;
	password: string;
	remember_me?: boolean;
	captcha?: string;
	checkKey?: number;
}

// 登录响应参数
export type SignInRes = Result<{
	token: string;
	userInfo: any;
	departs: any[];
	multi_depart: number;
	sysAllDictItems: any;
}>;

// 验证码请求参数
export interface CaptchaReq {
	[key: string | number]: string | number;
}

// 验证码响应参数
export type CaptchaRes = Result<string>;

// 系统接口枚举
export enum AuthApi {
	login = "/sys/login",
	getCaptcha = "/sys/randomImage",
}

const login = (data: SignInReq) => apiClient.post<SignInRes>({ url: AuthApi.login, data });
const getCaptcha = (params: CaptchaReq) =>
	apiClient.get<CaptchaRes>({ url: `${AuthApi.getCaptcha}/${Math.floor(Date.now() / 1000)}`, params });

export default {
	login,
	getCaptcha,
};
