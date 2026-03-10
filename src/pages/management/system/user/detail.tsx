import { useParams } from "@/routes/hooks";
import { Card, CardContent } from "@/ui/card";
import { useTranslation } from "react-i18next";
import type { UserInfo } from "#/entity";

// TODO: fix
// const USERS: UserInfo[] = USER_LIST as UserInfo[];
const USERS: UserInfo[] = [];

export default function UserDetail() {
	const { t } = useTranslation();
	const { id } = useParams();
	const user = USERS.find((user) => user.id === id);
	return (
		<Card>
			<CardContent>
				<p>{t("management.user.system.detail.page", { name: user?.email ?? "-" })}</p>
			</CardContent>
		</Card>
	);
}
