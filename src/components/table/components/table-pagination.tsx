import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

interface TablePaginationProps {
	current: number;
	totalPages: number;
	pageSize: number;
	pageSizeOptions: number[];
	onPageChange: (nextPage: number) => void;
	onPageSizeChange: (value: string) => void;
	summaryText: string;
	prevText: string;
	nextText: string;
	getPageSizeText: (size: number) => string;
}

export function TablePagination({
	current,
	totalPages,
	pageSize,
	pageSizeOptions,
	onPageChange,
	onPageSizeChange,
	summaryText,
	prevText,
	nextText,
	getPageSizeText,
}: TablePaginationProps) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			<div className="text-sm text-muted-foreground">{summaryText}</div>
			<div className="flex items-center gap-2">
				<Select value={String(pageSize)} onValueChange={onPageSizeChange}>
					<SelectTrigger className="w-[110px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{pageSizeOptions.map((option) => (
							<SelectItem key={option} value={String(option)}>
								{getPageSizeText(option)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => onPageChange(current - 1)}
					disabled={current <= 1}
				>
					<ChevronLeftIcon className="size-4" />
					{prevText}
				</Button>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => onPageChange(current + 1)}
					disabled={current >= totalPages}
				>
					{nextText}
					<ChevronRightIcon className="size-4" />
				</Button>
			</div>
		</div>
	);
}
