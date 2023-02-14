import React from "react";
import { useLayoutEffect } from "react";
import { Translate } from "react-auto-translate";
import './Contact.css'

export const Contact = () => {
  useLayoutEffect(() => {
  window.scrollTo(0, 0)
});

  return (
    <div className="contact-back">
      <div className="shipping-top-info" style={{backgroundColor:"black"}}>
        <h3><Translate>CONTACT</Translate></h3>
      </div>
      <div className="contact-cont">
        <div>
          <div className="aboutus-logo contact-logo" style={{padding:"0px"}}>
            <hr />
            <img src="http://makkajperfumes.com/wp-content/uploads/Makkaj-Logo-1.png" alt="logo" />
            <hr />
          </div>
          <h1 className="contact-head">
          <Translate> Contact us</Translate>
          </h1>
          <p className="contact-para">
          <Translate>  We may have already answered your question in the FAQ page.If not please contact us and we will get back to you as soon as possible
            </Translate> </p>
          <div className="aboutus-logo contact-logo" style={{padding:"0px"}}>
            <hr />
<p><Translate>STORES</Translate></p>
            <hr />
          </div>
          <div className="contact-details-cont">
            <div className="contact-detail">
              <img src="https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg"/>
              <p className="contact-p1">
              <Translate>  JEDDAH - KSA</Translate>
              </p>
              <p className="contact-p2">
              <Translate>  Bab Sharif - King Abdul Aziz,</Translate><br/>
              <Translate>  St: Near Aziza Hotel,</Translate><br/>
              <Translate>  Al Balad - Jeddah</Translate>
              </p>
              <p className="contact-p3">
              <Translate>  Tel: +966 12 648 2433</Translate><br/>
              <Translate>  Fax: +966 12 648 2381</Translate><br/>
              <Translate> Mob: +966 50 523 6069</Translate><br/>
              <Translate> Email: makkaj1@ajmalksa.com</Translate> <br/>              
              <Translate> Web: <a href="http://www.makkajperfumes.com/" target="_blank">http://www.makkajperfumes.com/ </a></Translate> <br/>             
              <Translate> Location: </Translate><a href="https://goo.gl/maps/w9vd785YGT42" target="_blank"> <Translate>https://goo.gl/maps/w9vd785YGT42 </Translate></a>
              </p>
            </div>
            <div className="contact-detail">
              <img src="https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg"/>
              <p className="contact-p1">
              <Translate> GLOBAL VILLAGE</Translate>
              </p>
              <p className="contact-p2">
               <Translate> Global Village – Shop No. 114,</Translate><br/>
               <Translate> Indian Pavilion, Dubai – UAE</Translate>
              </p>
              <p className="contact-p3">
              <Translate>  Tel: 04 3383881</Translate><br/>
              <Translate> Mob: +971 56 1760567</Translate><br/>
              <Translate> Email: info@makkaj.com</Translate> <br/>              
              <Translate> Web: <a href="http://www.makkaj.com/" target="_blank">http://www.makkaj.com/ </a></Translate> <br/>             
              <Translate> Location: </Translate><a href="https://goo.gl/maps/fH6v3E5zzSn" target="_blank"> <Translate>https://goo.gl/maps/fH6v3E5zzSn</Translate></a>
              </p>
            </div>
            <div className="contact-detail">
              <img src="https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg"/>
              <p className="contact-p1">
              <Translate>SHARJAH</Translate>
              </p>
              <p className="contact-p2">
               <Translate> JAMAL UDDIN OUD AND PERFUMES</Translate><br/>
                <Translate> Shop No – 5, Al Husn Square, Shuwaiheen,</Translate><br/>
                <Translate>Sharjah – UAE</Translate>
                <Translate> P.O Box: 19580</Translate>
              </p>
              <p className="contact-p3">
               <Translate> Shop: +971 556060865</Translate><br/>        
              <Translate> Location: </Translate><a href="https://goo.gl/maps/rA1WCPf5YYv" target="_blank"> <Translate>https://goo.gl/maps/rA1WCPf5YYv</Translate></a>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
