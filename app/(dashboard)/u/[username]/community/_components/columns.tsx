"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import UnblockButton from "./unblock-button";

export type BlockedUser = {
	id: string;
	userId: string;
	imageUrl: string;
	username: string;
	createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
	{
		accessorKey: "username",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Username
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-x-4">
				<UserAvatar
					username={row.original.username}
					imageUrl={row.original.imageUrl}
				/>
				<span>
					{row.original.username}
				</span>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Fecha de bloqueo
				<ArrowUpDown className="ml-2 w-4 h-4" />
			</Button>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <UnblockButton userId={row.original.userId} />
	},
];
