export async function fetchStockPrice(symbol) {
  try {
    // Convert SBIN.NS → SBIN.IN (stooq format)
    const clean = symbol.replace(".NS", "").replace(".BO", "");
    const url = `https://stooq.com/q/l/?s=${clean.toLowerCase()}.in&f=sd2t2ohlcv&h&e=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data?.data || !data.data[0]?.c) return 0;

    return Number(data.data[0].c);
  } catch (e) {
    return 0;
  }
}
