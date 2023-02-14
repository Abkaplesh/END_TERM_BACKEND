import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./sliderbtn.css";
import "./testimonial.css";

export default function Testimonial(props) {
  const {datas}=props;
  return (
    <div
      className="testimonial"
      style={{
        backgroundImage: "url('images/slider/img6.png')",
      }}
    >
      <OwlCarousel
        style={{ zIndex: "auto" }}
        className="owl-themes"
        dots={true}
        navText={[
          "<div className='nav-btn prev-slides'><</div>",
          "<div className='nav-btn next-slides'>></div>",
        ]}
        lazyLoad={true}
        autoplay={true}
        items={1}
        loop
        margin={0}
        nav
        responsiveClass={true}
      >
        <div class="items">
          <div className="testimonial-img">
            <img src="images/testimonials/test1.png" alt="" />
          </div>
          <div className="testimonial-para1">
            <p>
            Makkaj Perfumes are crafted in style that explore our most indulgent emotions, inspired by the world of Holy Makkah and the opulent No1 perfumes are crafted using the finest and most exquisite ingredients.
            </p>
          </div>
          <div className="testimonial-para2">
            <p>Parvez Khan</p>
          </div>
          {/* <div className="testimonial-para3">
            <p>{datas.testimonialname.INR}</p>
          </div> */}
        </div>
        <div class="items">
          <div className="testimonial-img">
            <img src="images/testimonials/test2.png" alt="" />
          </div>
          <div className="testimonial-para1">
            <p>
            A decadent and indulgent perfume offer channelling unique heightened states of emotion through potent perfume accords crafted through a pioneering perfume technology, untraceable and bespoke to Makkaj Perfumes.
            </p>
          </div>
          <div className="testimonial-para2">
            <p>Zeenath Parveen</p>
          </div>
          {/* <div className="testimonial-para3">
            <p>{datas.testimonialname1.INR}</p>
          </div> */}
        </div>
        <div class="items">
          <div className="testimonial-img">
            <img src="images/testimonials/test3.png" alt="" />
          </div>
          <div className="testimonial-para1">
            <p>
            From Woody leathers to Floral, Woody, Leathery orientals, this collection is an ode to memories written in perfume using rare and precious ingredients form across the globe.</p>
          </div>
          <div className="testimonial-para2">
            <p>Faisal Rizvi</p>
          </div>
          {/* <div className="testimonial-para3">
            <p>{datas.testimonialname1.INR}</p>
          </div> */}
        </div>
      </OwlCarousel>
    </div>
  );
}
