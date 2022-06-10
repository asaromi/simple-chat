const express = require("express")
const routes = require("./src/routes/index")
const app = express()
const cors = require("cors")
const { Sequelize } = require("sequelize")
require("dotenv").config()

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, APP_PORT } = process.env
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
})

sequelize
  .authenticate()
  .then(() => console.log("Create connection successfully"))
  .catch((err) => console.log("[ERR] ", err))

app.use(cors())
app.use(express.json())
app.use("/", routes)

app.listen(APP_PORT, () => console.log("Server Running at port "+APP_PORT))