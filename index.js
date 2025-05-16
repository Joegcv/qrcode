const express = require('express');
const path = require('path');
const { setInterval } = require('timers');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Charger la route /stats
app.use('/stats', require('./routes/stats'));

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// Ping auto toutes les 14 minutes (un peu moins que les 15 min de timeout Render)
setInterval(() => {
  const http = require('http');
  http.get(`http://localhost:${PORT}/health`, (res) => {
    if (res.statusCode === 200) {
      console.log('Ping réussi - application active');
    } else {
      console.error('Erreur lors du ping');
    }
  }).on('error', (err) => {
    console.error('Erreur réseau :', err.message);
  });
}, 14 * 60 * 1000); // Toutes les 14 minutes