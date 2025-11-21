import Nav from "./Nav";
import UserProfile from "./UserProfile";
export default function Header({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Мой проект</span>
      <div className="d-flex align-items-center">
        <Nav />
        {isLoggedIn && <UserProfile onLogout={onLogout} />}
      </div>
    </nav>
  );
}
