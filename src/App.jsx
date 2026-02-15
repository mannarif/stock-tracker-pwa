import { useEffect, useState } from "react";
import { login, signup, logout, getUser } from "./auth";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user) {
    return (
      <div className="card">
        <h2>Welcome</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <button onClick={() => setUser(signup(email))}>Sign Up</button>
        <button onClick={() => setUser(login(email))}>Login</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>{user.email}</p>
      <button onClick={() => { logout(); setUser(null); }}>Logout</button>
    </div>
  );
}
