"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { UploadDropzone } from '@/lib/uploadthing';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ElementRef, useRef, useState } from 'react';
import { useTransition } from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Hint from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface InfoModalProps {
	initialName: string;
	initialThumbnailUrl: string | null;
};

const InfoModal = ({
	initialName,
	initialThumbnailUrl,
}: InfoModalProps) => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [isPending, startTransition] = useTransition();
	const [name, setName] = useState<string>(initialName);
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialThumbnailUrl);
	const router = useRouter();


	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(() => {
			updateStream({ name: name })
				.then((data) => {
					toast.success(`Nombre de la transmisión actualizado a. ${data.name}`);
					closeRef.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onRemove = () => {
		startTransition(() => {
			updateStream({ thumbnailUrl: null })
				.then(() => {
					toast.success("Miniatura removida");
					setThumbnailUrl(null);
					closeRef.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" className='ml-auto'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Editar la infirmacion del stream
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => onSubmit(e)}
					className='space-y-14'
				>
					<div className='space-y-2'>
						<Label>
							Nombre
						</Label>
						<Input
							placeholder='Stream Name'
							onChange={onChange}
							value={name}
							disabled={isPending}
						/>
					</div>
					<div className='space-y-2'>
						<Label>
							Miniatura
						</Label>
						{thumbnailUrl ? (
							<div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
								<div className='absolute top-2 right-2 z-[10]'>
									<Hint label='Remove thumbnail' asChild side='left'>
										<Button
											type='button'
											disabled={isPending}
											onClick={onRemove}
											className='h-auto w-auto p-1.5'
										>
											<Trash className='w-4 h-4' />
										</Button>
									</Hint>
								</div>
								<Image
									src={thumbnailUrl}
									alt='Thumbail'
									fill
									className='object-cover'
								/>
							</div>
						) : (
							<div className='rounded-xl border outline-dashed outline-muted'>
								<UploadDropzone
									endpoint='thumbnailUploader'
									appearance={{
										label: {
											color: "#FFFFFF",
										},
										allowedContent: {
											color: "#FFFFFF"
										}
									}}
									onClientUploadComplete={(res) => {
										setThumbnailUrl(res[0].url);
										router.refresh();
										closeRef.current?.click();
									}}
								/>
							</div>
						)}
					</div>
					<div className='flex justify-between'>
						<DialogClose asChild ref={closeRef}>
							<Button
								type='button'
								variant='ghost'
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							variant="primary"
							type='submit'
						>
							Guardar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InfoModal;