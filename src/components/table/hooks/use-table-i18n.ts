import { useTranslation } from "react-i18next";

export function useTableI18n() {
	const { t } = useTranslation();

	return {
		searchPlaceholder: t("table.searchPlaceholder"),
		searchAriaLabel: t("table.searchAriaLabel"),
		columnFilterButtonText: t("table.columnFilterButton"),
		columnFilterTitle: t("table.columnFilterTitle"),
		emptyText: t("table.emptyText"),
		prevText: t("table.prev"),
		nextText: t("table.next"),
		summaryText: (params: { total: number; current: number; totalPages: number }) =>
			t("table.summary", {
				total: params.total,
				current: params.current,
				totalPages: params.totalPages,
			}),
		pageSizeText: (size: number) => t("table.pageSizeText", { size }),
		unnamedColumn: (index: number) => t("table.unnamedColumn", { index }),
	};
}
