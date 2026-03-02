const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Дозволяємо всі запити
app.use(cors());

const BASE_URL = "https://erc.chv.ua/borg/index.php";

// Магія тут: прикидаємося звичайним браузером Google Chrome з України
const axiosConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }
};

app.get('/api/orgs', async (req, res) => {
    try {
        // Передаємо наші фейкові заголовки браузера
        const response = await axios.get(BASE_URL, axiosConfig);
        res.send(response.data);
    } catch (error) {
        console.error("Помилка на сервері (orgs):", error.message);
        res.status(500).send("Помилка");
    }
});

app.get('/api/debt', async (req, res) => {
    const { osr, org } = req.query;
    try {
        const targetUrl = `${BASE_URL}?osr=${osr}&org=${org}&submit_button=1`;
        // Передаємо фейкові заголовки браузера
        const response = await axios.get(targetUrl, axiosConfig);
        res.send(response.data);
    } catch (error) {
        console.error("Помилка на сервері (debt):", error.message);
        res.status(500).send("Помилка");
    }
});

// Правильний запуск для Render (використовуємо їхній порт)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Бекенд успішно запущено на порту ${PORT}`);
});