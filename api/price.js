export default async function handler(req, res) {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol required" });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`;

    const response = await fetch(url);
    const data = await response.json();

    const price =
      data?.chart?.result?.[0]?.meta?.regularMarketPrice;

    if (!price) {
      return res.status(404).json({ error: "Price not found" });
    }

    res.status(200).json({ price });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
