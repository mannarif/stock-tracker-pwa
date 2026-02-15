const KEY = "demo_user";

export function signup(email) {
  const user = { email, loggedIn: true };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function login(email) {
  const user = { email, loggedIn: true };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function getUser() {
  return JSON.parse(localStorage.getItem(KEY));
}
