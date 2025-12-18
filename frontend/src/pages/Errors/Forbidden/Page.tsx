import Background from "../../../components/Background"
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import ForbiddenPageContent from "./Content"

export const ForbiddenPage = () => {
    return (
        <Background>
            <Navbar variant="login"/>
            <ForbiddenPageContent/>
            <Footer/>
        </Background>
    )
}
