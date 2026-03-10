import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../constants";
import type { TablePagination } from "../types";

interface UseTablePaginationParams<T> {
	showPagination: boolean;
	dataSource: T[];
	pagination?: TablePagination;
	onPageChange?: (current: number, pageSize: number, total: number) => void;
}

export function useTablePagination<T>({
	showPagination,
	dataSource,
	pagination,
	onPageChange,
}: UseTablePaginationParams<T>) {
	const onPaginationChange = pagination?.onChange;
	const controlledCurrent = pagination?.current;
	const controlledPageSize = pagination?.pageSize;
	const controlledTotal = pagination?.total;
	const configuredPageSizeOptions = pagination?.pageSizeOptions;

	const [innerCurrent, setInnerCurrent] = useState(1);
	const [innerPageSize, setInnerPageSize] = useState(controlledPageSize ?? DEFAULT_PAGE_SIZE);

	const pageSize = controlledPageSize ?? innerPageSize;
	const total = controlledTotal ?? dataSource.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const current = Math.min(Math.max(controlledCurrent ?? innerCurrent, 1), totalPages);
	const emitPageChange = useCallback(
		(nextCurrent: number, nextPageSize: number, nextTotal: number) => {
			onPaginationChange?.(nextCurrent, nextPageSize, nextTotal);
			onPageChange?.(nextCurrent, nextPageSize, nextTotal);
		},
		[onPaginationChange, onPageChange],
	);

	useEffect(() => {
		if (!showPagination || controlledCurrent !== undefined) return;
		if (innerCurrent > totalPages) {
			setInnerCurrent(totalPages);
			emitPageChange(totalPages, pageSize, total);
		}
	}, [showPagination, controlledCurrent, innerCurrent, total, totalPages, pageSize, emitPageChange]);

	const pageData = useMemo(() => {
		if (!showPagination) return dataSource;
		const start = (current - 1) * pageSize;
		return dataSource.slice(start, start + pageSize);
	}, [showPagination, dataSource, current, pageSize]);

	const pageSizeOptions = useMemo(() => {
		const baseOptions = configuredPageSizeOptions ?? [10, 20, 50, 100];
		const withCurrent = baseOptions.includes(pageSize) ? baseOptions : [...baseOptions, pageSize];
		return [...new Set(withCurrent)].sort((a, b) => a - b);
	}, [configuredPageSizeOptions, pageSize]);

	const handlePageChange = (nextPage: number) => {
		const page = Math.min(Math.max(nextPage, 1), totalPages);
		if (controlledCurrent === undefined) {
			setInnerCurrent(page);
		}
		emitPageChange(page, pageSize, total);
	};

	const handlePageSizeChange = (value: string) => {
		const nextPageSize = Number(value);
		if (Number.isNaN(nextPageSize) || nextPageSize <= 0) return;

		const nextTotalPages = Math.max(1, Math.ceil(total / nextPageSize));
		const nextCurrent = Math.min(current, nextTotalPages);

		if (controlledPageSize === undefined) {
			setInnerPageSize(nextPageSize);
		}
		if (controlledCurrent === undefined) {
			setInnerCurrent(nextCurrent);
		}

		emitPageChange(nextCurrent, nextPageSize, total);
	};

	return {
		pageData,
		total,
		totalPages,
		current,
		pageSize,
		pageSizeOptions,
		handlePageChange,
		handlePageSizeChange,
	};
}
