import React from 'react'
import Slide from '../components/Slide'
import Cards from '../components/Cards'
import Lojas from '../components/Lojas'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <Slide />
            <Cards />
            <Lojas />
        </div>
    )
}

export default Home
