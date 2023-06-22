const express = require("express");
const app = express();
const connect = require("./db/mongodb")
const router = require("./routes/route")
const user = require("./routes/user")

const cors = require("cors");

const { errorMiddleware } = require("./middlewares/middlewares")
app.use(cors());
app.use(express.static("uploads"));
const URL = "mongodb+srv://adityadixit113:jmQFE3f02Q18DMyw@cluster0.eoo3agr.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
})
app.use("/auth", router)
app.use("/user", user)
app.use(errorMiddleware)

const port = 9090

connect(URL).then(data => {
  app.listen(port, () => {
    console.log("Database Connected ,Server Running On Port", port);

  })
}).catch(err => {
  console.log("Error Connecting to the database");
})
