import App from "./App"
import { ProviderWrapper as UsersProviderWrapper } from "contexts/usersContext"
import { ProviderWrapper as ProductsProviderWrapper } from "contexts/productsContext"

const AppLoader = () => {
    return (
            <ProductsProviderWrapper>
                <UsersProviderWrapper>
                    <App />
                </UsersProviderWrapper>
            </ProductsProviderWrapper>
    )
}

export default AppLoader