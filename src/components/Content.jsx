import Container from "./Container";
import { Routes, Route } from "react-router-dom";
import Lab4Demo from "./Lab4Demo";
import CounterPage from "../pages/CounterPage";
import ThemePage from "../pages/ThemePage";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import { useState } from "react";

export default function Content({
  selectedLab,
  feedbacks: propFeedbacks,
  onAddFeedback,
}) {
  const [localFeedbacks, setLocalFeedbacks] = useState([]);
  const handleAddFeedback =
    onAddFeedback ||
    ((feedback) => {
      setLocalFeedbacks((prev) => [...prev, feedback]);
    });
  const displayFeedbacks = onAddFeedback ? propFeedbacks : localFeedbacks;
  const renderContent = () => {
    switch (selectedLab) {
      case 1:
        return (
          <div>
            <h3>Лабораторная работа 1</h3>
            <h4>Требуемые условия завершения:</h4>
            <ul>
              <li>
                Реализовать скрипт, который уведомит о полной загрузке страницы
              </li>
              <li>
                Реализовать кнопку счетчик, которая будет увеличивать счетчик на
                "1" и вывести его значение на страницу (button onclick)
              </li>
              <li>
                Реализовать кнопку счетчик, которая будет уменьшать счетчик на
                "1" реализовать с помощью listener click
              </li>
              <li>
                Реализовать форму аутентификации пользователя (&lt;form&gt;)
              </li>
              <li>Реализовать скрипт очистки данных формы</li>
              <li>
                Реализовать скрипт отправки данных формы с помощью listener
                submit.
              </li>
              <li>
                Без отправки на сервер провести валидацию введенных данных, если
                login=="admin" &amp; pass=="admin" вывести сообщение об успехе,
                иначе сообщение о неуспехе
              </li>
              <li>
                Реализовать скрипт сохранения учетных данных и автоподстановку
                оных с помощью localStorage
              </li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Лабораторная работа 2</h3>
            <h4>Требуемые условия завершения:</h4>
            <ul>
              <li>Создать "Hello World" приложение на основе React.</li>
              <li>Для создания можно использовать create-react-app или vite</li>
              <li>
                Реализовать компонент кнопку, контейнер и использовать их на
                странице
              </li>
              <li>
                Реализовать шаблон страницы и разместить на нем компоненты
                навигации
              </li>
              <li>Разместить проект в репозиторий в github</li>
              <li>Прикрепить текстовый файл с ссылкой на проект</li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Лабораторная работа 3</h3>
            <h4>Требуемые условия завершения:</h4>
            <ul>
              <li>
                Продолжаем задание "Реализовать шаблон страницы и разместить на
                нем компоненты навигации" (Можно использовать готовые библиотеки
                Mui/Bootstrap и тд)
              </li>
              <li>Реализуем компоненты Header, Footer, Menu и Content</li>
              <li>В меню выводим список лабораторных работ</li>
              <li>В Content выводим содержимое лабораторной работы</li>
              <li>Разместить проект в репозиторий в github</li>
              <li>Прикрепить текстовый файл с ссылкой на проект</li>
            </ul>
          </div>
        );
      case 4:
        return (
          <Routes>
            <Route
              path="/lab4"
              element={
                <div>
                  <h3>Лабораторная работа 4</h3>
                  <h4>Требуемые условия завершения:</h4>
                  <ul>
                    <li>
                      Реализовать изменение темы (день/ночь) используя Context
                    </li>
                    <li>useState и useEffect - простые примеры</li>
                    <li>
                      useEffect на монтировании и размонтировании страницы
                    </li>
                    <li>Внедрить в проект react-router</li>
                    <li>В меню проекта реализовать ссылки переходы</li>
                    <li>В Content реализовать обработчик роутов</li>
                    <li>Внедрить в проект redux</li>
                    <li>
                      Реализовать несколько action и reducer, например
                      increment/ decrement счетчика
                    </li>
                  </ul>
                  <hr />
                  <Lab4Demo />
                </div>
              }
            />
            <Route path="/lab4/counter" element={<CounterPage />} />
            <Route path="/lab4/theme" element={<ThemePage />} />
          </Routes>
        );
      case 5:
        return (
          <div>
            <h3>Лабораторная работа 5</h3>
            <h4>Требуемые условия завершения:</h4>
            <ul>
              <li>✅ Форма авторизации с помощью React-hook-forms</li>
              <li>✅ Блок обратной связи (форма + список отзывов)</li>
              <li>✅ Обработка submit форм через useCallback функции</li>
              <li>✅ Кастомный хук useLoginState</li>
              <li>✅ Отображение приложения только при авторизации</li>
              <li>✅ Профиль пользователя с кнопкой разлогина</li>
            </ul>
            <hr />

            <FeedbackForm onAddFeedback={handleAddFeedback} />
            <FeedbackList feedbacks={displayFeedbacks} />
          </div>
        );
      default:
        return <p>Выберите лабораторную из меню.</p>;
    }
  };

  if (selectedLab === 4) {
    return renderContent();
  }

  return (
    <Container>
      <div className="p-3">
        <h2>Содержание лабораторной</h2>
        {renderContent()}
      </div>
    </Container>
  );
}
