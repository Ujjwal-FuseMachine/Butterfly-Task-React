import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Final from "../pages/final/final";
import List from "../pages/list/list";
import Startpage from "../pages/start/start";
import "./app.css";
import companyService from "../services/company.service";

const MyApp = observer((): ReactElement => {
  const [companyList, setCompanyList] = useState([]);
 
  const getCompany = useCallback(async () => {
    const response: any = await companyService.fetchCompany();
    setCompanyList(response.data);
  }, []);

  useEffect(() => {
    getCompany().catch(console.error);
  }, []);

  const companyMoto = companyList.length > 0? companyList[0].moto: "Your Team Happiness Manager";
  const companyDetail = companyList.length > 0? companyList[0].detail: "Demo inc. corporation.";
  
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<Startpage companyMoto={companyMoto} companyDetail={companyDetail} />}></Route>
        <Route path="/list" element={<List />}></Route>
        <Route path="/final" element={<Final />}></Route>
        <Route path="/" element={<Startpage companyMoto={companyMoto} companyDetail={companyDetail}  />}></Route>
      </Routes>
    </Router>
  );
});

export default MyApp;
