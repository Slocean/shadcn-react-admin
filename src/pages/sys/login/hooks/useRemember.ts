import type { UserForm } from "#/entity";
import { useUserForm } from "@/store/userStore";

export const useRemember = () => {
	const userForm = useUserForm();
	const setLoginForm = () => {
		return {
			username: userForm.username,
			password: userForm.password,
		};
	};
	const getLoginForm = () => {
		return userForm;
	};
	return {
		userForm,
		setLoginForm,
		getLoginForm,
	};
};
