
const Navigation = () => {

    return (
        <nav className="navbar-container" aria-label="Main Navigation">
            <a href="https://www.mesplaques.fr/" aria-label="Go to Mes Plaques homepage">
                <img
                    src={`${process.env.PUBLIC_URL}/mesplaqueslogo.png`}
                    alt="Mes Plaques Logo"
                    className="logo"
                />
            </a>
        </nav>

    );
};

export default Navigation;