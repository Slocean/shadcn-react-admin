import { fakeAvatars } from "@/_mock/utils";
import { AvatarGroup } from "@/components/avatar-group";
import { Icon } from "@/components/icon";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Text } from "@/ui/typography";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function ProjectsTab() {
	const { t } = useTranslation();

	const items = [
		{
			icon: <Icon icon="logos:react" size={40} />,
			name: t("management.user.profile.projectsTab.items.adminTemplate.name"),
			client: faker.person.fullName(),
			desc: t("management.user.profile.projectsTab.items.adminTemplate.desc"),
			members: fakeAvatars(5),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "98/135",
		},
		{
			icon: <Icon icon="logos:vue" size={40} />,
			name: t("management.user.profile.projectsTab.items.appDesign.name"),
			desc: t("management.user.profile.projectsTab.items.appDesign.desc"),
			client: faker.person.fullName(),
			members: fakeAvatars(7),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "880/421",
		},
		{
			icon: <Icon icon="logos:figma" size={40} />,
			name: t("management.user.profile.projectsTab.items.figmaDashboard.name"),
			desc: t("management.user.profile.projectsTab.items.figmaDashboard.desc"),
			client: faker.person.fullName(),
			members: fakeAvatars(3),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "1.2k/820",
		},
		{
			icon: <Icon icon="logos:html-5" size={40} />,
			name: t("management.user.profile.projectsTab.items.createWebsite.name"),
			desc: t("management.user.profile.projectsTab.items.createWebsite.desc"),
			client: faker.person.fullName(),
			members: fakeAvatars(11),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "142/420",
		},
		{
			icon: <Icon icon="logos:adobe-xd" size={40} />,
			name: t("management.user.profile.projectsTab.items.logoDesign.name"),
			desc: t("management.user.profile.projectsTab.items.logoDesign.desc"),
			client: faker.person.fullName(),
			members: fakeAvatars(5),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 232,
			allHours: "580/445",
		},
	];

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			{items.map((item) => (
				<Card key={item.name} className="flex w-full flex-col">
					<CardContent>
						<header className="flex w-full items-center">
							{item.icon}

							<div className="flex flex-col">
								<Text variant="body1" className="ml-4">
									{item.name}
								</Text>
								<Text variant="caption" className="ml-4">
									{t("management.user.profile.projectsTab.client", { client: item.client })}
								</Text>
							</div>

							<div className="ml-auto flex opacity-70">
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" size={18} />
								</Button>
							</div>
						</header>

						<main className="mt-4 w-full">
							<div className="my-2 flex justify-between">
								<Text variant="body1">
									{t("management.user.profile.projectsTab.startDate")}
									<Text variant="caption" className="ml-2">
										{item.startDate.format("DD/MM/YYYY")}
									</Text>
								</Text>

								<Text variant="body1">
									{t("management.user.profile.projectsTab.deadline")}
									<Text variant="caption" className="ml-2">
										{item.deadline.format("DD/MM/YYYY")}
									</Text>
								</Text>
							</div>
							<span className="opacity-70">{item.desc}</span>
						</main>

						<footer className="flex w-full  flex-col items-center">
							<div className="mb-4 flex w-full justify-between">
								<span>
									<Text variant="body1">{t("management.user.profile.projectsTab.allHours")}</Text>
									<Text variant="caption" className="ml-2">
										{item.allHours}
									</Text>
								</span>

								<Badge variant="warning">
									{t("management.user.profile.projectsTab.daysLeft", {
										count: item.deadline.diff(dayjs(), "day"),
									})}
								</Badge>
							</div>
							<div className="flex w-full ">
								<AvatarGroup max={{ count: 3 }} size="small">
									{item.members.map((memberAvatar) => (
										<Avatar key={memberAvatar}>
											<AvatarImage src={memberAvatar} />
										</Avatar>
									))}
								</AvatarGroup>

								<div className="ml-auto flex items-center opacity-50">
									<Icon icon="solar:chat-round-line-linear" size={24} />
									<Text variant="subTitle2" className="ml-2">
										{item.messages}
									</Text>
								</div>
							</div>
						</footer>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
