import { useMemo } from "react";
import { Info } from "lucide-react";

import Hint from "../hint";

interface ChatInfoProps {
	isDelay: boolean;
	isFollowersOnly: boolean;
};

const ChatInfo = ({
	isDelay,
	isFollowersOnly,
}: ChatInfoProps) => {
	const hint = useMemo(() => {
		if (isFollowersOnly && !isDelay) {
			return "Solo los seguidores pueden hablar";
		}

		if (!isFollowersOnly && isDelay) {
			return "Los mensajes están retrasados por 3 segundos.";
		}

		if (isFollowersOnly && isDelay) {
			return "Solo los seguidores pueden chatear. Los mensajes están retrasados por 3 segundos.";
		}

		return "";
	}, [isDelay, isFollowersOnly]);

	const label = useMemo(() => {
		if (isFollowersOnly && !isDelay) {
			return "Solo seguidores";
		}

		if (!isFollowersOnly && isDelay) {
			return "Modo lento";
		}

		if (isFollowersOnly && isDelay) {
			return "Solo seguidores y modo lento.";
		}

		return "";
	}, [isDelay, isFollowersOnly]);

	if (!isDelay && !isFollowersOnly) {
		return null;
	}

	return (
		<div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
			<Hint label={hint}>
				<Info className="h-4 w-4" />
			</Hint>
			<p className="text-xs font-semibold">
				{label}
			</p>
		</div>
	);
};

export default ChatInfo;