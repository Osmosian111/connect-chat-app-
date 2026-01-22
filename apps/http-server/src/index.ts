import express from "express";

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

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
