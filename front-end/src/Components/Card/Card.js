import React from 'react';
import styles from './Card.module.css';

const Card = props => {
    return (
        <div className={styles.container}>
            <p className={styles.data}>Fecha: <br/>{props.date}</p>
            <p className={styles.data}>Temperatura: <br/>{props.temperature}°C</p>
            <p className={styles.data}>Humedad: <br/>{props.humidity}%</p>
        </div>
    );
};

export default Card;