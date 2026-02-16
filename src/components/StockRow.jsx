import { useEffect, useState } from "react";
import { fetchLivePrice } from "../api/stocks";

export default function StockRow({ stock, onRemove }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const load = async () => {
      const p = await fetchLivePrice(stock.symbol);
      setPrice(p);
    };

    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [stock.symbol]);

  const totalValue = price * stock.quantity;
  const targetHit =
    stock.targetAmount && totalValue >= stock.targetAmount;

  return (
    <div className={`row ${targetHit ? "target-hit" : ""}`}>
      <span>{stock.symbol}</span>
      <span>{stock.quantity}</span>
      <span>₹ {price.toFixed(2)}</span>
      <span>₹ {totalValue.toFixed(2)}</span>

      <button
        className="remove-btn"
        onClick={() => onRemove(stock.id)}
      >
        ❌
      </button>
    </div>
  );
}
