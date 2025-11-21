import Nav from "./Nav";
import UserProfile from "./UserProfile";

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">Мой проект</span>
      <div className="d-flex gap-4 align-items-center">
        <Nav />
        <UserProfile />
      </div>
    </nav>
  );
}
