import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const v1 = 'assets/images/v1.jpg';
const v2 = 'assets/images/v2.jpg';
const v3 = 'assets/images/v3.jpg';

export default function Carousels() {
  return (
    <section className="mt-5">
      <Carousel fade>
        <Carousel.Item>
          <div
            className="d-block bg-img-center"
            style={{ backgroundImage: `url(${v1})` }}
            alt="First slide"
          />
          <div className="position-absolute top-0 left-0 text-white carousel-slide-dark-bg">
            <div className="text-white carousel-slide-dark-bg">
              <div className="content d-flex flex-column justify-content-center align-items-center align-items-sm-start w-75 mx-auto pt-sm-5">
                <h1 className="title px-2 py-4 lh-lg text-center text-sm-start">Manage Inventory</h1>
                <h2 className="subtitle px-2 py-4 lh-base d-sm-block d-none">Manage your inventory using our inventory management system</h2>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block bg-img-center"
            style={{ backgroundImage: `url(${v2})` }}
            alt="Second slide"
          />
          <div className="position-absolute top-0 left-0 text-white carousel-slide-dark-bg">
            <div className="text-white carousel-slide-dark-bg">
              <div className="content d-flex flex-column justify-content-center align-items-center align-items-sm-start w-75 mx-auto pt-sm-5">
                <h1 className="title px-2 py-4 lh-lg text-center text-sm-start">Sales Tracking</h1>
                <h2 className="subtitle px-2 py-4 lh-base d-sm-block d-none">Track your sales, manage inventory and earn profits</h2>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block bg-img-center"
            style={{ backgroundImage: `url(${v3})` }}
            alt="Third slide"
          />
          <div className="position-absolute top-0 left-0 text-white carousel-slide-dark-bg">
            <div className="text-white carousel-slide-dark-bg">
              <div className="content d-flex flex-column justify-content-center align-items-center align-items-sm-start w-75 mx-auto pt-sm-5">
                <h1 className="title px-2 py-4 lh-lg text-center text-sm-start">Analyze Sales</h1>
                <h2 className="subtitle px-2 py-4 lh-base d-sm-block d-none">Analyze your sales, make actionable decision and plan accordingly</h2>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <hr />
    </section>
  );
}
