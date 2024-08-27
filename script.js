document.getElementById('urlForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const longUrl = document.getElementById('longUrl').value;
    const shortUrl = generateShortUrl();

    fetch('urls.json')
        .then(response => response.json())
        .then(data => {
            data[shortUrl] = longUrl;
            return fetch('urls.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            document.getElementById('shortUrlContainer').innerHTML = `
                <p>Your shortened URL: <a href="${longUrl}" target="_blank">url.brt.ar/${shortUrl}</a></p>
            `;
        })
        .catch(error => console.error('Error:', error));
});

function generateShortUrl() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
        shortUrl += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortUrl;
}
