const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <aside>
                <a className="text-2xl font-bold">TourTrek</a>
                <p>Providing reliable tour packages since 2024.<br/>Your adventure starts here.</p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Booking</a>
                <a className="link link-hover">Custom Tours</a>
                <a className="link link-hover">Guides</a>
                <a className="link link-hover">Destinations</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;