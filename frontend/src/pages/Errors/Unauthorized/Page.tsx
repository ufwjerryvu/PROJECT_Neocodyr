import Background from "../../../components/Background"
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import UnauthorizedPageContent from "./Content"

export const UnauthorizedPage = () => {
    return (
        <Background>
            <Navbar variant="login"/>
            <UnauthorizedPageContent/>
            <Footer/>
        </Background>
    )
}
