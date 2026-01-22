import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection",(ws,req)=>{
    ws.on("message",(msg)=>{
        let data;
        try {
            data = JSON.parse(msg.toString())
        } catch (error) {
            console.log("Icorrct incoming message format")
            ws.close()
            return
        }
        ws.send(JSON.stringify(data));
    })
})
