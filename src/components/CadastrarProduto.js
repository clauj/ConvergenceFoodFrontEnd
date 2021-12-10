import React from 'react'

const CadastrarProduto = () => {
    return (
        <>
            <div>
                <form>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" name="name"></input>
                    <label for="price">Preço:</label>
                    <input type="number" id="price" name="price"></input>
                    <label for="description">Descrição:</label>
                    <input type="text" id="description" name="description"></input>
                    <label for="images">Fotos:</label>
                    <input type="file" id="images" name="images"></input>
                </form>
            </div>
        </>
    )
}

export default CadastrarProduto
