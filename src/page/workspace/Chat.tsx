import { TeamChat } from "@/components/workspace/chat/team-chat";

export default function Chat() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Team Chat</h2>
        <p className="text-muted-foreground">
          Communicate with your team in real-time
        </p>
      </div>
      <TeamChat />
    </div>
  );
}