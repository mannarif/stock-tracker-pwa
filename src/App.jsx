import { useEffect, useState } from "react";
import AddStock from "./components/AddStock";
import StockRow from "./components/StockRow";
import { loadStocks, saveStocks } from "./utils/storage";

export default function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setStocks(loadStocks());
  }, []);

  const addStock = (stock) => {
    const updated = [...stocks, stock];
    setStocks(updated);
    saveStocks(updated);
  };

  const removeStock = (id) => {
    const updated = stocks.filter(s => s.id !== id);
    setStocks(updated);
    saveStocks(updated);
  };

  return (
    <div className="container">
      <h2>📊 Stock Tracker</h2>

      <AddStock onAdd={addStock} />

      <div className="table">
        <div className="header">
          <span>Stock</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Total</span>
          <span></span>
        </div>

        {stocks.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No stocks added
          </p>
        )}

        {stocks.map(stock => (
          <StockRow
            key={stock.id}
            stock={stock}
            onRemove={removeStock}
          />
        ))}
      </div>
    </div>
  );
}
