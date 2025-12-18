import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import ForumPageContent from "./Content";

export const ForumPage = () => {
  return (
    <Background>
      <Navbar variant={"landing"} />
      <ForumPageContent />
    </Background>
  );
};
