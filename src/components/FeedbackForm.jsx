import { useState, useCallback } from "react";

export default function FeedbackForm({ onAddFeedback }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Валидация
      if (!formData.name || !formData.email || !formData.message) {
        alert("Все поля обязательны для заполнения!");
        return;
      }

      if (!formData.email.includes("@")) {
        alert("Введите корректный email!");
        return;
      }

      onAddFeedback(formData);
      setFormData({ name: "", email: "", message: "" });
      alert("Отзыв добавлен!");
    },
    [formData, onAddFeedback]
  );

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleClear = useCallback(() => {
    setFormData({ name: "", email: "", message: "" });
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>Форма обратной связи</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Отзыв</label>
            <textarea
              className="form-control"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Отправить
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Очистить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
