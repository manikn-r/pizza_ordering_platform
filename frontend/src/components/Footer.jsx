const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
      {/* Brand Section */}
        <div className="footer-section brand">
          <h3>Aura Pizza</h3>
          <p>Delivering hot, fresh, and delicious pizzas right to your doorstep. Taste the magic in every single bite!</p>
        </div>

        {/* Catchy Promo Section (Replaces Quick Links) */}
        <div className="footer-section promo">
          <h4>Stay Cheesy, Stay Notified 🍕</h4>
          <p>Join the Aura family for exclusive weekend discounts, secret menu drops, and free garlic bread alerts.</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Feed us your email..." />
            <button type="button">Subscribe</button>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Aura Pizza. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;