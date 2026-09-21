import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type MembershipPlan = "paddock" | "grid" | "factory";

export type LocalAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  membershipPlan: MembershipPlan;
  joinedAt: string;
};

type ActionResult = { ok: boolean; message: string };

type AccountContextValue = {
  currentUser: LocalAccount | null;
  isPaidMember: boolean;
  login: (email: string, password: string) => ActionResult;
  register: (name: string, email: string, password: string) => ActionResult;
  logout: () => void;
  setMembershipPlan: (plan: MembershipPlan) => void;
};

const DEMO_ACCOUNT: LocalAccount = {
  id: "demo-driver",
  name: "Alex Morgan",
  email: "driver@daily.test",
  password: "TrackMode26!",
  membershipPlan: "grid",
  joinedAt: "2026-09-01",
};

const ACCOUNTS_KEY = "daily-driver-local-accounts-v1";
const SESSION_KEY = "daily-driver-local-session-v1";
const AccountContext = createContext<AccountContextValue | null>(null);

function readAccounts(): LocalAccount[] {
  try {
    const stored = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!stored) return [DEMO_ACCOUNT];
    const accounts = JSON.parse(stored) as LocalAccount[];
    return accounts.some((account) => account.email === DEMO_ACCOUNT.email) ? accounts : [DEMO_ACCOUNT, ...accounts];
  } catch {
    return [DEMO_ACCOUNT];
  }
}

function readSession(accounts: LocalAccount[]): LocalAccount | null {
  try {
    const sessionId = window.localStorage.getItem(SESSION_KEY);
    return accounts.find((account) => account.id === sessionId) ?? null;
  } catch {
    return null;
  }
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<LocalAccount[]>(readAccounts);
  const [currentUser, setCurrentUser] = useState<LocalAccount | null>(() => readSession(readAccounts()));

  useEffect(() => {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) window.localStorage.setItem(SESSION_KEY, currentUser.id);
    else window.localStorage.removeItem(SESSION_KEY);
  }, [currentUser]);

  const login = (email: string, password: string): ActionResult => {
    const account = accounts.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!account) return { ok: false, message: "That email and password do not match a local Daily Driver account." };
    setCurrentUser(account);
    return { ok: true, message: "Welcome back to the paddock." };
  };

  const register = (name: string, email: string, password: string): ActionResult => {
    const normalizedEmail = email.trim().toLowerCase();
    if (accounts.some((account) => account.email.toLowerCase() === normalizedEmail)) return { ok: false, message: "An account with that email already exists." };
    if (password.length < 6) return { ok: false, message: "Use at least 6 characters for the prototype password." };
    const account: LocalAccount = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password, membershipPlan: "paddock", joinedAt: new Date().toISOString().slice(0, 10) };
    setAccounts((items) => [...items, account]);
    setCurrentUser(account);
    return { ok: true, message: "Your Daily Driver account is ready." };
  };

  const logout = () => setCurrentUser(null);

  const setMembershipPlan = (plan: MembershipPlan) => {
    if (!currentUser) return;
    const updated = { ...currentUser, membershipPlan: plan };
    setCurrentUser(updated);
    setAccounts((items) => items.map((item) => item.id === updated.id ? updated : item));
  };

  const value = useMemo<AccountContextValue>(() => ({
    currentUser,
    isPaidMember: currentUser?.membershipPlan === "grid" || currentUser?.membershipPlan === "factory",
    login,
    register,
    logout,
    setMembershipPlan,
  }), [accounts, currentUser]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used inside AccountProvider");
  return context;
}