import Background from "../../components/Background"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import LoginPageContent from "../Login/Content"
import ProfilePageContent from "./Content"

export const ProfilePage = () => {
    return (
        <Background>
            <Navbar variant="" />
            <ProfilePageContent />
            <Footer />
        </Background>
    )
}