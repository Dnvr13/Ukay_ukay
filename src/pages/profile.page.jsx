import React from "react";
import HeaderComp from "../components/zcomp/header.comp";
import FooterComp from "../components/zcomp/footer.comp";


const ProfilePage = () => {


    return (
        <div className="flex flex-col min-h-screen bg-gray-300">
            <HeaderComp />
            <main className="flex-grow p-5 md:p-10">

            </main>
            {/* Footer */}
            <FooterComp />
        </div>
    )
}

export default ProfilePage;