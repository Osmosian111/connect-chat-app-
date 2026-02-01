"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import { useToken } from "../context/TokenContext";

export function useSocket() {
  const [socketLoading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();
  const token = useToken();

  useEffect(() => {
    if (!token) return;
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    ws.onopen = () => {
      console.log("socket is Loading.");
      setLoading(false);
      setSocket(ws);
    };
    return () => ws.close();
  }, [token]);

  return {
    socketLoading,
    socket,
  };
}
