import {type Request} from "express"
import {type JwtPayload} from "jsonwebtoken"
import { type WebSocket } from "ws"

export interface CustomRequest extends Request{
    user? : {id:string}
}

export interface CustomJwtPayload extends JwtPayload{
    id?:string
}

export interface CustomWebSocket extends WebSocket{
    user:{id:string}
}