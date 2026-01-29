import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string[] };
  id: string;
}) {
  const [chats, setChats] = useState();
  const { loading, socket } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          //
        }
      };
    }
  });
}
