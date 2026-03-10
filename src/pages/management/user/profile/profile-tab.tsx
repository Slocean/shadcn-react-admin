import { Icon } from "@/components/icon";
import { useUserInfo } from "@/store/userStore";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Text } from "@/ui/typography";
import { faker } from "@faker-js/faker";
import { Timeline } from "antd";
import { useTranslation } from "react-i18next";

export default function ProfileTab() {
	const { t } = useTranslation();
	const { username } = useUserInfo();

	const aboutItems = [
		{
			icon: <Icon icon="fa-solid:user" size={18} />,
			label: t("management.user.profile.profileTab.about.fullName"),
			value: username,
		},
		{
			icon: <Icon icon="eos-icons:role-binding" size={18} />,
			label: t("management.user.profile.profileTab.about.role"),
			value: t("management.user.profile.profileTab.values.developer"),
		},
		{
			icon: <Icon icon="tabler:location-filled" size={18} />,
			label: t("management.user.profile.profileTab.about.country"),
			value: t("management.user.profile.profileTab.values.usa"),
		},
		{
			icon: <Icon icon="ion:language" size={18} />,
			label: t("management.user.profile.profileTab.about.language"),
			value: t("management.user.profile.profileTab.values.english"),
		},
		{
			icon: <Icon icon="ph:phone-fill" size={18} />,
			label: t("management.user.profile.profileTab.about.contact"),
			value: "(123)456-7890",
		},
		{
			icon: <Icon icon="ic:baseline-email" size={18} />,
			label: t("management.user.profile.profileTab.about.email"),
			value: username,
		},
	];

	const connectionItems = Array.from({ length: 5 }).map(() => ({
		avatar: faker.image.avatarGitHub(),
		name: faker.person.fullName(),
		count: faker.number.int({ min: 1, max: 100 }),
		connected: faker.datatype.boolean(),
	}));

	const teamItems = [
		{
			avatar: <Icon icon="devicon:react" size={36} />,
			name: t("management.user.profile.profileTab.teamNames.reactDevelopers"),
			members: faker.number.int({ min: 10, max: 100 }),
			tag: <Badge variant="warning">{t("management.user.profile.profileTab.tags.developer")}</Badge>,
		},
		{
			avatar: <Icon icon="devicon:figma" size={36} />,
			name: t("management.user.profile.profileTab.teamNames.uiDesigner"),
			members: faker.number.int({ min: 10, max: 100 }),
			tag: <Badge variant="info">{t("management.user.profile.profileTab.tags.designer")}</Badge>,
		},
		{
			avatar: <Icon icon="logos:jest" size={36} />,
			name: t("management.user.profile.profileTab.teamNames.testTeam"),
			members: faker.number.int({ min: 10, max: 100 }),
			tag: <Badge variant="success">{t("management.user.profile.profileTab.tags.test")}</Badge>,
		},
		{
			avatar: <Icon icon="logos:nestjs" size={36} />,
			name: t("management.user.profile.profileTab.teamNames.nestDevelopers"),
			members: faker.number.int({ min: 10, max: 100 }),
			tag: <Badge variant="warning">{t("management.user.profile.profileTab.tags.developer")}</Badge>,
		},
		{
			avatar: <Icon icon="logos:twitter" size={36} />,
			name: t("management.user.profile.profileTab.teamNames.digitalMarketing"),
			members: faker.number.int({ min: 10, max: 100 }),
			tag: <Badge variant="info">{t("management.user.profile.profileTab.tags.marketing")}</Badge>,
		},
	];

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>{t("management.user.profile.profileTab.about.title")}</CardTitle>
						<CardDescription>{t("management.user.profile.profileTab.about.description")}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-4">
							{aboutItems.map((item) => (
								<div className="flex" key={item.label}>
									<div className="mr-2">{item.icon}</div>
									<div className="mr-2">{item.label}:</div>
									<div className="opacity-50">{item.value}</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="col-span-1 md:col-span-2">
					<CardHeader>
						<CardTitle>{t("management.user.profile.profileTab.timeline.title")}</CardTitle>
					</CardHeader>
					<CardContent>
						<Timeline
							className="mt-4! w-full"
							items={[
								{
									color: themeVars.colors.palette.error.default,
									children: (
										<div className="flex flex-col">
											<div className="flex items-center justify-between">
												<Text>{t("management.user.profile.profileTab.timeline.invoicePaid")}</Text>
												<div className="opacity-50">{t("management.user.profile.profileTab.timeline.wednesday")}</div>
											</div>
											<Text variant="caption" color="secondary">
												{t("management.user.profile.profileTab.timeline.invoicePaidDesc")}
											</Text>

											<div className="mt-2 flex items-center gap-2">
												<Icon icon="local:file-pdf" size={30} />
												<span className="font-medium opacity-60">invoice.pdf</span>
											</div>
										</div>
									),
								},
								{
									color: themeVars.colors.palette.primary.default,
									children: (
										<div className="flex flex-col">
											<div className="flex items-center justify-between">
												<Text>{t("management.user.profile.profileTab.timeline.newProject")}</Text>
												<div className="opacity-50">{t("management.user.profile.profileTab.timeline.april18")}</div>
											</div>
											<Text variant="caption" color="secondary">
												{t("management.user.profile.profileTab.timeline.projectDesc")}
											</Text>
											<div className="mt-2 flex items-center gap-2">
												<img alt="" src={faker.image.avatarGitHub()} className="h-8 w-8 rounded-full" />
												<span className="font-medium opacity-60">
													{t("management.user.profile.profileTab.timeline.clientName", {
														name: faker.person.fullName(),
													})}
												</span>
											</div>
										</div>
									),
								},
								{
									color: themeVars.colors.palette.info.default,
									children: (
										<div className="flex flex-col">
											<div className="flex items-center justify-between">
												<Text>{t("management.user.profile.profileTab.timeline.orderSeptember")}</Text>
												<div className="opacity-50">{t("management.user.profile.profileTab.timeline.january10")}</div>
											</div>
											<Text variant="caption" color="secondary">
												{t("management.user.profile.profileTab.timeline.orderDesc")}
											</Text>
										</div>
									),
								},
								{
									color: themeVars.colors.palette.warning.default,
									children: (
										<div className="flex flex-col">
											<div className="flex items-center justify-between">
												<Text>{t("management.user.profile.profileTab.timeline.publicMeeting")}</Text>
												<div className="opacity-50">{t("management.user.profile.profileTab.timeline.september30")}</div>
											</div>
										</div>
									),
								},
							]}
						/>
					</CardContent>
				</Card>
			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<Card>
						<CardHeader>
							<CardTitle className="w-full flex items-center justify-between">
								<span>{t("management.user.profile.profileTab.connectionsTitle")}</span>
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" />
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex w-full flex-col gap-4">
								{connectionItems.map((item) => (
									<div className="flex" key={item.name}>
										<img alt="" src={item.avatar} className="h-10 w-10 flex-none rounded-full" />
										<div className="ml-4 flex flex-1 flex-col">
											<span className="font-semibold">{item.name}</span>
											<span className="mt-1 text-xs opacity-50">
												{t("management.user.profile.profileTab.connectionsCount", { count: item.count })}
											</span>
										</div>
										<div
											className="flex h-8 w-8 flex-none items-center justify-center rounded"
											style={{
												backgroundColor: item.connected ? themeVars.colors.palette.primary.default : "transparent",
												border: item.connected ? "" : `1px solid ${themeVars.colors.palette.primary.default}`,
											}}
										>
											<Icon
												icon="tdesign:user"
												color={item.connected ? "#fff" : themeVars.colors.palette.primary.default}
												size={20}
											/>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="flex-1">
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle>{t("management.user.profile.profileTab.teamsTitle")}</CardTitle>
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex w-full flex-col gap-4">
								{teamItems.map((item) => (
									<div className="flex" key={item.name}>
										{item.avatar}
										<div className="ml-4 flex flex-1 flex-col">
											<span className="font-semibold">{item.name}</span>
											<span className="mt-1 text-xs opacity-50">
												{t("management.user.profile.profileTab.membersCount", { count: item.members })}
											</span>
										</div>
										<div className="h-6">{item.tag}</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
