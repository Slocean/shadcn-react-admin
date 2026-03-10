import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type FieldType = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export default function SecurityTab() {
	const { t } = useTranslation();
	const form = useForm<FieldType>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const handleSubmit = () => {
		// Handle form submission here
		toast.success(t("management.user.common.updateSuccess"));
	};

	return (
		<Card>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="oldPassword"
							rules={{ required: t("management.user.account.security.oldPasswordRequired") }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("management.user.account.security.oldPassword")}</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="newPassword"
							rules={{ required: t("management.user.account.security.newPasswordRequired") }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("management.user.account.security.newPassword")}</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							rules={{
								required: t("management.user.account.security.confirmPasswordRequired"),
								validate: (value) =>
									value === form.getValues("newPassword") || t("management.user.account.security.passwordsNotMatch"),
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("management.user.account.security.confirmNewPassword")}</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex w-full justify-end">
							<Button type="submit">{t("management.user.common.saveChanges")}</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
