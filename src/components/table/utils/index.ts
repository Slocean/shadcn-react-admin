import type React from "react";
import type { ColumnDataIndex, NormalizedColumn, TableColumn } from "../types";

export function getValueByDataIndex<T extends object>(record: T, dataIndex?: ColumnDataIndex<T>): unknown {
	if (dataIndex === undefined || dataIndex === null) {
		return undefined;
	}

	if (Array.isArray(dataIndex)) {
		return dataIndex.reduce<unknown>((acc, key) => {
			if (acc === null || acc === undefined) return undefined;
			return (acc as Record<string | number, unknown>)[key];
		}, record);
	}

	if (typeof dataIndex === "string" && dataIndex.includes(".")) {
		return dataIndex.split(".").reduce<unknown>((acc, key) => {
			if (acc === null || acc === undefined) return undefined;
			return (acc as Record<string, unknown>)[key];
		}, record);
	}

	return (record as Record<PropertyKey, unknown>)[dataIndex as PropertyKey];
}

export function stringifyValue(value: unknown): string {
	if (value === null || value === undefined) return "";
	if (Array.isArray(value)) return value.map((item) => stringifyValue(item)).join(" ");
	if (typeof value === "object") return JSON.stringify(value);
	return String(value);
}

export function getTitleText(title: React.ReactNode, fallback: string): string {
	if (typeof title === "string") return title;
	if (typeof title === "number") return String(title);
	return fallback;
}

export function normalizeColumns<T>(columns: TableColumn<T>[]): NormalizedColumn<T>[] {
	return columns.map((column, index) => ({
		...column,
		__columnKey: String(column.key ?? column.dataIndex ?? index),
		__columnIndex: index,
	}));
}
