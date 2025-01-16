import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
    <Toaster reverseOrder={false} />
      <App />
    </Provider>
);