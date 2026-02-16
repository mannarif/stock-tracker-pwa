import { useState } from "react";

export default function AddStock({ onAdd }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const submit = () => {
    if (!symbol || !quantity) return;

    onAdd({
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      buyPrice: Number(buyPrice),
      targetAmount: Number(targetAmount)
    });

    setSymbol("");
    setQuantity("");
    setBuyPrice("");
    setTargetAmount("");
  };

  return (
    <div className="add-form">
      <input placeholder="Stock (RELIANCE.NS)"
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
      />
      <input type="number" placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <input type="number" placeholder="Buy Price"
        value={buyPrice}
        onChange={e => setBuyPrice(e.target.value)}
      />
      <input type="number" placeholder="Target Amount"
        value={targetAmount}
        onChange={e => setTargetAmount(e.target.value)}
      />
      <button onClick={submit}>➕ Add Stock</button>
    </div>
  );
}
