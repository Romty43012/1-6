import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AUTH_USER_KEY = "lab4_auth_user";
const REGISTERED_USERS_KEY = "lab4_registered_users";

const AuthContext = createContext(null);

function readFromStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Не удалось прочитать ${key}:`, error);
    return fallback;
  }
}

function writeToStorage(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn(`Не удалось сохранить ${key}:`, error);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readFromStorage(AUTH_USER_KEY, null));
  const [users, setUsers] = useState(() => {
    const storedUsers = readFromStorage(REGISTERED_USERS_KEY, null);

    if (storedUsers && Array.isArray(storedUsers)) {
      return storedUsers;
    }

    return [
      {
        name: "Администратор",
        email: "admin@example.com",
        password: "admin123",
      },
    ];
  });

  useEffect(() => {
    writeToStorage(AUTH_USER_KEY, user);
  }, [user]);

  useEffect(() => {
    writeToStorage(REGISTERED_USERS_KEY, users);
  }, [users]);

  const login = useCallback(
    ({ email, password }) => {
      const existingUser = users.find(
        (item) => item.email === email && item.password === password
      );

      if (existingUser) {
        setUser({ name: existingUser.name, email: existingUser.email });
        return { success: true };
      }

      return { success: false, message: "Неверный email или пароль" };
    },
    [users]
  );

  const registerUser = useCallback(
    ({ name, email, password }) => {
      const emailTaken = users.some((item) => item.email === email);

      if (emailTaken) {
        return { success: false, message: "Такой email уже зарегистрирован" };
      }

      const newUser = { name, email, password };
      setUsers((prev) => [...prev, newUser]);
      setUser({ name, email });

      return { success: true };
    },
    [users]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      registerUser,
    }),
    [user, login, logout, registerUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth должен вызываться внутри AuthProvider");
  }

  return context;
}

