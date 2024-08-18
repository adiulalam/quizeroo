import { appRouter } from "@/server/api/root";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createContext } from "./context";
import { WebSocketServer } from "ws";

const port = process.env.WSS_PORT ? +process.env.WSS_PORT : 3001;

const wss = new WebSocketServer({
  port,
});

const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

console.log(`✅ WebSocket Server listening on ws://localhost:${port}`);

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
