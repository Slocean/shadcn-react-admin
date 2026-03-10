import type React from "react";
import { ALIGN_CLASS } from "../constants";
import { getValueByDataIndex, stringifyValue } from "../utils";
import { cn } from "@/utils/index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";
import type { NormalizedColumn } from "../types";

interface TableGridProps<T> {
	columns: NormalizedColumn<T>[];
	data: T[];
	rowKey?: keyof T | ((record: T, index: number) => React.Key);
	emptyText: React.ReactNode;
	bordered: boolean;
}

export function TableGrid<T extends object>({ columns, data, rowKey, emptyText, bordered }: TableGridProps<T>) {
	const borderedCellClass = bordered ? "border border-border" : "";

	return (
		<Table className={cn(bordered && "rounded-md border border-border")}>
			<TableHeader>
				<TableRow>
					{columns.map((column) => (
						<TableHead
							key={column.__columnKey}
							style={{ width: column.width }}
							className={cn(ALIGN_CLASS[column.align ?? "left"], borderedCellClass, column.className)}
						>
							{column.title}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length > 0 ? (
					data.map((record, rowIndex) => {
						const key =
							typeof rowKey === "function" ? rowKey(record, rowIndex) : rowKey ? (record[rowKey] as React.Key) : rowIndex;

						return (
							<TableRow key={key}>
								{columns.map((column) => {
									const value = getValueByDataIndex(record, column.dataIndex);
									return (
										<TableCell
											key={column.__columnKey}
											style={{ width: column.width }}
											className={cn(ALIGN_CLASS[column.align ?? "left"], borderedCellClass, column.className)}
										>
											{column.render ? column.render(value, record, rowIndex) : stringifyValue(value)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell colSpan={Math.max(columns.length, 1)} className="py-6 text-center text-muted-foreground">
							{emptyText}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
