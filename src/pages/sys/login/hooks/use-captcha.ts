import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CaptchaReq, SignInReq } from "@/api/services/authService";
import authService from "@/api/services/authService";

const createCheckKey = () => {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
