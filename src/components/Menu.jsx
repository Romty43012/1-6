import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

export default function Menu({ onSelectLab, selectedLab }) {
  const labs = [1, 2, 3, 4];
  const location = useLocation();
  const isLab4 = selectedLab === 4;

  return (
    <div className="list-group">
      {labs.map((lab) => (
        <div key={lab} className="mb-2">
          <Button
            onClick={() => onSelectLab(lab)}
            style={{
              width: "100%",
              backgroundColor: selectedLab === lab ? "#0d6efd" : "#fff",
              color: selectedLab === lab ? "#fff" : "#000",
              border:
                selectedLab === lab ? "1px solid #0d6efd" : "1px solid #ccc",
            }}
          >
            Лабораторная {lab}
          </Button>
        </div>
      ))}

      {isLab4 && (
        <div className="mt-3 p-2 border rounded">
          <h6>Навигация (React Router):</h6>
          <div className="d-flex flex-column gap-2">
            <Link
              to="/lab4"
              className={`btn btn-sm ${
                location.pathname === "/lab4"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              style={{ textDecoration: "none" }}
            >
              Главная Lab4
            </Link>
            <Link
              to="/lab4/counter"
              className={`btn btn-sm ${
                location.pathname === "/lab4/counter"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              style={{ textDecoration: "none" }}
            >
              Счетчик (Redux)
            </Link>
            <Link
              to="/lab4/theme"
              className={`btn btn-sm ${
                location.pathname === "/lab4/theme"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              style={{ textDecoration: "none" }}
            >
              Тема (Context)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
