import type { Result } from "#/api";
import apiClient from "../apiClient";

// 登录请求参数
export interface SignInReq {
	username: string;
	password: string;
	remember_me: boolean;
	captcha: string;
	checkKey: string;
}

// 登录响应参数
export type SignInRes = Result<{
	token: string;
	userInfo: any;
	departs: any[];
	multi_depart: number;
	sysAllDictItems: any;
}>;

// 系统接口枚举
export enum SystemApi {
	login = "/sys/login",
}

const login = (data: SignInReq) => apiClient.post<SignInRes>({ url: SystemApi.login, data });

export default {
	login,
};
