import { useId, useState } from "react";

// components
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationAlert } from "@/components/delete-confirmation-alert";

// icons
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

// models
import type { AssociationDataModel } from "@/@types/association/AssociationDataModel";

// hooks
import { useDeleteAssociationMutation } from "@/http/hooks/association.hooks";
import { AssociationUpdate } from "./-update";

// -----------------------------------------------------------------------------

type Props = {
	item: AssociationDataModel;
};

// -----------------------------------------------------------------------------

export function AssociationActions({ item }: Props) {
	const id = useId();
	const [open, setOpen] = useState(false);

	const [showEdit, setShowEdit] = useState(false);
	const [showDeleteConfirmationAlert, setShowDeleteConfirmationAlert] =
		useState(false);

	const { mutateAsync: removeAssociationFn } = useDeleteAssociationMutation(item.id)

	async function handleDelete() {
		await removeAssociationFn();

	}

	return (
		<>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					>
						<Ellipsis className="h-4 w-4" />
						<span className="sr-only">Abrir menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent id={id} align="end">
					<DropdownMenuItem
						className="flex items-center justify-between"
						onSelect={() => setShowEdit(true)}
					>
						Editar
						<Pencil className="w-3 h-3 text-secondary-foreground" />
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="flex items-center justify-between text-red-500 focus:text-red-500"
						onSelect={() => setShowDeleteConfirmationAlert(true)}
					>
						Deletar
						<Trash2 className="w-3 h-3 text-red-500" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AssociationUpdate open={showEdit} setOpen={setShowEdit} item={item} />

			<DeleteConfirmationAlert
				isPending={false}
				open={showDeleteConfirmationAlert}
				setOpen={setShowDeleteConfirmationAlert}
				onConfirm={handleDelete}
			/>
		</>
	);
}