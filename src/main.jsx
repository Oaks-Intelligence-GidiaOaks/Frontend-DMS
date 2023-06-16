import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { registerLicense } from "@syncfusion/ej2-base";
import { AuthProvider, AppProvider } from "./context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// register syncfusion lincense
registerLicense(
  "ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0RiW3tecXJQTmVc"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
