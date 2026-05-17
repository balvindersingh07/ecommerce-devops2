import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "./Navbar.css";

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__blur" aria-hidden />
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">Nexus</span>
          <span className="navbar__tag">Store</span>
        </Link>

        <label className="navbar__search-wrap">
          <span className="visually-hidden">Search products</span>
          <svg className="navbar__search-icon" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.79-4.49 6.5 6.5 0 10-6.5 6.5 6.471 6.471 0 004.49-1.79l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 13.99 14 11.5 14z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search fashion & electronics..."
            className="navbar__search"
          />
        </label>

        <nav className="navbar__nav" aria-label="Main">
          <NavLink to="/products" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/checkout" className={navClass}>
            Checkout
          </NavLink>
          <NavLink to="/admin" className={navClass}>
            Admin
          </NavLink>
          <Link to="/cart" className="navbar__cart" aria-label="Cart">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.15.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="navbar__cart-badge">{totalItems}</span>
            )}
          </Link>
          <button type="button" className="navbar__profile" aria-label="Profile">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

function navClass({ isActive }) {
  return `navbar__link ${isActive ? "navbar__link--active" : ""}`.trim();
}
