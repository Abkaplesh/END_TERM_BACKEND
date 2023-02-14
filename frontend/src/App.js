import "./App.css";
import Topbar from "./components/home/topbar";
import Navbar from "./components/home/navbar";
import { Homescreen } from "./screens/Homescreen/Homescreen";
import { Footer } from "./components/Footer/footer";
import { Aboutus } from "./screens/Aboutus/Aboutus";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./screens/Products/Products";
import { PressRoom } from "./screens/PressRoom/PressRoom";
import { Stores } from "./screens/Stores/Stores";
import { Contact } from "./screens/Contact/Contact";
import { Dahnaloudh } from "./screens/Dahnaloudh/Dahnaloudh";
import { Forher } from "./screens/Forher/Forher";
import { Forhim } from "./screens/Forhim/Forhim";
import { Concentrate } from "./screens/Concentrate/Concentrate";
import { Bakhoor } from "./screens/Bakhoor/Bakhoor";
import { Deliveryandreturn } from "./screens/DeliveryandReturn/Deliveryandreturn";
import { Privacypolicy } from "./screens/privacypolicy/Privacypolicy";
import { Termsandconditions } from "./screens/Termsandconditions/Termsandconditions";
import { Shippingpolicy } from "./screens/Shippingpolicy/Shippingpolicy";
import { Cart } from "./screens/cart/cart";
import { Checkout } from "./screens/checkout/checkout";
import { Shipping } from "./screens/shipping/Shipping";
import { Paymentscreen } from "./screens/Paymentscreen/Paymentscreen";
import { Orderconfirmation } from "./screens/Orderconfirmation/Orderconfirmation";
import { AddAddress } from "./screens/add address/add address";
import { MyOrders } from "./screens/myorders/myorders";
import { Address } from "./screens/Addresspage/Address";
import { Addshipping } from "./screens/Addshipping";
import { Wishlist } from "./screens/wishlist/wishlist";
import { ChangePass } from "./screens/changepassword/changepassword";
import { Writereview } from "./screens/writereview/writereview";
import ResultPage from "./screens/Paymentscreen/components/ResultPage";
import CheckoutPage from './screens/Paymentscreen/components/CheckoutPage'
import {Translator, Translate} from 'react-auto-translate';

function App() {

  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem('translations')) || {})[key] || {})[
        language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem('translations')) || {
        [key]: {},
      };
      existing[key] = {...existing[key], [language]: value};
      localStorage.setItem('translations', JSON.stringify(existing));
    },
   };

  return (
    <Translator
    cacheProvider={cacheProvider}
    from='en'
    to={localStorage.getItem("translate")==null?"ar":localStorage.getItem("translate")}
    googleApiKey='AIzaSyBP69X7YPk53fC7LWCO6hpHQm5wxt2qL2I'
  >
    <Router>
      <>
        <Topbar />
        <Navbar />
        <Switch>
          <Route path="/" component={Homescreen} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/about-us" component={Aboutus} />
          <Route path="/products" component={Products} exact />
          <Route path="/press-room" component={PressRoom} />
          <Route path="/contact" component={Contact} />
          <Route path="/for-her" component={Forher} />
          <Route path="/concentrate" component={Concentrate} />
          <Route path="/dahn-al-oudh" component={Dahnaloudh} />
          <Route path="/bakhoor" component={Bakhoor} />
          <Route path="/delivery-and-return" component={Deliveryandreturn} />
          <Route path="/privacy-policy" component={Privacypolicy} />
          <Route path="/terms-and-conditions" component={Termsandconditions} />
          <Route path="/shipping-policy" component={Shippingpolicy} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Paymentscreen} />
          <Route path="/orders" component={Orderconfirmation} />
          <Route path="/add-address" component={Address} />
          <Route path="/myorders" component={MyOrders} />
          <Route path="/add-shipping" component={Addshipping} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/writereview" component={Writereview} />
          <Route path="/result" component={ResultPage} />
          <Route path="/checkouts" component={CheckoutPage} />
          <Route path="/category/:id" component={Forhim} />

          <Route path="/details/:productid" component={Stores} />
          <Route path="/passwordreset/:userId/:token" component={ChangePass} />
        </Switch>
        <Footer />
      </>
    </Router>
    </Translator>
  );
}

export default App;
