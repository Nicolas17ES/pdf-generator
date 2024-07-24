
const Navigation = () => {

    return (
        <nav className="navbar-container">
            <a href="https://www.mesplaques.fr/"><img src={`${process.env.PUBLIC_URL}/mesplaqueslogo.png`} alt="Mes Plaques Logo" className="logo" /></a>
        </nav>
    );
};

export default Navigation;