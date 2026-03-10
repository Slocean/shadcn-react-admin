// import { USER_LIST } from "@/_mock/assets";

import { useEffect, useState } from "react";
import type { Role_Old, UserInfo } from "#/entity";
import { BasicStatus } from "#/enum";
import { Icon } from "@/components/icon";
import AppTable, { type TableColumn } from "@/components/table";
import { usePathname, useRouter } from "@/routes/hooks";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";

// TODO: fix
// const USERS: UserInfo[] = USER_LIST as UserInfo[];
const USERS: UserInfo[] = [];

export default function UserPage() {
	const { push } = useRouter();
	const pathname = usePathname();

	const columns: TableColumn<UserInfo>[] = [
		{
			title: "Name",
			dataIndex: "name",
			width: 300,
			searchValue: (record) => record.email ?? "",
			render: (_, record) => {
				const displayName = record.email?.split("@")[0] ?? "-";
				return (
					<div className="flex">
						<img alt="" src={record.avatar} className="h-10 w-10 rounded-full" />
						<div className="ml-2 flex flex-col">
							<span className="text-sm">{displayName}</span>
							<span className="text-xs text-text-secondary">{record.email}</span>
						</div>
					</div>
				);
			},
		},
		{
			title: "Role",
			dataIndex: "role",
			align: "center",
			width: 120,
			render: (role) => <Badge variant="info">{(role as Role_Old)?.name}</Badge>,
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center",
			width: 120,
			render: (statusValue) => {
				const status = statusValue as BasicStatus;
				return (
					<Badge variant={status === BasicStatus.DISABLE ? "error" : "success"}>
						{status === BasicStatus.DISABLE ? "Disable" : "Enable"}
					</Badge>
				);
			},
		},
		{
			title: "Action",
			key: "operation",
			align: "center",
			width: 100,
			searchable: false,
			render: (_, record) => (
				<div className="flex w-full justify-center text-gray-500">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => {
							push(`${pathname}/${record.id}`);
						}}
					>
						<Icon icon="mdi:card-account-details" size={18} />
					</Button>
					<Button variant="ghost" size="icon" onClick={() => {}}>
						<Icon icon="solar:pen-bold-duotone" size={18} />
					</Button>
					<Button variant="ghost" size="icon">
						<Icon icon="mingcute:delete-2-fill" size={18} className="text-error!" />
					</Button>
				</div>
			),
		},
	];
	const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
	useEffect(() => {
		console.log(pagination);
		// TODO: fetch data
	}, [pagination]);
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>User List</div>
					<Button onClick={() => {}}>New</Button>
				</div>
			</CardHeader>
			<CardContent>
				<AppTable<UserInfo>
					rowKey="id"
					columns={columns}
					dataSource={USERS}
					enableGlobalSearch
					enableColumnFilter
					bordered
					showPagination
					pagination={pagination}
					onPageChange={(current, pageSize) => {
						setPagination({ current, pageSize });
					}}
				/>
			</CardContent>
		</Card>
	);
}
