import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { JWT_SECRET } from "@repo/common/config";
import { CustomJwtPayload, CustomRequest } from "@repo/common/types";

export function middleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers["authorization"];
  if (!auth) {
    console.warn("auth is missing");
    return res.json({
      msg: "Not Authorized",
    });
  }
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) {
    console.warn("token is missing");
    return res.json({
      msg: "Not Authorized",
    });
  }

  try {
    const verify = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    if (!verify || !verify.id) {
      console.warn("Verified without having id");
      return res.json({
        msg: "Not Authorized",
      });
    }
    req.user = { id: verify.id };
  } catch (error) {
    console.error({ msg: "token verfy failed.", error });
    return res.json({
      msg: "Not authorized",
    });
  }
  next();
}
