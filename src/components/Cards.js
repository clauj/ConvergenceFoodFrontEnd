import React from 'react'
import Card from './Card'
import pizza from '../assets/cards/pizza.jpg'
import burguer from '../assets/cards/burguer.jpg'
import sushi from '../assets/cards/sushi.jpg'
import styles from '../components/Cards.module.css'

const Cards = () => {

    const handleClick = (event) => {
        console.log(event.target.alt)
    }
    return (
        <div className={styles.container} onClick={handleClick}>
            <Card img={pizza} label={"Pizza"}/>
            <Card img={burguer} label={"Burguer"}/>
            <Card img={sushi} label={"Sushi"}/>
            <Card img={pizza} label={"Pizza"}/>
            <Card img={burguer} label={"Burguer"}/>
            <Card img={sushi} label={"Sushi"}/>
        </div>
    )
}

export default Cards
