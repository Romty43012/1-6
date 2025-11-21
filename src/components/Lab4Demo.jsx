import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../store/counterSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Container from "./Container";

export default function Lab4Demo() {
  const { theme, toggleTheme } = useTheme();
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localCount, setLocalCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("Компонент смонтирован");
    setMounted(true);

    return () => {
      console.log("Компонент размонтирован");
    };
  }, []);

  useEffect(() => {
    console.log("Локальный счетчик:", localCount);
  }, [localCount]);

  return (
    <Container>
      <div className="p-4">
        <h2>Демонстрация функциональности лабораторной работы 4</h2>

        <div className="mb-4 p-3 border rounded">
          <h4>1. Context - изменение темы (день/ночь)</h4>
          <p>
            Текущая тема: <strong>{theme === "light" ? "День" : "Ночь"}</strong>
          </p>
          <Button onClick={toggleTheme}>
            Переключить на {theme === "light" ? "ночь" : "день"}
          </Button>
        </div>

        <div className="mb-4 p-3 border rounded">
          <h4>2. useState - простой пример</h4>
          <p>
            Локальный счетчик: <strong>{localCount}</strong>
          </p>
          <div className="d-flex gap-2">
            <Button onClick={() => setLocalCount(localCount + 1)}>
              Увеличить
            </Button>
            <Button onClick={() => setLocalCount(localCount - 1)}>
              Уменьшить
            </Button>
            <Button onClick={() => setLocalCount(0)}>Сбросить</Button>
          </div>
        </div>

        <div className="mb-4 p-3 border rounded">
          <h4>3. useEffect - монтирование и размонтирование</h4>
          <p>
            Статус компонента:{" "}
            <strong>{mounted ? "Смонтирован" : "Размонтирован"}</strong>
          </p>
          <p>Открыть консоль браузера, чтобы увидеть логи</p>
        </div>

        <div className="mb-4 p-3 border rounded">
          <h4>4. Redux - счетчик с actions и reducer</h4>
          <p>
            Redux счетчик: <strong>{count}</strong>
          </p>
          <div className="d-flex gap-2">
            <Button onClick={() => dispatch(increment())}>Увеличить</Button>
            <Button onClick={() => dispatch(decrement())}>Уменьшить</Button>
            <Button onClick={() => dispatch(reset())}>Сбросить</Button>
          </div>
        </div>

        <div className="mb-4 p-3 border rounded">
          <h4>5. React Router - навигация</h4>
          <p>Используйте ссылки в меню для перехода между страницами</p>
          <div className="d-flex gap-2">
            <Button onClick={() => navigate("/lab4/counter")}>
              Страница счетчика
            </Button>
            <Button onClick={() => navigate("/lab4/theme")}>
              Страница темы
            </Button>
            <Button onClick={() => navigate("/lab4")}>Главная Lab4</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
