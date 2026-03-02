// server/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Дозволяємо всі запити
app.use(cors());

const BASE_URL = "https://erc.chv.ua/borg/index.php";

app.get('/api/orgs', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL);
        res.send(response.data);
    } catch (error) {
        console.error("Помилка на сервері:", error.message);
        res.status(500).send("Помилка");
    }
});

app.get('/api/debt', async (req, res) => {
    const { osr, org } = req.query;
    try {
        const targetUrl = `${BASE_URL}?osr=${osr}&org=${org}&submit_button=1`;
        const response = await axios.get(targetUrl);
        res.send(response.data);
    } catch (error) {
        console.error("Помилка на сервері:", error.message);
        res.status(500).send("Помилка");
    }
});

// ЗМІНИЛИ ПОРТ НА 3001
app.listen(3001, () => console.log("Бекенд працює на http://localhost:3001"));