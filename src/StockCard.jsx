import { useEffect, useState } from "react";
import { fetchStockPrice } from "../api/stocks";

export default function StockCard({ symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    let interval;

    async function loadPrice() {
      const p = await fetchStockPrice(symbol);
      setPrice(p);
    }

    loadPrice(); // initial load

    interval = setInterval(loadPrice, 5000); // 🔁 every 5 sec

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="card">
      <h3>{symbol}</h3>
      <p>
        {price ? `₹ ${price}` : "Loading..."}
      </p>
    </div>
  );
}
