import { useState } from "react";
export default function AuthForm({ onLogin }) {
  const [form, setForm] = useState({ login: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.login === "admin" && form.password === "admin") onLogin();
    else alert("Неверно! admin/admin");
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Авторизация</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Логин"
                  value={form.login}
                  onChange={(e) => setForm({ ...form, login: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button type="submit" className="btn btn-primary w-100">
                  Войти
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
