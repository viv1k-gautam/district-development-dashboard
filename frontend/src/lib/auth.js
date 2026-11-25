// Login ke baad ka session (tokens + user) browser mein yahan rakhte hain.
// "Remember me" ON  -> localStorage   (browser band karne par bhi bacha rehta hai)
// "Remember me" OFF -> sessionStorage (tab band hote hi ud jata hai)
// Dhyan: localStorage mein token XSS se risky hota hai. Student project ke liye theek hai,
// production mein httpOnly cookie behtar hai.

const KEY = "dhdad_session";

function whichStore() {
  if (localStorage.getItem(KEY)) return localStorage;
  if (sessionStorage.getItem(KEY)) return sessionStorage;
  return null;
}

function read() {
  const store = whichStore();
  if (!store) return null;
  try {
    return JSON.parse(store.getItem(KEY));
  } catch {
    return null;
  }
}

export function saveSession({ tokens, user }, remember) {
  logout();
  (remember ? localStorage : sessionStorage).setItem(
    KEY,
    JSON.stringify({ tokens, user })
  );
}

export const isLoggedIn = () => Boolean(read()?.tokens?.access);
export const getAccessToken = () => read()?.tokens?.access ?? null;
export const getRefreshToken = () => read()?.tokens?.refresh ?? null;
export const getUser = () => read()?.user ?? null;

function update(change) {
  const store = whichStore();
  const session = read();
  if (!store || !session) return;
  store.setItem(KEY, JSON.stringify(change(session)));
}

export const updateAccessToken = (access) =>
  update((s) => ({ ...s, tokens: { ...s.tokens, access } }));

export const saveUser = (user) => update((s) => ({ ...s, user }));

export function logout() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}