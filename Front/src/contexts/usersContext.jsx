import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import employeeService from "services/employees";
import customerService from "services/customers";


const Context = React.createContext(null)

    
const ProviderWrapper = (props) => {

    const [ authenticatedUser, setAuthenticatedUser] = useState(
        JSON.parse(localStorage.getItem("authenticatedUser")) !== null ?
        JSON.parse(localStorage.getItem("authenticatedUser")) : [])
    const [ userIsEmployee, setUserIsEmployee] = useState(
        JSON.parse(localStorage.getItem("userIsEmployee"))!== null ?
        JSON.parse(localStorage.getItem("userIsEmployee")) : false)

    const [ customersList, setCustomersList] = useState([])
    const [ EmployeesList, setEmployeesList] = useState([])

    const hook = () => {
        customerService
            .getAll()
            .then(initialsCustomers => {
                setCustomersList(initialsCustomers)
            })

        employeeService
            .getAll()
            .then(initialsEmployees => {
                setEmployeesList(initialsEmployees)
            })
    }

    useEffect(hook, [])

    const login = async (email, password, isEmployee) => {
        var service;
        var logged = false
        if (isEmployee === true)
            service = employeeService
        else 
            service = customerService
        
        await service.getByEmail(email)
                .then(returnedUser => {
                    if (returnedUser.password === password)
                    {
                        setAuthenticatedUser(returnedUser)
                        localStorage.setItem("authenticatedUser", JSON.stringify(returnedUser))
                        setUserIsEmployee(isEmployee === true)
                        localStorage.setItem("userIsEmployee", JSON.stringify(isEmployee === true))
                        logged = true
                    } 
                    else
                        logged = false
                        
                })
                .catch(error => {
                    console.log(error)
                })
        return logged
    

    }

    const registerCustomer = async (firstname, lastname, email, password, companyName) => {
        var customerExist = true;

        await customerService.getByEmail(email)
            .catch(error => {
                if (error.response.status == 404)
                    customerExist = false
            })

        if (customerExist)
            return "email déjà utilisé" 
        else
        {
            let newCustomer = {
                email: email,
                companyName: companyName != null ? companyName : "",
                firstname: firstname,
                lastname: lastname,
                password: password
            }
            await customerService
                .create(newCustomer)
                .catch(error => {
                    console.log(error)
                })
        } 

        return login(email, password, false)  
     
    }

    const registerEmployee = async (firstname, lastname, email, password, role, managerId) => {
        var employeeExist = true;

        await employeeService.getByEmail(email)
            .catch(error => {
                if (error.response.status == 404)
                    employeeExist = false
            })

        if (employeeExist)
            return "email déjà utilisé" 
        else
        {
            let newEmployee = {
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: password,
                role : role ? role : "USER",
                managerId : managerId ? managerId : null
            }
            await employeeService
                .create(newEmployee)
                .catch(error => {
                    console.log(error)
                })
        } 

        return login(email, password, true) 
     
    }

    const logout = () => {
        setAuthenticatedUser([])
        setUserIsEmployee(false)
        localStorage.setItem("authenticatedUser", JSON.stringify([]))
        localStorage.setItem("userIsEmployee", JSON.stringify(false))
        localStorage.setItem("productsToOrder", JSON.stringify([]))
        return redirect("/")
    }

    
    const exposedValue = {
        authenticatedUser,
        userIsEmployee,
        customersList,
        EmployeesList,
        login,
        registerCustomer,
        registerEmployee,
        logout

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