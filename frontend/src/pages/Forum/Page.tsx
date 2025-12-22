import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import ForumPageContent from "./Content";

export const ForumPage = () => {
  return (
    <div className="max-h-screen overflow-hidden">
      <Background>
        <Navbar variant={"landing"} />
        <ForumPageContent />
      </Background>
    </div>
  );
};
