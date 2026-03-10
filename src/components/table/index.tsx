import { useMemo, useState } from "react";
import { cn } from "@/utils/index";
import { TableGrid } from "./components/table-grid";
import { TablePagination } from "./components/table-pagination";
import { TableToolbar } from "./components/table-toolbar";
import { useColumnVisibility } from "./hooks/use-column-visibility";
import { useTableI18n } from "./hooks/use-table-i18n";
import { useTablePagination } from "./hooks/use-table-pagination";
import type { AppTableProps } from "./types";
import { normalizeColumns, stringifyValue, getValueByDataIndex } from "./utils";

export type { AppTableProps, TableColumn, TablePagination as AppTablePagination } from "./types";

export default function AppTable<T extends object>({
	title,
	columns,
	dataSource,
	rowKey,
	enableGlobalSearch = false,
	globalSearchPlaceholder,
	enableColumnFilter = false,
	showPagination = false,
	pagination,
	onPageChange,
	emptyText,
	bordered = false,
	className,
}: AppTableProps<T>) {
	const locale = useTableI18n();
	const [globalKeyword, setGlobalKeyword] = useState("");

	const normalizedColumns = useMemo(() => normalizeColumns(columns), [columns]);
	const { visibleColumnKeySet, visibleColumns, toggleColumn } = useColumnVisibility(normalizedColumns);
	const activeColumns = enableColumnFilter ? visibleColumns : normalizedColumns;

	const { pageData, total, totalPages, current, pageSize, pageSizeOptions, handlePageChange, handlePageSizeChange } =
		useTablePagination({
			showPagination,
			dataSource,
			pagination,
			onPageChange,
		});

	const filteredData = useMemo(() => {
		const keyword = globalKeyword.trim().toLowerCase();
		if (!enableGlobalSearch || !keyword) return pageData;

		const searchableColumns = normalizedColumns.filter(
			(column) => column.searchable !== false && (column.searchValue || column.dataIndex !== undefined),
		);

		return pageData.filter((record) => {
			return searchableColumns.some((column) => {
				const value = column.searchValue ? column.searchValue(record) : getValueByDataIndex(record, column.dataIndex);
				return stringifyValue(value).toLowerCase().includes(keyword);
			});
		});
	}, [enableGlobalSearch, globalKeyword, pageData, normalizedColumns]);

	return (
		<div className={cn("space-y-3", className)}>
			<TableToolbar
				title={title}
				enableGlobalSearch={enableGlobalSearch}
				enableColumnFilter={enableColumnFilter}
				globalKeyword={globalKeyword}
				onGlobalKeywordChange={setGlobalKeyword}
				globalSearchPlaceholder={globalSearchPlaceholder ?? locale.searchPlaceholder}
				searchAriaLabel={locale.searchAriaLabel}
				columns={normalizedColumns}
				visibleColumnKeySet={visibleColumnKeySet}
				onToggleColumn={toggleColumn}
				columnFilterButtonText={locale.columnFilterButtonText}
				columnFilterTitle={locale.columnFilterTitle}
				unnamedColumn={locale.unnamedColumn}
			/>

			<TableGrid
				columns={activeColumns}
				data={filteredData}
				rowKey={rowKey}
				emptyText={emptyText ?? locale.emptyText}
				bordered={bordered}
			/>

			{showPagination && (
				<TablePagination
					current={current}
					totalPages={totalPages}
					pageSize={pageSize}
					pageSizeOptions={pageSizeOptions}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
					summaryText={locale.summaryText({ total, current, totalPages })}
					prevText={locale.prevText}
					nextText={locale.nextText}
					getPageSizeText={locale.pageSizeText}
				/>
			)}
		</div>
	);
}
