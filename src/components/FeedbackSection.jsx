import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FEEDBACK_KEY = "lab4_feedback_items";

export default function FeedbackSection() {
  const [reviews, setReviews] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(FEEDBACK_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn("Не удалось загрузить отзывы", error);
      return [];
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      message: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify(reviews));
    }
  }, [reviews]);

  const createId = useCallback(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

  const onSubmit = useCallback(
    (values) => {
      const newReview = {
        id: createId(),
        name: values.name,
        message: values.message,
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev].slice(0, 10));
      reset();
    },
    [createId, reset]
  );

  return (
    <section className="mt-4 p-4 border rounded">
      <h4 className="mb-3">Обратная связь</h4>
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label">Имя</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", {
                  required: "Введите имя",
                  minLength: {
                    value: 2,
                    message: "Минимум 2 символа",
                  },
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div>
              <label className="form-label">Комментарий</label>
              <textarea
                rows={4}
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                {...register("message", {
                  required: "Введите сообщение",
                  minLength: {
                    value: 10,
                    message: "Минимум 10 символов",
                  },
                })}
              />
              {errors.message && (
                <div className="invalid-feedback">{errors.message.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправляем..." : "Оставить отзыв"}
            </button>
          </form>
        </div>

        <div className="col-12 col-lg-6">
          <h5>Последние отзывы</h5>
          {reviews.length === 0 && (
            <p className="text-muted">Отзывов пока нет — станьте первым!</p>
          )}
          <div className="d-flex flex-column gap-3">
            {reviews.map((review) => (
              <article key={review.id} className="border rounded p-3 bg-light">
                <header className="d-flex justify-content-between align-items-center mb-2">
                  <strong>{review.name}</strong>
                  <span className="text-muted small">
                    {new Date(review.createdAt).toLocaleString("ru-RU")}
                  </span>
                </header>
                <p className="mb-0">{review.message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

