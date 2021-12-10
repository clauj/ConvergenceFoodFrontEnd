import React from 'react'
import Card from './Card'
import pizza from '../assets/cards/pizza.jpg'
import burguer from '../assets/cards/burguer.jpg'
import sushi from '../assets/cards/sushi.jpg'
import caseira from '../assets/cards/caseira.jpg'
import sobremesa from '../assets/cards/sobremesa.jpg'
import mexicana from '../assets/cards/mexicana.jpg'
import styles from '../components/Cards.module.css'

const Cards = () => {

    const handleClick = (event) => {

    }
    return (
        <div className={styles.container} onClick={handleClick}>
            <Card img={pizza} label={"Pizza"}/>
            <Card img={burguer} label={"Burguer"}/>
            <Card img={sushi} label={"Sushi"}/>
            <Card img={caseira} label={"Caseira"}/>
            <Card img={mexicana} label={"Mexicana"}/>
            <Card img={sobremesa} label={"Sobremesa"}/>
        </div>
    )
}

export default Cards
