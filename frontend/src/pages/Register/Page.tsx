import Background from "../../components/Background"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import RegisterPageContent from "./Content"

export const RegisterPage = () => {
    return(
        <Background>
            <Navbar variant="register"/>
            <RegisterPageContent />
            <Footer/>
        </Background>
    )
}