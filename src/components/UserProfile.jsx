export default function UserProfile({ onLogout }) {
  return (
    <div className="d-flex align-items-center">
      <span className="text-light me-3">admin</span>
      <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
        Выйти
      </button>
    </div>
  );
}
