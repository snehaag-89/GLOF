import React from 'react';
import './Footer.css'; // We'll create this CSS file

const Footer = () => {
  return (
    <footer className="jeevan-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>JeevanSetu</h3>
          <p>Your Bridge to Safety</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Emergency Contacts</a></li>
            <li><a href="#">Safety Guidelines</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Evacuation Plans</a></li>
            <li><a href="#">Weather Updates</a></li>
            <li><a href="#">Volunteer Sign-up</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📞 Emergency Hotline: 1078</p>
          <p>📧 Email: help@jeevansetu.org</p>
          <p>🏢 Address: Disaster Management Authority, India</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JeevanSetu. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;