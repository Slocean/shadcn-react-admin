import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { UserForm, UserInfo, UserToken } from "#/entity";
import { StorageEnum } from "#/enum";
// import userService, { type SignInReq } from "@/api/services/userService";
import authService, { type SignInReq } from "@/api/services/authService";

type UserStore = {
	userInfo: Partial<UserInfo>;
	userToken: UserToken;
	userForm: UserForm;
	actions: {
		setUserInfo: (userInfo: UserInfo) => void;
		setUserToken: (token: UserToken) => void;
		setUserForm: (userForm: UserForm) => void;
		clearUserInfoAndToken: () => void;
	};
};

const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			userInfo: {},
			userToken: {},
			userForm: {},
			actions: {
				setUserForm: (userForm) => {
					set({ userForm });
				},
				setUserInfo: (userInfo) => {
					set({ userInfo });
				},
				setUserToken: (userToken) => {
					set({ userToken });
				},
				clearUserInfoAndToken() {
					set({ userInfo: {}, userToken: {} });
				},
			},
		}),
		{
			name: "userStore", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({
				[StorageEnum.UserInfo]: state.userInfo,
				[StorageEnum.UserToken]: state.userToken,
				[StorageEnum.UserForm]: state.userForm,
			}),
		},
	),
);

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserForm = () => useUserStore((state) => state.userForm);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermissions = () => useUserStore((state) => state.userInfo.permissions || []);
export const useUserRoles = () => useUserStore((state) => state.userInfo.roles || []);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
	const { setUserToken, setUserInfo, setUserForm } = useUserActions();

	const signInMutation = useMutation({
		// mutationFn: userService.signin,
		mutationFn: authService.login,
	});

	const signIn = async (data: SignInReq) => {
		try {
			const res = await signInMutation.mutateAsync(data);
			const payload = (res as any)?.result ?? res;
			const { token, userInfo } = payload;
			if (data.remember_me) {
				setUserForm({
					username: data.username,
					password: data.password,
				});
			}
			setUserToken({ accessToken: token, refreshToken: token });
			setUserInfo(userInfo);
		} catch (err) {
			// toast.error(err.message, {
			// 	position: "top-center",
			// });
			console.error(err.message);
			throw err;
		}
	};

	return signIn;
};

export default useUserStore;
