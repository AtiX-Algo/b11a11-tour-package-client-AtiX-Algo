import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="min-h-[calc(100vh-349px)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;