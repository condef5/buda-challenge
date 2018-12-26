const Buda = require('buda-promise');
const express = require('express');
const randomColor = require('randomcolor');
const buda = new Buda();
const app = express();

app.use(express.static('public'));

app.get('/', async (req, res) => {
  res.sendFile('index.html');
});

app.get('/api', async (req, res) => {
  const data = await fetchSpread();
  res.send(data);
});

async function fetchSpread() {
  const { markets } = await buda.markets();
  const promises = markets.map(async market => {
    return buda.ticker(market.id).then(({ ticker }) => ({
      market: market.id,
      spread: ticker.min_ask[0] - ticker.max_bid[0],
      color: randomColor()
    }));
  });
  return Promise.all(promises).then(data => data);
}

app.listen('8000', () => {
  console.log('server is running');
});
