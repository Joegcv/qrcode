fetch('/stats')
  .then(res => res.json())
  .then(data => {
    document.getElementById('visits').textContent = data.visits;
    document.getElementById('downloads').textContent = data.downloads;
  })
  .catch(err => console.error('Erreur :', err));