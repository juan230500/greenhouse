import React from 'react';
import styles from './Header.module.css';


const header = props => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{props.title}</h1>
        </div>
    );
};

export default header;