import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PersonalInfo} from "../pages/PersonalInfo/PersonalInfo.tsx";
import {AddressWork} from "../pages/AddressWork/AddressWork.tsx";
import {LoanForm} from "../pages/LoanForm/LoanForm.tsx";
import { ROUTES } from "../shared/lib/routes.ts";
import "./main.css";
import App from "../pages/MainPage/App.tsx";
import {Layout} from "../shared/ui/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path={ROUTES.MAIN} element={<App />} />
        <Route path={ROUTES.PERSONAL_INFO} element={<PersonalInfo />} />
        <Route path={ROUTES.ADDRESS_WORK} element={<AddressWork />} />
        <Route path={ROUTES.LOAN_PARAMS} element={<LoanForm />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
