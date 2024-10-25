const express = require('express');
const app = express();
const PORT = 3000;

app.get('/send', (req, res) => {
    const message = req.query.message || 'Hello!';
    require('./src/producer').sendMessage(message);
    res.send(`Message sent: ${message}`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
