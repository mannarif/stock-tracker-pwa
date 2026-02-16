export async function fetchStockPrice(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`;

  const res = await fetch(url);
  const data = await res.json();

  const price =
    data.chart.result[0].meta.regularMarketPrice;

  return price;
}
