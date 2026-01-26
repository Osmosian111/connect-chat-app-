"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");

  const router = useRouter();
  return (
    <div className={styles.page}>
      <input
        type="text"
        placeholder="Room name"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          router.push(`/room/${roomId}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
}
