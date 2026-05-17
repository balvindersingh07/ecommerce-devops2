import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">Nexus Store</div>
          <p className="footer__desc">
            Fashion-forward electronics and wearable tech — crafted for motion,
            light, and tomorrow.
          </p>
        </div>
        <div>
          <h3 className="footer__heading">Shop</h3>
          <ul className="footer__links">
            <li>
              <Link to="/products">All products</Link>
            </li>
            <li>
              <Link to="/products?category=electronics">Electronics</Link>
            </li>
            <li>
              <Link to="/products?category=fashion">Fashion</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="footer__heading">Support</h3>
          <ul className="footer__links">
            <li>
              <a href="#">Shipping</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="footer__heading">Social</h3>
          <div className="footer__social">
            <a href="#" aria-label="Twitter" className="footer__social-btn">
              𝕏
            </a>
            <a href="#" aria-label="Instagram" className="footer__social-btn">
              ◎
            </a>
            <a href="#" aria-label="Discord" className="footer__social-btn">
              ◇
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Nexus Store. DevOps capstone demo.</span>
        </div>
      </div>
    </footer>
  );
}
