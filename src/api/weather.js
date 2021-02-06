const uuid = require('uuid');
const api = new Map();

api.set('get', (_, res) => {
  res.send([
    { 
      cityId: uuid.v4(),
      name: 'Oyun',
      temperature: (15 + Math.random() * 5).toFixed(2),
      humidity: `${(18 + Math.random() * 7).toFixed(2)}%`,
    },
    { 
      cityId: uuid.v4(),
      name: 'Dammam',
      temperature: (15 + Math.random() * 5).toFixed(2),
      humidity: `${(18 + Math.random() * 7).toFixed(2)}%`,
    }
  ]);
});

module.exports = api;