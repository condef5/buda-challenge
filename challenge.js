const Buda = require('buda-promise');
const buda = new Buda();

async function fetchSpread() {
  const { markets } = await buda.markets();
  const promises = markets.map(async market => {
    return buda.ticker(market.id).then(({ ticker }) => ({
      market: market.id,
      spread: ticker.min_ask[0] - ticker.max_bid[0]
    }));
  });

  Promise.all(promises).then(data => {
    console.log(data);
  });
}

fetchSpread();
