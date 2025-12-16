import React from "react";

import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import ForumPageContent from "./Content";
import Footer from "../../components/Footer";

export const ForumPage = () => {
  return (
    <Background>
      <Navbar variant={"landing"} />
      <ForumPageContent />
      <Footer />
    </Background>
  );
};
