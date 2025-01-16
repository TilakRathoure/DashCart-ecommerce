import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import {userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/order"));
const OrderDetails = lazy(() => import("./pages/order-details"));
const NotFound = lazy(() => import("./pages/not-found"));
const Checkout = lazy(() => import("./pages/checkout"));

// Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transactions"));
const Barcharts = lazy(() => import("./pages/admin/charts/Bar"));
const Piecharts = lazy(() => import("./pages/admin/charts/Pie"));
const Linecharts = lazy(() => import("./pages/admin/charts/Line"));
const Coupon = lazy(() => import("./pages/admin/applications/Coupon"));
const Stopwatch = lazy(() => import("./pages/admin/applications/Stopwatch"));
const NewProduct = lazy(() => import("./pages/admin/manage/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/manage/ProductManage")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/manage/TransactionManage")
);

const App = () => {

  const dispatch=useDispatch();

  const [loading,setLoading]=useState<boolean>(true);

  const { user} = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
        setLoading(false);
      } else{
        setLoading(false);
      dispatch(userNotExist())

      };
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/transactions" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/bar" element={<Barcharts />} />
            <Route path="/admin/pie" element={<Piecharts />} />
            <Route path="/admin/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/coupon" element={<Coupon />} />
            <Route path="/adminstopwatch" element={<Stopwatch />} />

            {/* Management */}
            <Route path="/admin/products/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;