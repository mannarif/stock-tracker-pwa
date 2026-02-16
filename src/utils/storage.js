export const loadStocks = () =>
  JSON.parse(localStorage.getItem("stocks") || "[]");

export const saveStocks = (stocks) =>
  localStorage.setItem("stocks", JSON.stringify(stocks));
