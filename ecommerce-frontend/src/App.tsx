import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Loader from "./components/Loader";
import Products from "./pages/admin/Products";
import Coupon from "./pages/admin/applications/Coupon";
import Stopwatch from "./pages/admin/applications/Stopwatch";
import Bar from "./pages/admin/charts/Bar";
import Line from "./pages/admin/charts/Line";
import Pie from "./pages/admin/charts/Pie";
import Customers from "./pages/admin/Customers";
import Dashboard from "./pages/admin/Dashboard";
import NewProduct from "./pages/admin/manage/NewProduct";
import ProductManage from "./pages/admin/manage/ProductManage";
import TransactionManage from "./pages/admin/manage/TransactionManage";
import Transactions from "./pages/admin/Transactions";
import Header from "./components/Header";
import Shipping from "./pages/Shipping";
import Login from "./pages/Login";

// Lazy loaded routes
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));

const App = () => (
  <Router>
    <Header />

    <Routes>
      {/* Non-admin routes with a single Suspense fallback */}
      <Route
        path="/*"
        element={
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="search" element={<Search />} />
              <Route path="orders" element={<div>ordser</div>}/>
              <Route path="shipping" element={<Shipping/>}/>
              <Route path="login" element={<Login/>}/>
            </Routes>
          </Suspense>
        }
      />

      {/* Admin routes with proper nesting */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<Loader />}>
            <Routes>
            <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="products/new" element={<NewProduct />} />
              <Route path="products/:id" element={<ProductManage />} />
              <Route path="transactions/:id" element={<TransactionManage />} />
              <Route path="line" element={<Line />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="stopwatch" element={<Stopwatch />} />
              <Route path="coupon" element={<Coupon />} />
            </Routes>
          </Suspense>
        }
      />
    </Routes>
  </Router>
);

export default App;
