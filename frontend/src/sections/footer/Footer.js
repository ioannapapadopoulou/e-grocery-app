import React from 'react';
import 'assets/css/Footer.css';
import { Link } from 'react-router-dom';
import Facebook from 'assets/svgs/facebook.svg';
import Instagram from 'assets/svgs/instagram.svg';
import Twitter from 'assets/svgs/twitter.svg';
import Linkedin from 'assets/svgs/linkedin.svg';
import Visa from 'assets/svgs/visa.svg';
import creditCard from 'assets/svgs/credit-card.svg';
import Paypal from 'assets/svgs/paypal.svg';

function Footer() {
  return (
    <footer>
      <div className="container2">
        <div className="row2">
          <div className="footer-col">
            <h4>E-shop</h4>
            <ul>
              <li>
                <Link to="#">About us</Link>
              </li>
              <li>
                <Link to="#">Our Services</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Who we are</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Opening hours</h4>
            <ul>
              <li>
                <Link to="#">Monday - 09:30-20:00</Link>
              </li>
              <li>
                <Link to="#">Tuesday - 09:30-20:00</Link>
              </li>
              <li>
                <Link to="#">Wednesday - 09:30-20:00</Link>
              </li>
              <li>
                <Link to="#">Thursday - 09:30-20:00</Link>
              </li>
              <li>
                <Link to="#">Friday - 09:30-20:00</Link>
              </li>
              <li>
                <Link to="#">Saturday - 09:30-20:00</Link>
              </li>
              <li>
                <Link to="#">Sunday - Closed</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Informations</h4>
            <ul>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Shipping</Link>
              </li>
              <li>
                <Link to="#">Order Status</Link>
              </li>
              <li>
                <Link to="#">Payment Options</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow us</h4>
            <div className="social-links">
              <img src={Facebook} alt="" width="20" />
              <img src={Instagram} alt="" width="20" />
              <img src={Twitter} alt="" width="20" />
              <img src={Linkedin} alt="" width="20" />
            </div>
            <div className="payment-cards">
              <h5>Powered by</h5>
              <img src={Visa} alt="visa" width="60" />
              <img src={creditCard} alt="visa" width="60" />
              <img src={Paypal} alt="visa" width="80" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
