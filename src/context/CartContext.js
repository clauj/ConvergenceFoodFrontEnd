import React, { createContext, useCallback, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({
        loja_id: 0,
        items: [],
        quantidade: 0,
        total: 0,
    });

    const handleAddToCart = useCallback((item) => {
        let updatedCart = cart;
        if(updatedCart.loja_id !== 0 && item.loja_id !== updatedCart.loja_id) {
           const res = window.confirm('Item de outra loja. Gostaria de zerar o carrinho?');
           if(res) {
                updatedCart.items = [{...item, quantidade: 1}];
                updatedCart.quantidade = 1;
                updatedCart.total = item.price;
                updatedCart.loja_id = item.loja_id;
           }
        }else {
            const findItem = updatedCart.items.find((produto) => produto.id === item.id && produto.loja_id === item.loja_id)
            if (findItem) {
                updatedCart.items = updatedCart.items.map((produto) => produto.id === item.id && produto.loja_id === item.loja_id ? {...produto, quantidade: produto.quantidade + 1}:produto)
            }
            else {
                updatedCart.items.push({...item, quantidade: 1});
            }
            updatedCart.quantidade += 1;
            updatedCart.total += item.price;
            updatedCart.loja_id = item.loja_id;
        }
        setCart({...updatedCart});
    }, [cart]);
    

    const handleSubProduto = useCallback((id) => {
        const updatedProduct = cart.items.find(x => x.id === id);
        if (updatedProduct.quantidade === 1) return;
        updatedProduct.quantidade -= 1;
        const updatedCart = cart;
        updatedCart.total -= updatedProduct.price;
        updatedCart.quantidade -= 1;      
        setCart({...updatedCart});  
    }, [cart]);

    const handleSumProduto = useCallback((id) => {
        const updatedProduct = cart.items.find(x => x.id === id);
        updatedProduct.quantidade += 1;
        const updatedCart = cart;
        updatedCart.total += updatedProduct.price;
        updatedCart.quantidade += 1;      
        setCart({...updatedCart});  
    }, [cart]);

    const handleDeleteProduto = useCallback((id) => {
        const updatedCart = cart;
        let index = updatedCart.items.findIndex(x => x.id === id);
        let reduce = updatedCart.items[index].price * updatedCart.items[index].quantidade;
        updatedCart.quantidade = updatedCart.quantidade - updatedCart.items[index].quantidade;
        updatedCart.total = updatedCart.total - reduce;
        updatedCart.items.splice(index, 1);
        setCart({...updatedCart});
    }, [cart]);

    const zerarCarrinho = useCallback((id) => {
        setCart({
            loja_id: 0,
            items: [],
            quantidade: 0,
            total: 0,
        }); 
    },[cart]);

    return (
        <CartContext.Provider value={{ handleAddToCart, cart, handleSubProduto, handleSumProduto, handleDeleteProduto, zerarCarrinho }}>
            {children}
        </CartContext.Provider>
    );
}
