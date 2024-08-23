const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    shortCode: String,
});

const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortCode = shortid.generate();
    const shortUrl = `http://mwmp.brt.ar/${shortCode}`;

    const newUrl = new Url({ originalUrl, shortUrl, shortCode });
    await newUrl.save();

    res.json({ originalUrl, shortUrl });
});

app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (url) {
        res.redirect(url.originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
