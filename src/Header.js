import React from "react";

const Header = () => {
    return (
        <>
        <div class="navbar">
        <a href="/" className="logo"><b>IMAGE <span style={{ color: "red"}}><i>GALLERY</i></span></b></a>
        <a href="/signout" className="signout">Sign Out</a>
        </div>
        </>
    );
}

export default Header;