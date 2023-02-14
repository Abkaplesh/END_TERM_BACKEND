import React, { useEffect, useState } from "react";
import "./Termsandconditions.css";
import logo from "../../assets/images/crest-large.png";
import axios from "axios";
import { Translate } from "react-auto-translate";
import { useLayoutEffect } from "react";


export const Termsandconditions = () => {
  const [datas, setdatas] = useState(null);

  useEffect(async () => {
    const { data } = await axios.get(`http://localhost:5000/api/termcond`);
    setdatas(data.user[0].html);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  
  console.log(datas)
  return datas!=null?(
    <div className="aboutus-container">
    <div className="aboutus-logo">
      <hr />
      <img src={logo} />
      <hr />
    </div>
    <div className="aboutus-head">
      <h1><Translate>Terms & Conditions</Translate></h1>
    </div>
    <div className="aboutus-container-box">


      <div className="about-us-decor">

        <div>
          <p>
          <ol className="term-ol">
            <li>INTRODUCTION
              <ul className="term-ul">
                <li>
                  www.makkajperfumes.com (the “Website”) is owned by and/or operated by or on behalf of Al Majeed Modern Industry for Perfume Manufacturing & Oudh Processing (” Brand: Makkaj Perfumes/we/us”), with delivery services provided by Aramex. Saudi Arabia is Makkaj Perfumes country of domicile.  If you have any questions regarding the Website or these terms and conditions, or in the unlikely event that you have any complaints about any products purchased by you from the Website or through any Applications (as defined below), you can contact us at ecomm@makkaj.com<br/>In case of any disputes, the law applicable would be based on the KSA Governing Law.
                </li>
                <li>
                  If you choose a country in the home page of shop.makkaj.com, then please go through the Terms and Conditions thoroughly which shall apply to your purchase and use of the Website with respect to the country selected.      
                </li>
                <li>USE OF WEBSITE</li>
                <li>
                  These terms and conditions and any other policies referred to in these terms and conditions (including any policies or documents to which a link is provided from these terms and conditions) (together the “Terms”) apply to your use of and access to the Website and any other website or application permitting you to place an order with Makkaj Perfumes for any products and services (such websites and applications being the “Applications” for the purpose of these Terms) including all orders submitted by you for any products or services made available by us for purchase over the Website and/or Applications. As the context requires, references to “Website” in these Terms shall also include Applications as applicable. By accessing this Website and/or the Applications you agree to these Terms and Conditions, we therefore advise you to read these Terms carefully and to save or print a copy of these Terms and Conditions for FUTURE reference. If you do not agree to these Terms, you must cease using and accessing this Website and all Applications immediately. The Terms may be changed and updated from time to time and any changes will be effective from the publication of the new terms on the Website or the relevant Application. Please note that all options available on our Website may not be available on any Application or the Website accessed using a mobile device.
                </li>
                <li>
                  Please note that these Terms do not affect your statutory rights as a consumer.
                </li>
                <li>
                  makkajperfumes.com will not deal or provide any services or products to any of OFAC sanctions countries in compliance with the law of KSA.
                </li>
                <li>You agree that the information you provide when you REGISTER on the Website is not misleading, and is true and accurate in all respects and you will notify our customer service team of any changes to that information.</li>
                <li> We may change, withdraw, or suspend access to the Website (in whole or part and permanently or temporarily) with or without notice and with no LIABILITY to you.</li>
                <li>We accept payments online using Visa and MasterCard credit/debit card in the currency required, SAR/AED. If “Credit Card Online” is selected as the payment methods than the details on the Customers ID (Card holders ID) should exactly match that of the credit card used to make the purchase.</li>
                <li>The Website may include links to other websites or resources (“Linked Websites”). Makkaj Perfumes has no control over the content of Linked Websites and you agree that, should you access a Linked Website using a link from the Website, Makkaj Perfumes is not responsible for the availability of the Linked Websites, and is not liable in any way for the content of Linked Websites, including (without limitation) any goods or services available from such Linked Websites, other advertising or content on such Linked Websites or the use that such Linked Websites make of your personal information. Furthermore Makkaj Perfumes will not be responsible for any offence, damage or loss caused by or connected to the use or reliance on such Linked Websites or the content thereon.</li>
                <li>Makkaj Perfumes may deny your access to the Website at any time in its sole discretion. Examples of when we may so deny your access include but is not limited to where we believe that your use of the Website is in violation of any of these Terms, any law or the rights of any third party or was not respectful to others.</li>
                <li>Any material that you upload to the Website for publication will be considered non-confidential and non-proprietary and we have the right to use, copy, distribute, reproduce, exploit, modify, alter and/or disclose to third parties any such material for any purpose. We also have the right to disclose your identity to any third party who is claiming that any material posted or uploaded by you to our site constitutes a violation of their INTELLECTUAL PROPERTY rights or of their right to privacy.</li>
                <li>Makkaj Perfumes will not be responsible, or liable to you or any third party, for the content or accuracy of any materials posted by you or any other user of the Website and you hereby agree to be responsible to Makkaj Perfumes for and indemnify Makkaj Perfumes and keep Makkaj Perfumes indemnified against all COSTS, damages, expenses, losses and liabilities incurred and/or suffered by Makkaj Perfumes as a result of any claim in respect of your use of the Website.</li>
                <li>Makkaj Perfumes has the right to remove any material or posting you make on the Website in Makkaj Perfume’s sole discretion.</li>
                <li>PURCHASE OF PRODUCTS</li>
                <li>
                  ACCEPTANCE OF ORDERS
                  <ul>
                    <li>
                      All information on the Website is an invitation to treat only and is not an offer or unilateral CONTRACT. You agree that your order is an offer to purchase the products listed in your order (“Products”) from us on the Terms. All orders submitted by you are subject to acceptance by us. We may choose not to accept your order in our discretion for any reason whatsoever without LIABILITY to you. Examples of when we may not accept your order are as follows:<br/>
                      (a) If products are shown on the Website but are not available or are incorrectly priced or otherwise incorrectly described;<br/>
                      (b) If we are unable to obtain authorization of your payment;<br/>
                      If you order multiple quantities of an individual Product where such Products are to be shipped to different customer or delivery address;<br/>
                      (c) If you order multiple quantities of an individual Product where such Products are to be shipped to different customer or delivery address;<br/>
                      (d) If shipping restrictions may apply to a Product; or<br/>
                      (e) If the delivery address you give is the address of an entity or individual providing freight forwarding services.<br/>
                    </li>
                    <li>
                        After submitting an order to us, we will send you an order acknowledgement email with your order number and details of the Products you have ordered from us and details of any delivery services (the “Delivery Services”) you have ordered from Makkaj Perfumes. Please note that this email is an acknowledgement that we have received your order and is not an acceptance of your order. You will be receiving a shipment confirmation email from Makkaj Perfumes which is an acknowledgement that we have accepted your order.<br/><br/>
                        Acceptance of your order and the formation of (a) an order of sale of the Products between us and you and (b) an order for Delivery Services between us and you. In the event Makkaj Perfume partnered with shipping service company Aramex to dispatch the products to end customer and in the meantime, we have sent you an email confirming that the products have been dispatched through Aramex (“Dispatch Confirmation”). Further information is available at Shipping Destinations, Weight, Costs and Delivery Times.
                    </li>
                    <li>When placing an order for the first time, you may be required to or may be offered the option to REGISTER with us and complete certain required fields on an order form. We may provide you with and/or ask you to use identifications and passwords and other means for you to be able to access certain areas of the Website, such as the My Account section of the Website. You shall comply with all security directions and/or recommendations given by us and inform us immediately if you become aware of or suspect any unauthorised use of the Secure Access or if the Secure Access becomes available to an unauthorised party. Without prejudice to our other rights and remedies, we may suspend your access to the Website without LIABILITY to you, if in our reasonable opinion, such action is necessary for safeguarding the Website.</li>
                    <li>Before you submit your order, you will be given the opportunity to review your selection, check the total price of your order and correct any input errors.</li>
                    <li> We do not accept orders where the corresponding delivery address you give is that of an inappropriate. In the event that we do accept any order and we subsequently become aware that the delivery address is inappropriate for such order is that of no services, we shall be entitled to cancel such order upon notice to you by email or telephone.</li>
                  </ul>
                </li>
              </ul>
              
              <li>PRICES
                  <ul>
                    <li>All prices of Products on the Website are the price for the Products only. Find out more about Shipping Destinations, Weight, Costs and Delivery Times.</li>
                    <li>Makkaj Perfumes may vary the prices of Products listed on the Website at any time and without any notice but such changes will not apply to Products in respect of which you have been sent a Dispatch Confirmation.</li>
                  </ul>
                </li>
                <li>PAYMENT TERMS
                  <ul>
                    <li>The total cost of your order will be the purchase price for the Products (which you pay to us) plus any delivery charge. Find out more about Shipping Destinations, Weight, Costs and Delivery Times.</li>
                    <li>Please note that we accept payment in the payment CURRENCY specified for the country of your selected shipping destination in our Payment section.</li>
                    <li> You confirm that the credit/debit card or payment method that is being used is yours and that all details you provide to us in respect thereof including, without limitation, name and address details are complete, correct and accurate . You further confirm that the credit/debit card is valid and the inputted payment details are correct. All credit/debit cardholders and payment ACCOUNT holders are subject to validation checks and authorization by the card issuer or payment method provider. If the issuer of your card or payment method refuses to authorize payment we will not accept your order and we will not be liable for any delay or non-delivery and we are not obliged to inform you of the reason for the refusal.</li>
                    <li>We are not responsible for any charges or other amounts which may be applied by your card issuer or bank or payment method provider as a result of our processing of your credit/debit card payment or other method of payment in accordance with your order.</li>
                    <li>If your credit/debit card or payment method is not denominated in the currency of your PURCHASE INDICATED on the Website, the final price may be charged in the currency of your card or account. Such final price is calculated and charged by your card issuer or bank or payment method provider and therefore we shall not be responsible for any cost, expense, charge or other liability which may be incurred or suffered by you as a result of your card issuer or payment method provider charging you in a different currency other than the currency of your purchase as displayed on the Website.</li>
                  </ul>
                </li>
                <li>INVOICING
                  <ul>
                    <li>Where we elect, or are required by applicable law, to issue or make available an invoice, we reserve the right to issue or make available electronic invoices and you agree to such form of INVOICING.</li>
                  </ul>
                </li>
                <li>DELIVERY AND RISK
                  <ul>
                    <li>We currently deliver the products only within Kingdom Of Saudi Arabia.</li>
                    <li> When you have selected your preferred delivery method from those offered for your selected shipping destination and provided your order has been accepted by us, your order shall be processed by us to dispatch your order in accordance with the estimated delivery times set out at Shipping Destinations, Weight, Costs and Delivery Times. Please refer shipping restrictions before placing an order. Orders received after any specified “cut off” or “last order” time or received on a day which is not a working day (that is any day on which the banks are open for business in KSA which is not a Friday or a Saturday, will be processed on the next working day). Estimated delivery times will be CALCULATED from the date on which the order is processed.</li>
                    <li>As part of the ordering process, you will be contacted for supply of goods by Aramex. Upon placing an order you will receive various email confirmations in relation to your order. In respect of each of these and any other similar email confirmation, please note that references to shipping; express courier; shipping and handling and any other similar terms relate to the services performed by Aramex.</li>
                    <li>Delivery information such as Customer Name, Location Address and Contact Number will be stored for delivery purposes. Other personal identifiable information will not be stored.</li>
                  </ul>
                </li>
                <li>CANCELLATION AND RETURNS
                  <ul>
                    <li>Should you wish to cancel or return any Products, you may only do so in accordance with our Returns & Cancellation policy. This Returns & Cancellation Policy does not affect your statutory rights as a consumer distance selling legislation or e-commerce regulations in the territory to which the product is shipped (“Regulations”).</li>
                    <li>Where you return a Product under the Regulations we will issue you with a full refund but you will need to return the Product at your own cost (if you have already received the Product), unless otherwise specified in our Returns & Cancellation policy.</li>
                  </ul>
                </li>
                <li>AGE REQUIREMENTS
                  <ul>
                    <li> If you order a Product to which a minimum age requirement applies, by ordering that Product you confirm that you are of the required age. If we reasonably believe that you are not legally entitled to order a Product, we reserve the right to cancel your order.</li>
                  </ul>
                </li>
            </li>
            
           
          </ol>

          </p>

        </div>
      </div>


    </div>
  </div>
  ):(<div></div>);
};
