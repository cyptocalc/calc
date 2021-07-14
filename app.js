const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/calc/assets'));

app.get('/', (req, res) => {
  res.sendFile( __dirname + '/calc/index.html' );
});

app.get('/api-calc', async (req, res) => {
  try {
    const data = await fetch('https://api.cryptowat.ch/markets/huobi/btchusd/price?apikey=9HZJQFW30CBDQYXPDHIJ');
    const { result } = await data.json();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port , () => {
  console.log(`App listening on port ${port}!`)
});
