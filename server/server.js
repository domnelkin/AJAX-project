const express = require('express')
const cors = require("cors");
const fs = require("fs");

const app = express()
const port = 3000

app.use(
    cors({
        origin: "*",
    })
);

app.get('/', (req, res) => {
  res.json(`${JSON.stringify(readJsonFile("Users.json"))}`);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})

const readJsonFile = (file) => {
    const data = fs.readFileSync(file);
    const users = JSON.parse(data);
    return users;
}