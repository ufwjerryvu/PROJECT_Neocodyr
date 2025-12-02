import Background from "../../components/Background"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import LoginPageContent from "./Content"

export const LoginPage = () => {
    return (
        <Background>
            <Navbar variant="login"/>
            <LoginPageContent/>
            <Footer/>
        </Background>
    )
}