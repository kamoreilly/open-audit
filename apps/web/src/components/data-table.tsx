import type { ColumnDef } from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={String(column.accessorKey)}>
								{column.header?.toString() || String(column.accessorKey)}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.length ? (
						data.map((row, index) => (
							<TableRow key={index}>
								{columns.map((column) => (
									<TableCell key={String(column.accessorKey)}>
										{String(
											(row as Record<string, unknown>)[
												String(column.accessorKey)
											] ?? ""
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
