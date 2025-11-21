import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AuthForms from "./components/AuthForms";
import { useLoginState } from "./hooks/useLoginState";

export default function App() {
    const [selectedLab, setSelectedLab] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = useLoginState();

    useEffect(() => {
        if (location.pathname.startsWith('/lab4')) {
            setSelectedLab(4);
        }
    }, [location]);

    const handleSelectLab = (lab) => {
        setSelectedLab(lab);
        if (lab === 4) {
            navigate('/lab4');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <AuthForms />
            </div>
        );
    }

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column">
            <Header />

            <div className="row mt-3 flex-grow-1">
                <div className="col-12 col-lg-3">
                    <Menu onSelectLab={handleSelectLab} selectedLab={selectedLab} />
                </div>

                <div className="col-12 col-lg-9">
                    <Content selectedLab={selectedLab} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
