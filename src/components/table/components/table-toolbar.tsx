import React from "react";
import { Input } from "@/ui/input";
import { ColumnVisibilityMenu } from "./column-visibility-menu";
import type { NormalizedColumn } from "../types";

interface TableToolbarProps<T> {
	title?: React.ReactNode;
	enableGlobalSearch: boolean;
	enableColumnFilter: boolean;
	globalKeyword: string;
	onGlobalKeywordChange: (keyword: string) => void;
	globalSearchPlaceholder: string;
	searchAriaLabel: string;
	columns: NormalizedColumn<T>[];
	visibleColumnKeySet: Set<string>;
	onToggleColumn: (column: NormalizedColumn<T>, checked: boolean) => void;
	columnFilterButtonText: string;
	columnFilterTitle: string;
	unnamedColumn: (index: number) => string;
}

export function TableToolbar<T>({
	title,
	enableGlobalSearch,
	enableColumnFilter,
	globalKeyword,
	onGlobalKeywordChange,
	globalSearchPlaceholder,
	searchAriaLabel,
	columns,
	visibleColumnKeySet,
	onToggleColumn,
	columnFilterButtonText,
	columnFilterTitle,
	unnamedColumn,
}: TableToolbarProps<T>) {
	if (!title && !enableGlobalSearch && !enableColumnFilter) {
		return null;
	}

	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			{title ? <div className="text-base font-medium">{title}</div> : <div />}
			<div className="flex flex-wrap items-center gap-2">
				{enableGlobalSearch && (
					<Input
						value={globalKeyword}
						onChange={(event) => onGlobalKeywordChange(event.target.value)}
						placeholder={globalSearchPlaceholder}
						aria-label={searchAriaLabel}
						className="w-full sm:w-72"
					/>
				)}
				{enableColumnFilter && (
					<ColumnVisibilityMenu
						columns={columns}
						visibleColumnKeySet={visibleColumnKeySet}
						onToggleColumn={onToggleColumn}
						buttonText={columnFilterButtonText}
						titleText={columnFilterTitle}
						unnamedColumn={unnamedColumn}
					/>
				)}
			</div>
		</div>
	);
}
