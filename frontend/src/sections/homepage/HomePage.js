import React from 'react';
import CarouselProductSlider from 'components/carousel/CarouselProductSlider';
import CarouselSlider from 'components/carousel/CarouselSliderHomepage';
import about from 'assets/images/about.jpg';
import 'assets/css/HomePage.css';

function HomePage() {
  return (
    <section className="homepage">
      <CarouselSlider />
      <div className="container2">
        <div className="row2">
          <section className="sectionGeneral">
            <div className="left-half">
              <img src={about} alt="shopping bag" width="280" />
            </div>

            <div className="right-half">
              <h4>A Few Words About Out Store</h4>
              <h2>About Us</h2>
              <p>
                E-Grocery is a family-owned grocery store that has been offering
                quality products for your everyday life since 1999, while also
                providing superior service and competitive prices.
              </p>
            </div>
          </section>
          <section className="sectionArticle">
            <div className="column">
              <h2>Quality Products</h2>
              <p>
                We work with the best suppliers to offer our customers the fresh
                grocery products of the highest quality.
              </p>
            </div>

            <div className="column">
              <h2>Affortable Prices</h2>
              <p>
                Thanks to our affordable pricing policy, our customers don’t
                have to overpay for the products they need.
              </p>
            </div>

            <div className="column">
              <h2>Fast Shipping</h2>
              <p>
                Our store offers fast worldwide shipping to all customers
                regardless of what and how much you order.
              </p>
            </div>

            <div className="column">
              <h2>Open 24/7</h2>
              <p>
                Unlike other grocery shops, we are ready to serve you 24/7 and
                offer the best selection of groceries.
              </p>
            </div>
          </section>

          <section className="sectionCarouselProduct">
            <div className="header-sales">
              <h2>Sales over -10%</h2>
              <h4>Mega Sales!</h4>
            </div>
            <CarouselProductSlider />
          </section>

          <div className="address-section">
            <div className="address-title">
              <h1>Address</h1>
            </div>
            <div className="address-information">
              <p>Healing Center, 176 W Streetname,New York, NY 10014, US</p>
              <p>(+71) 8522369417</p>
              <p>egrocery@domain.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
