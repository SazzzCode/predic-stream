import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
			<h1 className="text-4xl">404</h1>
			<p>
			No pudimos encontrar al usuario que estabas buscando.
			</p>
			<Button variant="secondary" asChild>
				<Link href="/">
					Back to home
				</Link>
			</Button>
		</div>
	);
};

export default NotFoundPage;