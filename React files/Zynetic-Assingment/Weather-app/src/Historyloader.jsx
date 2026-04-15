import React from "react";
import styles from "./History.module.css";

const Historyloader = React.memo(({ history }) => {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Search History</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Name of the City</th>
                        <th className={styles.th}>Temperature (°C)</th>
                        <th className={styles.th}>Humidity (%)</th>
                        <th className={styles.th}>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.td}>{item.name}</td>
                            <td className={styles.td}>{item.main.temp}</td>
                            <td className={styles.td}>{item.main.humidity}</td>
                            <td className={styles.td}>{item.sys.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default Historyloader;
