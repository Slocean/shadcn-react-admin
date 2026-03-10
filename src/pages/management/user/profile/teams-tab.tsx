import { fakeAvatars } from "@/_mock/utils";
import { Icon } from "@/components/icon";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { useTranslation } from "react-i18next";

export default function TeamsTab() {
	const { t } = useTranslation();

	const items = [
		{
			icon: <Icon icon="logos:react" size={40} />,
			name: t("management.user.profile.teamsTab.items.react.name"),
			desc: t("management.user.profile.teamsTab.items.react.desc"),
			members: fakeAvatars(25),
			tags: ["React", "AntD"],
		},
		{
			icon: <Icon icon="logos:vue" size={40} />,
			name: t("management.user.profile.teamsTab.items.vue.name"),
			desc: t("management.user.profile.teamsTab.items.vue.desc"),
			members: fakeAvatars(20),
			tags: ["Vue.js", t("management.user.profile.teamsTab.tags.developer")],
		},
		{
			icon: <Icon icon="logos:figma" size={40} />,
			name: t("management.user.profile.teamsTab.items.figma.name"),
			desc: t("management.user.profile.teamsTab.items.figma.desc"),
			members: fakeAvatars(45),
			tags: ["UI/UX", "Figma"],
		},
		{
			icon: <Icon icon="logos:html-5" size={40} />,
			name: t("management.user.profile.teamsTab.items.beginners.name"),
			desc: t("management.user.profile.teamsTab.items.beginners.desc"),
			members: fakeAvatars(50),
			tags: ["CSS", "HTML"],
		},
		{
			icon: <Icon icon="logos:adobe-xd" size={40} />,
			name: t("management.user.profile.teamsTab.items.creative.name"),
			desc: t("management.user.profile.teamsTab.items.creative.desc"),
			members: fakeAvatars(55),
			tags: ["Sketch", "XD"],
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			{items.map((item) => (
				<Card key={item.name} className="flex w-full flex-col">
					<CardContent>
						<header className="flex w-full items-center">
							{item.icon}
							<span className="ml-4 text-xl opacity-70">{item.name}</span>

							<div className="ml-auto flex opacity-70">
								<Button variant="ghost" size="icon">
									<Icon icon="solar:star-line-duotone" size={18} />
								</Button>
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" size={18} />
								</Button>
							</div>
						</header>
						<main className="my-4 opacity-70">{item.desc}</main>
						<footer className="flex w-full items-center">
							{item.members.slice(0, 4).map((memberAvatar) => (
								<Avatar key={memberAvatar}>
									<AvatarImage src={memberAvatar} />
								</Avatar>
							))}
							<div className="ml-auto flex items-center gap-1">
								{item.tags.map((tag) => (
									<Badge key={tag} variant="info">
										{tag}
									</Badge>
								))}
							</div>
						</footer>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
