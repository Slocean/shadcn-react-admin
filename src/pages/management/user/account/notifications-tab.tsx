import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Switch } from "@/ui/switch";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function NotificationsTab() {
	const { t } = useTranslation();

	const handleClick = () => {
		toast.success(t("management.user.common.updateSuccess"));
	};
	return (
		<Card>
			<CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="flex-1">
					<h4>{t("management.user.account.notifications.activityTitle")}</h4>
					<p className="text-text-secondary">{t("management.user.account.notifications.sectionDesc")}</p>
				</div>
				<div className="flex-2">
					<div className="flex w-full flex-col gap-4 rounded-lg px-6 py-8 bg-bg-neutral">
						<div className="flex w-full justify-between">
							<div>{t("management.user.account.notifications.activity.replyOnForm")}</div>
							<Switch defaultChecked />
						</div>
						<div className="flex w-full justify-between">
							<div>{t("management.user.account.notifications.activity.commentOnArticle")}</div>
							<Switch />
						</div>
						<div className="flex w-full justify-between">
							<div>{t("management.user.account.notifications.activity.followMe")}</div>
							<Switch defaultChecked />
						</div>
					</div>
				</div>

				<div className="flex-1">
					<h4>{t("management.user.account.notifications.applicationsTitle")}</h4>
					<p className="text-text-secondary">{t("management.user.account.notifications.sectionDesc")}</p>
				</div>
				<div className="flex-2">
					<div className="flex w-full flex-col gap-4 rounded-lg px-6 py-8 bg-bg-neutral">
						<div className="flex w-full justify-between">
							<div>{t("management.user.account.notifications.applications.newsAndAnnouncements")}</div>
							<Switch />
						</div>
						<div className="flex w-full justify-between">
							<div>{t("management.user.account.notifications.applications.weeklyProductUpdates")}</div>
							<Switch defaultChecked />
						</div>
						<div className="flex w-full justify-between">
							<div>{t("management.user.account.notifications.applications.weeklyBlogDigest")}</div>
							<Switch />
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex w-full justify-end">
				<Button onClick={handleClick}>{t("management.user.common.saveChanges")}</Button>
			</CardFooter>
		</Card>
	);
}
