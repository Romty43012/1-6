import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default function App() {
    const [selectedLab, setSelectedLab] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

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

    return (
        <div className="container-fluid">
            <Header />

            <div className="row mt-3">
                <div className="col-3">
                    <Menu onSelectLab={handleSelectLab} selectedLab={selectedLab} />
                </div>

                <div className="col-9">
                    <Content selectedLab={selectedLab} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
