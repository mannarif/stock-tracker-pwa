import { useEffect, useState } from "react";
import "./styles.css";

const DB_KEY = "stocks_db";

// mock price generator
const getLivePrice = (buyPrice) => {
  const variance = (Math.random() * 10) - 5;
  return +(buyPrice + variance).toFixed(2);
};

export default function App() {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    buyPrice: "",
    targetAmount: ""
  });

  // load DB
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(DB_KEY)) || [];
    setStocks(data);
  }, []);

  // auto refresh prices every 10 sec
  useEffect(() => {
    const timer = setInterval(refreshPrices, 10000);
    return () => clearInterval(timer);
  }, [stocks]);

  const saveDB = (data) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    setStocks(data);
  };

  const addStock = () => {
    if (!form.name) return;

    const stock = {
      id: Date.now(),
      ...form,
      quantity: +form.quantity,
      buyPrice: +form.buyPrice,
      targetAmount: +form.targetAmount,
      livePrice: getLivePrice(+form.buyPrice)
    };

    saveDB([...stocks, stock]);
    setForm({ name: "", quantity: "", buyPrice: "", targetAmount: "" });
  };

  const refreshPrices = () => {
    const updated = stocks.map(s => ({
      ...s,
      livePrice: getLivePrice(s.buyPrice)
    }));
    saveDB(updated);
  };

  return (
    <div className="container">
      <h2>📈 Stock Tracker</h2>

      <div className="form">
        <input placeholder="Stock Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Qty" type="number" value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input placeholder="Buy Price" type="number" value={form.buyPrice}
          onChange={e => setForm({ ...form, buyPrice: e.target.value })} />
        <input placeholder="Target Amount" type="number" value={form.targetAmount}
          onChange={e => setForm({ ...form, targetAmount: e.target.value })} />

        <button onClick={addStock}>Add Stock</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Buy</th>
            <th>Live</th>
            <th>Value</th>
            <th>Target</th>
          </tr>
        </thead>

        <tbody>
          {stocks.map(s => {
            const currentValue = s.quantity * s.livePrice;
            const targetHit = currentValue >= s.targetAmount;

            return (
              <tr key={s.id} className={targetHit ? "target-hit" : ""}>
                <td>{s.name}</td>
                <td>{s.quantity}</td>
                <td>₹{s.buyPrice}</td>
                <td>₹{s.livePrice}</td>
                <td>₹{currentValue.toFixed(2)}</td>
                <td>₹{s.targetAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="refresh" onClick={refreshPrices}>
        🔄 Refresh Prices
      </button>
    </div>
  );
      }
