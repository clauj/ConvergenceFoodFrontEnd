import React from 'react'
import Slide from '../components/Slide'
import Cards from '../components/Cards'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <Slide />
            <Cards />
        </div>
    )
}

export default Home
