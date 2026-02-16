const fetchLivePrice = async (symbol) => {
  try {
    const res = await fetch(`/api/price?symbol=${symbol}`);
    const data = await res.json();
    return data.price || 0;
  } catch {
    return 0;
  }
};
