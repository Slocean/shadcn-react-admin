import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CaptchaReq, SignInReq } from "@/api/services/authService";
import authService from "@/api/services/authService";

const createCheckKey = () => {
	// 生成随机字符串作为checkKey
	// if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	// return `${Date.now()}-${Math.random().toString(16).slice(2)}`;

	// 使用时间戳单位秒作为checkKey，避免重复请求
	return Math.floor(Date.now() / 1000);
};

export function useCaptcha(form: UseFormReturn<SignInReq>) {
	const [captchaImg, setCaptchaImg] = useState<string>("");

	const { mutateAsync: fetchCaptcha, isPending } = useMutation({
		mutationFn: (params: CaptchaReq) => authService.getCaptcha(params),
	});

	const refreshCaptcha = useCallback(async () => {
		const checkKey = createCheckKey();
		form.setValue("checkKey", checkKey, { shouldDirty: true });
		form.setValue("captcha", "", { shouldDirty: true });

		const captcha = await fetchCaptcha({ _t: Date.now() });
		if (typeof captcha === "string") setCaptchaImg(captcha);
		return captcha;
	}, [fetchCaptcha, form]);

	return {
		captchaImg,
		captchaLoading: isPending,
		refreshCaptcha,
	};
}
