import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const initials = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="d-flex align-items-center gap-3 text-white">
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
        }}
      >
        {initials}
      </div>

      <div className="d-none d-md-flex flex-column">
        <span className="fw-semibold">{user.name}</span>
        <small>{user.email}</small>
      </div>

      <Button
        onClick={logout}
        style={{
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
        }}
      >
        Выйти
      </Button>
    </div>
  );
}

