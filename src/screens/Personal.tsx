import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PersonalArea from "../components/personal-area/PersonalArea";

const Personal:React.FC = () => {

    return (
        <>
            <Header></Header>
            <PersonalArea></PersonalArea>
            <Footer>
                <div>Copyright RuiCruz</div>
            </Footer>
        </>
    )
}

export default Personal;