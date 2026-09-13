import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import StoreChrome from "./components/StoreChrome";
import AdminLayout from "./components/admin/AdminLayout";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";

// Storefront pages load eagerly so route switches never flash a Suspense loader.
import Home from "./pages/Home";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Login from "./pages/Login";
import Orders from "./pages/order";
import OrderDetails from "./pages/order-details";
import NotFound from "./pages/not-found";
import Checkout from "./pages/checkout";
import Productdetails from "./pages/Productdetails";

// Admin stays lazy — visited less often and is a heavier chunk.
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transactions"));
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
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const data = await getUser(firebaseUser.uid);
          dispatch(userExist(data.user));
        } else {
          dispatch(userNotExist());
        }
      } catch (error) {
        console.log(error);
        dispatch(userNotExist());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <StoreChrome user={user}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:id" element={<Productdetails />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={user ? false : true}
                  redirect="/"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={user ? true : false}
                  message="login first"
                  redirect="/login"
                />
              }
            >
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/pay" element={<Checkout />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="coupon" element={<Coupon />} />
              <Route path="stopwatch" element={<Stopwatch />} />
              <Route path="customers" element={<Customers />} />
              <Route path="transactions" element={<Transaction />} />
              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={true}
                    adminOnly={true}
                    admin={user?.role === "admin" ? true : false}
                  />
                }
              >
                <Route path="products/new" element={<NewProduct />} />
                <Route path="products/:id" element={<ProductManagement />} />
                <Route
                  path="transactions/:id"
                  element={<TransactionManagement />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </StoreChrome>
    </Router>
  );
};

export default App;
