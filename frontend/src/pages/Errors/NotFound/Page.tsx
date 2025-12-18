import Background from "../../../components/Background"
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import NotFoundPageContent from "./Content"

export const NotFoundPage = () => {
    return (
        <Background>
            <Navbar variant="login"/>
            <NotFoundPageContent/>
            <Footer/>
        </Background>
    )
}