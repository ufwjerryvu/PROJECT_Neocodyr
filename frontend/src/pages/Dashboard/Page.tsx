import React from "react";

import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashboardPageContent from "./Content";

export const DashboardPage = () => {
  return (
    <Background>
      <Navbar variant={"landing"} />
      <DashboardPageContent />
      <Footer />
    </Background>
  );
};
