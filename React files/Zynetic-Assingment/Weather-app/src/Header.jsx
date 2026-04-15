
import React from "react";
import styles from "./Header.module.css";

const Header = ({ theme, ThemeChange }) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Weather Dashboard Application</h1>
            <button className={styles.themeButton} onClick={ThemeChange}>
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </header>
    );
};

export default Header;
