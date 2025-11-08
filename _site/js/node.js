const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/toppers', (req, res) => {
    const toppersDir = path.join(__dirname, 'public/img/toppers');
    fs.readdir(toppersDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        res.json({ count: files.length, files });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});