import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";

import { prisma } from "@repo/db";
import { JWT_SECRET } from "@repo/common/config";
import { CustomJwtPayload, CustomWebSocket, User } from "@repo/common/types";
import { WSDataSchema } from "@repo/common/schema";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

let users: User[] = [];

function verifyUser(ws: CustomWebSocket, req: IncomingMessage): void {
  if (!req.url) {
    console.warn("WS:url is missing");
    return;
  }
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get("token");
  if (!token) {
    console.warn("WS:token is missing");
    return;
  }
  try {
    const verify = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    if (!verify || !verify.id) {
      console.warn("Token werified without id");
      return;
    }
    ws.user = { id: verify.id };
  } catch (error) {
    console.warn({
      msg: "Verification failed",
      error,
    });
  }
}

async function addUserIntoUsers(ws: CustomWebSocket) {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: ws.user.id,
      },
      select: {
        memberRooms: {
          select: {
            id: true,
          },
        },
        adminRooms: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      console.warn("User not found in DB.");
      ws.close();
      return;
    }

    users.push({
      id: ws.user.id,
      memberRooms: user.memberRooms.map((r) => r.id),
      adminRooms: user.adminRooms.map((r) => r.id),
      ws,
    });
  } catch (error) {
    console.error(error);
    ws.close();
    return;
  }
}

wss.on("connection", async (ws: CustomWebSocket, req) => {
  verifyUser(ws, req);
  await addUserIntoUsers(ws).then(() => {
    console.log(ws.user.id);
    ws.send(
      JSON.stringify({
        type: "status",
        msg: "Connected to websocket",
      }),
    );
  });
  ws.on("message", async (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch (error) {
      console.error("Icorrct incoming message format");
      ws.close();
      return;
    }

    const parsedData = WSDataSchema.safeParse(data);
    if (!parsedData.success) {
      console.warn({
        msg: "WS: Incoming message format is wrong",
        error: parsedData.error.message,
      });
      ws.close();
      return;
    }
    data = parsedData.data;

    if (data.type == "join_room") {
      const user = users.find((u) => u.id == ws.user.id);
      if (!user) {
        console.warn("User not found");
        ws.close();
        return;
      }
      try {
        await prisma.user.update({
          where: {
            id: ws.user.id,
          },
          data: {
            memberRooms: {
              connect: {
                id: data.room,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
        return ws.send(
          JSON.stringify({
            msg: "Fail to join room",
          }),
        );
      }
      user.memberRooms.push(data.room);
      ws.send(
        JSON.stringify({
          msg: "Joined the room -> " + data.room,
        }),
      );
    }

    if (data.type == "leave_room") {
      const user = users.find((u) => u.id == ws.user.id);
      if (!user) {
        console.warn("User not found");
        ws.close();
        return;
      }

      try {
        const user = await prisma.user.update({
          where: { id: ws.user.id },
          data: {
            memberRooms: {
              disconnect: {
                id: data.room,
              },
            },
          },
          include: {
            memberRooms: true,
          },
        });
      } catch (error) {
        console.error({ msg: "Fail to leave room", error });
        return;
      }
      user.memberRooms = user.memberRooms.filter((room) => room != data.room);
    }

    if (data.type == "chat") {
      const user = users.find((u) => u.id == ws.user.id);
      if (!user) {
        console.log("user is not in users");
        return;
      }
      if (!user.memberRooms.includes(data.room)) {
        return ws.send(
          JSON.stringify({
            msg: "Join room first",
          }),
        );
      }
      users.map((u) => {
        if (u.memberRooms.includes(data.room) && u.id != ws.user.id) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              room: data.room,
              msg: data.message,
            }),
          );
        }
      });
    }
  });

  ws.on("close", () => {
    users = users.filter((u) => {
      u.id != ws.user.id;
    });
  });
});
