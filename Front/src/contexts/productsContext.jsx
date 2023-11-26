import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import productService from "services/products";
import orderService from "services/orders";

const Context = React.createContext(null)

    
const ProviderWrapper = (props) => {

    const [ productsList, setProductsList] = useState([])
    const [ productsToOrder, setProductsToOrder] = useState(
        JSON.parse(localStorage.getItem("productsToOrder"))!== null ?
        JSON.parse(localStorage.getItem("productsToOrder")) : [])

    const hook = () => {
        productService
            .getAll()
            .then(initialsProducts => {
                setProductsList(initialsProducts)
            })
    }

    useEffect(hook, [])

    const createNewProduct = (product) => 
    {
        const existingProduct = persons.find(p => p.name == product.name)
        if (existingProduct)
            return "ce priduit existe déjà"
        // todo check

        productService.create({ ...product })
            .then(returnedProduct => {
              setPersons(persons.concat(returnedProduct))
              return redirect("/");
            })
    }

    const deleteProduct = (productId) =>
    {
        productService.remove(productId)
        .then(
            location.reload()
        )
        .catch(error => {console.log(error)})
    }

    const addProductToOrder = (id) => {
        var product = productsList.find(p => p.id == id)
        if (!product)
            return "product id unknown"

        setProductsToOrder(productsToOrder.push(product))
        localStorage.setItem("productsToOrder", JSON.stringify(productsToOrder))
        return redirect("/productList")
    }

    const removeProductToOrder = (id) => {
        setProductsToOrder(productsToOrder.filter(p => p.id !== id))
        localStorage.setItem("productsToOrder", JSON.stringify(productsToOrder))
        return redirect("/order")
    }

    const orderProducts = async (customerId) => {
        var test = await orderService
            .create({ customerId: customerId })
            .catch(error => 
                console.log(error)
            )
            console.log(test)
        test.then(newOrder => {
            console.log(newOrder)
        })
        
    }

    
    const exposedValue = {
        productsList,
        productsToOrder,
        createNewProduct,
        deleteProduct,
        addProductToOrder,
        removeProductToOrder,
        orderProducts
    }
    
    return (
        <Context.Provider value={exposedValue}>
            { props.children }
        </Context.Provider> 
        )   
}
    
export {    
    Context,
    ProviderWrapper,    
}