import React,{useContext} from 'react'
import { CartContext } from '../context/CartContext';
import styles from './Carrinho.module.css'
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useHistory } from 'react-router';

const Carrinho = () => {
    const {cart, handleSumProduto, handleSubProduto, handleDeleteProduto} = useContext(CartContext);

    const history = useHistory();

    const handleCheckout = () => {
        history.push("/checkout")
    };

    return (
        <div className={`container ${styles.items}`}>
            <h1>Carrinho</h1>
            {cart.items.map(item => (
                <div className={styles.item}>
                    <div className={styles.info}>
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.price}>R${item.price.toFixed(2)}</p>
                        <div className={styles.control}>
                            <button onClick={() => handleSubProduto(item.id)}>-</button>
                            <p>{item.quantidade}</p>
                            <button onClick={() => handleSumProduto(item.id)}>+</button>
                            <DeleteForeverIcon onClick={() => handleDeleteProduto(item.id)}/>
                        </div>
                    </div>
                    <div>
                        <img src={item.fotos[0].aws} alt={item.name} className={styles.foto}></img>
                    </div>
                </div>
            ))}
            <h2 className={styles.total}>Total: R${cart.total.toFixed(2).toString().replace(".", ",")}</h2>
            {cart.quantidade !== 0 && <button onClick={handleCheckout} className={styles.checkout}>Pagamento</button>}
        </div>
    )
}

export default Carrinho
