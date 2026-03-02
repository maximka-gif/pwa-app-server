const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');

const app = express();
app.use(cors());

const BASE_URL = "https://erc.chv.ua/borg/index.php";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const axiosConfig = {
    httpsAgent,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
};

app.get('/api/orgs', async (req, res) => {
    try {
        // Пропускаємо через проксі
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(BASE_URL)}`;
        const response = await axios.get(proxyUrl, axiosConfig);
        res.send(response.data);
    } catch (error) {
        console.error("Помилка (orgs):", error.message);
        res.status(500).send("Помилка");
    }
});

app.get('/api/debt', async (req, res) => {
    const { osr, org } = req.query;
    try {
        const targetUrl = `${BASE_URL}?osr=${osr}&org=${org}&submit_button=1`;
        // Пропускаємо через проксі
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
        const response = await axios.get(proxyUrl, axiosConfig);
        res.send(response.data);
    } catch (error) {
        console.error("Помилка (debt):", error.message);
        res.status(500).send("Помилка");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Бекенд успішно запущено на порту ${PORT}`);
});