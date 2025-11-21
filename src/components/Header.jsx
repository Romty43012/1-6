import Nav from "./Nav";

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">Мой проект</span>
      <Nav />
    </nav>
  );
}
