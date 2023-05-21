import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/Contact/About.js";




import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";

import { loadStripe } from "@stripe/stripe-js";
import ElementsLayout from "./component/Route/ElementsLayout.js"
import axios from "axios";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
  // const BASE_URL = "http://localhost:4000"
  const { isAuthenticated, user } = useSelector((state) => state.user);

  //Get our Stripe(Payment Api)

  // const stripePromise = loadStripe('pk_test_51MnnMiSJSEx7GAMC1U3hdu6Idm0QiXAZ6m8twER2eOm2azGqit0AjNGIT6fL1wazxIt0A96K0Q0r5Q4AXIVUY6pE00vXjtHIdC');
  const [stripeApiKey, setStripeApiKey] = useState(process.env.STRIPE_API_KEY);
  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route path="/search" element={<Search />} />

        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        {stripeApiKey && (
            <Route
              element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}
            >
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          )}

       

        <Route element={<ProtectedRoute />}>
            <Route path='/success' element={<OrderSuccess />} />
          </Route>

        <Route element={<ProtectedRoute />}>
            <Route path='/orders' element={<MyOrders />} />
          </Route>

        <Route element={<ProtectedRoute />}>
            <Route path='/order/:id' element={<OrderDetails />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/products' element={<ProductList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/product/new' element={<NewProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/product/:id' element={<UpdateProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/orders' element={<OrderList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/order/:id' element={<ProcessOrder />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/users' element={<UsersList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/user/:id' element={<UpdateUser />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/reviews' element={<ProductReviews />} />
          </Route>

          {/* <Route  path="/"  element={<NotFound/>} /> */}

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
