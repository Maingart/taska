const express = require('express');
const cors = require('cors');

const PORT = 3000;

const app = express()

app.use(cors())

const result = {
    'empty': 0,
    'error': 1,
    'success': 2,
};

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

app.post('/promocode', express.json(), (req, res) => {
    const { promocode } = req.body;

    if (promocode === '') {
        res.json({ status: result.empty });
    } else {
        res.json({ status: Math.random() > 0.5 ? result.error : result.success });
    }
})

