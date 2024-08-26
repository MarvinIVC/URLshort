// functions/shorten.js
const urlDatabase = {};

const generateShortId = () => Math.random().toString(36).substr(2, 8); // Simple ID generator

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const { longUrl } = JSON.parse(event.body);
            const shortId = generateShortId();
            const shortUrl = `https://yourdomain.com/${shortId}`; // Update with your actual deployed domain

            // Store the URL in the database (in-memory)
            urlDatabase[shortId] = longUrl;

            return {
                statusCode: 200,
                body: JSON.stringify({ shortUrl }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to process request' }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
};
