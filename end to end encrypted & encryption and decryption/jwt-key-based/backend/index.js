const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
require("dotenv").config();

app.use(cors())

app.use(
    express.json({
        limit: "50mb"
    })
);

app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true
    })
);

app.post("/encrypt", async (req, res, next) => {
    try {
        const { data, key, expiresIn, algorithm = "HS256" } = req.body;
        const token = expiresIn ? jwt.sign({ data }, key, { expiresIn, algorithm }) : jwt.sign({ data }, key, { algorithm })
        res.send(token);
    } catch (error) {
        next(error)
    }
});

app.post("/decrypt", async (req, res, next) => {
    try {
        const { key, token } = req.body;
        let data = jwt.verify(token, key);
        res.send(data.data)
    } catch (error) {
        if (error?.message == "jwt expired" ||  error?.message === "invalid signature") return res.send(error)
        next(error)
    }
});

app.use((req, res, next) => {
    const error = new Error(`404_Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        isError: true,
        errMsg: err?.message,
        errObj: err
    });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Server: ListeningOn Port: ${PORT}!`));
