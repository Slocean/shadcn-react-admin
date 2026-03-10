import type React from "react";

export type AlignType = "left" | "center" | "right";
export type PrimitiveValue = string | number | boolean | null | undefined;
export type ColumnDataIndex<T> = keyof T | string | number | Array<string | number>;

export interface TableColumn<T> {
	title: React.ReactNode;
	dataIndex?: ColumnDataIndex<T>;
	key?: React.Key;
	width?: number | string;
	align?: AlignType;
	className?: string;
	searchable?: boolean;
	searchValue?: (record: T) => PrimitiveValue;
	render?: (value: unknown, record: T, index: number) => React.ReactNode;
	hideable?: boolean;
	hidden?: boolean;
}

export interface TablePagination {
	current?: number;
	pageSize?: number;
	total?: number;
	pageSizeOptions?: number[];
	onChange?: (current: number, pageSize: number, total: number) => void;
}

export interface AppTableProps<T> {
	title?: React.ReactNode;
	columns: TableColumn<T>[];
	dataSource: T[];
	rowKey?: keyof T | ((record: T, index: number) => React.Key);
	enableGlobalSearch?: boolean;
	globalSearchPlaceholder?: string;
	enableColumnFilter?: boolean;
	showPagination?: boolean;
	pagination?: TablePagination;
	onPageChange?: (current: number, pageSize: number, total: number) => void;
	emptyText?: React.ReactNode;
	bordered?: boolean;
	className?: string;
}

export type NormalizedColumn<T> = TableColumn<T> & {
	__columnKey: string;
	__columnIndex: number;
};
