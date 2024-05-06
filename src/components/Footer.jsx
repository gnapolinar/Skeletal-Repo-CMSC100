/* eslint-disable react/prop-types */
function Footer({footer}) {
    return (
        <footer className="footer">
            <div className="footer-items">
                {/*render each footer item using its name*/}
                {footer.map((footerItem) => (
                    <a key={footerItem.id} className="footer-item">{footerItem.name}</a>
                ))}
            </div>
        </footer>
    );
}

export default Footer; // export statement