import { Button } from "@/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { getTitleText } from "../utils";
import type { NormalizedColumn } from "../types";

interface ColumnVisibilityMenuProps<T> {
	columns: NormalizedColumn<T>[];
	visibleColumnKeySet: Set<string>;
	onToggleColumn: (column: NormalizedColumn<T>, checked: boolean) => void;
	buttonText: string;
	titleText: string;
	unnamedColumn: (index: number) => string;
}

export function ColumnVisibilityMenu<T>({
	columns,
	visibleColumnKeySet,
	onToggleColumn,
	buttonText,
	titleText,
	unnamedColumn,
}: ColumnVisibilityMenuProps<T>) {
	const visibleCount = columns.filter((item) => item.hideable === false || visibleColumnKeySet.has(item.__columnKey)).length;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button type="button" variant="outline" size="sm">
					{buttonText}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-52">
				<DropdownMenuLabel>{titleText}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{columns.map((column) => {
					const checked = column.hideable === false || visibleColumnKeySet.has(column.__columnKey);
					const disabled = column.hideable === false || (checked && visibleCount <= 1);
					const title = getTitleText(column.title, unnamedColumn(column.__columnIndex + 1));

					return (
						<DropdownMenuCheckboxItem
							key={column.__columnKey}
							checked={checked}
							disabled={disabled}
							onCheckedChange={(nextChecked) => {
								onToggleColumn(column, nextChecked === true);
							}}
						>
							{title}
						</DropdownMenuCheckboxItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
