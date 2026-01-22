import "dotenv/config"
import express from "express";
import {prisma} from "@repo/db"

const PORT = 3000;
const app = express();
app.post("/signup", (req, res) => {
  res.json({
    msg: "signup",
  });
});
app.post("/signin", (req, res) => {
  res.json({
    msg: "signin",
  });
});
app.post("/room", (req, res) => {
  res.json({
    msg: "room",
  });
});

app.post("/db",async(req,res)=>{
  const user = await prisma.user.findMany();
  res.json({
    user
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
