import React from 'react';
import styles from './Card.module.css';

const Card = props => {
    return (
        <div className={styles.container}>
            <p className={styles.data}>Fecha: {props.date}</p>
            <p className={styles.data}>Temperatura: {props.temp}°C</p>
            <p className={styles.data}>Humedad: {props.humidity}%</p>
        </div>
    );
};

export default Card;