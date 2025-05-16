const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const router = express.Router();

// Remplacez par votre ID de propriété GA4
const PROPERTY_ID = 'G-VSTPWZ42BT';

const client = new BetaAnalyticsDataClient({
  keyFilename: '../service-account.json'
});

router.get('/', async (req, res) => {
  try {
    const [response] = await client.runReport({
      name: `properties/${PROPERTY_ID}:runReport`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'totalUsers' },
        { name: 'eventCount' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: { value: 'download' }
        }
      }
    });

    const stats = {
      visits: response.rows[0].metricValues[0].value,
      downloads: response.rows[0].metricValues[1].value
    };

    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la requête GA4 :', error);
    res.status(500).json({ error: 'Impossible de récupérer les statistiques' });
  }
});

module.exports = router;