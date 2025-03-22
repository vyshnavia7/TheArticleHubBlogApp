import React from "react";

function Footer() {
  return (
    <div className="p-5 text-white text-center bg-footer footer">
      <div className="container d-flex justify-content-between fw-bold footer-container">
        {/* Quick Links */}
        <div className="row mb-4">
          <div className="col footer-section">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Blog Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Popular Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect With Us */}
        <div className="row mb-4">
          <div className="col footer-section">
            <h5>Connect With Us</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://facebook.com"
                  className="text-white footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="text-white footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-white footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  className="text-white footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  className="text-white footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  className="text-white footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Support */}
        <div className="row mb-4">
          <div className="col footer-section">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white footer-link">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Report an Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Subscribe to The Article Hub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="row">
          <div className="col footer-section">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white footer-link">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 footer-bottom">
        <p className="mb-0">
          &copy; 2025 The Article Hub. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
