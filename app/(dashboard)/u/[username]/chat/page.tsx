import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import ToggleCard from "./_components/toggle-card";

const ChatPage = async () => {
	const self = await getSelf();
	const stream = await getStreamByUserId(self.id);

	if (!stream) {
		throw new Error("Stream not found");
	}

	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">
				Configuración del chat
				</h1>
			</div>
			<div className="space-y-4">
				<ToggleCard
					field="isChatEnabled"
					label="Habilitar chat"
					value={stream.isChatEnabled}
				/>
				<ToggleCard
					field="isChatDelayed"
					label="Habilitar retraso en el chat"
					value={stream.isChatDelayed}
				/>
				<ToggleCard
					field="isChatFollowersOnly"
					label="Habilitar chat solo para seguidores"
					value={stream.isChatFollowersOnly}
				/>
			</div>
		</div>
	);
};

export default ChatPage;