const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https'); // ДОДАЛИ БІБЛІОТЕКУ ДЛЯ HTTPS

const app = express();

// Дозволяємо всі запити
app.use(cors());

const BASE_URL = "https://erc.chv.ua/borg/index.php";

// МАГІЯ 2.0: Ігноруємо помилки SSL-сертифікатів
const httpsAgent = new https.Agent({ 
    rejectUnauthorized: false 
});

// Максимально повна імітація реального браузера Google Chrome
const axiosConfig = {
    httpsAgent,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    }
};

app.get('/api/orgs', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL, axiosConfig);
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
        const response = await axios.get(targetUrl, axiosConfig);
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