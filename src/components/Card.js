import React from 'react'
import styles from '../components/Card.module.css'

const Card = ({img, label}) => {
    return (
        <>
            <div className={`${styles.container} container`}>
                <div className={styles.imgContainer}>
                    <img src={img} alt={label} id={label} className={styles.img}></img>
                </div>
                <div>
                    <p className={styles.label}>{label}</p>
                </div>
                
            </div>
        </>
    )
}

export default Card
