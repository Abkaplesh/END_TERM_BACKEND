import React, { useEffect, useState } from "react";
import ScrollUpButton from "react-scroll-up-button";
import { BsDroplet } from "react-icons/bs";
import { SiSonarlint } from "react-icons/si";
import { CgBee } from "react-icons/cg";
import { AiOutlinePoundCircle } from "react-icons/ai";
import { FiHexagon } from "react-icons/fi";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Homescreen.css";
import "../../css/mainslider.css";
import "../../css/sliderbtn.css";
import Testimonial from "../../components/testimonials/testimonials";
import { useDispatch, useSelector } from "react-redux";
import { getbanner } from "../../actions/banneraction";
import { listPrice, listProducts } from "../../actions/productaction";
import axios from "axios";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

export const Homescreen = () => {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.banner);
  const { banner } = banners;

  const [datas, setdatas] = useState(null);
  const [category, setcategory] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  useEffect(async () => {
    const { data } = await axios.get(`http://localhost:5000/api/home`);
    setdatas(data.user[0]);

    const y = await axios.get(`http://localhost:5000/api/procategory`);
    setcategory(y.data);
  }, []);
  const prices = useSelector((state) => state.priceList);
  const { price } = prices;

  useEffect(() => {
    dispatch(getbanner());
    dispatch(listProducts());
    dispatch(listPrice());
  }, [dispatch]);

  let filterProduct = products.filter(
    (item) => item.category == "bestseller"
  );


  if (banner.length > 0 && datas != null) {
    return price == "INR" ? (
      <>
        <OwlCarousel
          className="owl-theme"
          dots={true}
          navText={[
            "<div className='nav-btn prev-slides'><i class='fa fa-chevron-left'></i></div>",
            "<div className='nav-btn next-slides'><i class='fa fa-chevron-right'></i></div>",
          ]}
          lazyLoad={true}
          autoplay={true}
          items={1}
          autoHeight={false}
          loop
          margin={0}
          nav
        >
          {banner.length > 0 ? (
            banner.map((items, index) => {
              return (
                <div class="item" key={index}>
                  <Link to={items.link}><img src={items.image} alt="" /></Link>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </OwlCarousel>
        <div className="sliderbottom-box">
          <div className="sliderbottom-head1">
            <p>{datas.title.INR}</p>
          </div>
          <div className="sliderbottom-head2">
            <p>{datas.quote.INR}</p>
          </div>
          <div className="sliderbottom-head3">
            <p>{datas.quotetext.INR}</p>
          </div>
          <div className="sliderbottom-icons">
            <div className="sliderbottom-flex">
              <div>
                <BsDroplet />
                <p>{datas.items1.INR}</p>
              </div>
              <div>
                <SiSonarlint />
                <p>{datas.items2.INR}</p>
              </div>
              <div>
                <CgBee />
                <p>{datas.items3.INR}</p>
              </div>
              <div>
                <FiHexagon />
                <p>{datas.items4.INR}</p>
              </div>
              <div>
                <AiOutlinePoundCircle />
                <p>{datas.items5.INR}</p>
              </div>
            </div>
          </div>
          <div className="sliderbottom-know">
           <Link to='/about-us'> <p className="button-know">KNOW MORE</p></Link>
          </div>
        </div>
        <div className="categories">
          <h3>DISCOVER</h3>
          <h1>{datas.imagehead.INR}</h1>
          <div className="row-images">
            { category.map((data,index) => {
              if(index<4){
              return data.home_include==true&&(
                <Link to={`/category/${data.title}`} className="y">
                <div
                  className="firstimage"
                  style={{ backgroundImage: `url(${data.image})` }}
                >
                  <button className="info-label">{data.title}</button>
                </div>
                </Link>
              );}
            })}
          </div>
        </div>

        <div className="largeimage" style={{
        backgroundImage: "url('images/ads.jpg')",
      }}>
          <div className="inner">
            {/* <h1>{datas.imagehead1.INR}</h1> */}
            <h1>THE ART OF PERFUMES</h1>
            
            <div className="borderbottom"></div>
            {/* <p>{datas.image3title.INR}</p> */}
            <p> According to science, the sense of smell is something that evokes strong emotions. That’s how significant perfume is! Therefore, you should be paying more attention to the kind of fragrances you choose to wear for different occasions.</p>
          </div>
        </div>
        <div className="bestseller-section">
          <h3>BEST SELLER</h3>
          <h1> {datas.head4.INR}</h1>
          <div className="bestseller-innersection">
            <div className="first">
              {filterProduct[0]!=null&&<Link to={`/details/${filterProduct[0]._id}`}><div className="divide">
              <img className="bestseller-img-1"
                src={filterProduct[0].image}
                alt="perfume"
              />
              <h3>{filterProduct[0].title}</h3>
              <h4>{getSymbolFromCurrency(price)} {filterProduct[0].price[price]}</h4>
              </div></Link>}
              {filterProduct[1]!=null&&<Link to={`/details/${filterProduct[1]._id}`}><div className="divide1">
              <img className="bestseller-img-1"
                src={filterProduct[1].image}
                alt="perfume"
              />
              <h3>{filterProduct[1].title}</h3>
              <h4>{getSymbolFromCurrency(price)} {filterProduct[1].price[price]}</h4>
              </div></Link>}
            </div>
            <div className="first">
            {filterProduct[2]!=null&&<Link to={`/details/${filterProduct[2]._id}`}><div >
              <img className="bestseller-img-2"
                src={filterProduct[2].image}
                alt="perfume"
              />
              <h3>{filterProduct[2].title}</h3>
              <h4>{getSymbolFromCurrency(price)} {filterProduct[2].price[price]}</h4>
              </div></Link>}
            </div>
            <div className="first">
            {filterProduct[3]!=null&&<Link to={`/details/${filterProduct[3]._id}`}><div className="divide2">
              <img className="bestseller-img-1"
                src={filterProduct[3].image}
                alt="perfume"
              />
              <h3>{filterProduct[3].title}</h3>
              <h4>{getSymbolFromCurrency(price)} {filterProduct[3].price[price]}</h4>
              </div></Link>}
              {filterProduct[4]!=null&&<Link to={`/details/${filterProduct[4]._id}`}><div className="divide3">
              <img className="bestseller-img-1"
                src={filterProduct[4].image}
                alt="perfume"
              />
              <h3>{filterProduct[4].title}</h3>
              <h4>{getSymbolFromCurrency(price)} {filterProduct[4].price[price]}</h4>
              </div></Link>}
            </div>
            <div className="first">
            {filterProduct[5]!=null&&<Link to={`/details/${filterProduct[5]._id}`}><div >
              <img className="bestseller-img-2"
                src={filterProduct[5].image}
                alt="perfume"
              />
              <h3>{filterProduct[5].title}</h3>
              <h4>{getSymbolFromCurrency(price)} {filterProduct[5].price[price]}</h4>
              </div></Link>}
            </div>
          </div>
        </div>

        <Testimonial datas={datas} />
        <ScrollUpButton style={{ width: 75 }} ToggledStyle={{ right: 100 }} />
      </>
    ) : (
      <>
        <OwlCarousel
          style={{ width: "100%", zIndex: "auto",marginTop:"44px" }}
          className="owl-theme"
          dots={true}
          navText={[
            "<div style='font-size:4em' className='nav-btn prev-slides'><</div>",
            "<div style='font-size:4em' className='nav-btn next-slides'>></div>",
          ]}
          lazyLoad={true}
          autoplay={true}
          items={1}
          loop
          margin={0}
          nav
        >
          {banner.length > 0 ? (
            banner.map((items, index) => {
              return (
                <div class="item" key={index}>
                  <img src={items.image} alt="" />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </OwlCarousel>
        <div className="sliderbottom-box">
          <div className="sliderbottom-head1">
            <p>{datas.title.AED}</p>
          </div>
          <div className="sliderbottom-head2">
            <p>{datas.quote.AED}</p>
          </div>
          <div className="sliderbottom-head3">
            <p>{datas.quotetext.AED}</p>
          </div>
          <div className="sliderbottom-icons">
            <div className="sliderbottom-flex">
              <div>
                <BsDroplet />
                <p>{datas.items1.AED}</p>
              </div>
              <div>
                <SiSonarlint />
                <p>{datas.items2.AED}</p>
              </div>
              <div>
                <CgBee />
                <p>{datas.items3.AED}</p>
              </div>
              <div>
                <FiHexagon />
                <p>{datas.items4.AED}</p>
              </div>
              <div>
                <AiOutlinePoundCircle />
                <p>{datas.items5.AED}</p>
              </div>
            </div>
          </div>
          <div className="sliderbottom-know">
            <p className="button-know">KNOW MORE</p>
          </div>
        </div>
        <div className="categories">
          <h3>DISCOVER</h3>
          <h1>{datas.imagehead.AED}</h1>
          <div className="row-images">
            <div className="firstimage">
              
            </div>
            <div className="secondimage">
            
            </div>
            <div className="thirdimage">
             
            </div>
            <div className="fourthimage">
           
            </div>
          </div>
        </div>
        <div className="largeimage">
          <div className="inner">
            <h1>{datas.imagehead1.AED}</h1>
            <div className="borderbottom"></div>
            <p>{datas.image3title.AED}</p>
          </div>
        </div>
        <div className="bestseller-section">
          <h3>BEST SELLER</h3>
          <h1> {datas.head4.AED}</h1>
          <div className="bestseller-innersection">
            <div className="first">
              <div className="divide">
                <img src="/images/falak.png" alt="perfume" />
                <h3>FALAK</h3>
                <h4>₹ 2500 - 3000</h4>
              </div>
              <div className="divide1">
                <img src="/images/qitarah.png" alt="perfume" />
                <h3>QITARAH</h3>
                <h4>₹ 2500 - 3000</h4>
              </div>
            </div>
            <div className="first">
              <img
                style={{ paddingTop: "9rem" }}
                src="/images/reinee.png"
                alt="perfume"
              />
              <h3>REINE</h3>
              <h4>₹ 2500 - 3000</h4>
            </div>
            <div className="first">
              <div className="divide2">
                <img src="/images/antarcticaa.png" alt="perfume" />
                <h3>ANTARCTICA</h3>
                <h4>₹ 2500 - 3000</h4>
              </div>
              <div className="divide3">
                <img src="/images/richess.png" alt="perfume" />
                <h3>RICHES</h3>
                <h4>₹ 2500 - 3000</h4>
              </div>
            </div>
            <div className="first">
              <img
                style={{ paddingTop: "8rem" }}
                src="/images/ravissant.png"
                alt="perfume"
              />
              <h3>RAVISSANT</h3>
              <h4>₹ 2500 - 3000</h4>
            </div>
          </div>
        </div>

        <Testimonial datas={datas} />
        <ScrollUpButton style={{ width: 75 }} ToggledStyle={{ right: 100 }} />
      </>
    );
  }
  return <div></div>;
};
