import { useEffect, useMemo, useState } from "react";
import type { NormalizedColumn } from "../types";

function buildDefaultVisibleKeys<T>(columns: NormalizedColumn<T>[]) {
	const visibleKeys = columns
		.filter((column) => column.hideable === false || column.hidden !== true)
		.map((column) => column.__columnKey);

	if (visibleKeys.length > 0) {
		return visibleKeys;
	}

	if (columns.length > 0) {
		return [columns[0].__columnKey];
	}

	return [];
}

export function useColumnVisibility<T>(columns: NormalizedColumn<T>[]) {
	const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(() => buildDefaultVisibleKeys(columns));

	useEffect(() => {
		setVisibleColumnKeys((prev) => {
			const columnKeySet = new Set(columns.map((column) => column.__columnKey));
			const kept = prev.filter((key) => columnKeySet.has(key));
			const keptSet = new Set(kept);
			const appended = columns
				.filter((column) => !keptSet.has(column.__columnKey))
				.filter((column) => column.hideable === false || column.hidden !== true)
				.map((column) => column.__columnKey);

			const next = [...kept, ...appended];
			if (next.length > 0) return next;

			return buildDefaultVisibleKeys(columns);
		});
	}, [columns]);

	const visibleColumnKeySet = useMemo(() => new Set(visibleColumnKeys), [visibleColumnKeys]);

	const visibleColumns = useMemo(
		() =>
			columns.filter((column) => {
				if (column.hideable === false) return true;
				return visibleColumnKeySet.has(column.__columnKey);
			}),
		[columns, visibleColumnKeySet],
	);

	const toggleColumn = (column: NormalizedColumn<T>, checked: boolean) => {
		if (column.hideable === false) return;

		setVisibleColumnKeys((prev) => {
			const nextSet = new Set(prev);
			if (checked) {
				nextSet.add(column.__columnKey);
				return Array.from(nextSet);
			}

			const visibleCount = columns.filter((item) => item.hideable === false || nextSet.has(item.__columnKey)).length;
			if (visibleCount <= 1) {
				return prev;
			}

			nextSet.delete(column.__columnKey);
			return Array.from(nextSet);
		});
	};

	return {
		visibleColumnKeys,
		visibleColumnKeySet,
		visibleColumns,
		toggleColumn,
	};
}
