/* eslint-disable react/prop-types */
function Header({menu, title, icon1, icon2}) {
    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
            <div className="menu-items">
                {/*render each menuItem as a link with its name as its text*/}
                {menu.map((menuItem) => (
                    <a key={menuItem.id} href="/" className="menu-item">{menuItem.name}</a>
                ))}
            </div>
            <div className="header-icons">{icon1}{icon2}</div>
        </header>
    );
}

export default Header;  // export statement