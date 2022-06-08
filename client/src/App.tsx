import React from 'react';
import './App.scss';
import { createApiClient } from './api';
import { ProductLi } from "./ProductLi";
import { Product } from "./api";


export type AppState = {
    product?: Product[],
    hiddenCont: number
    lastPage: number
    search: string
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

    state: AppState = {
        search: '',
        hiddenCont: 0,
        lastPage: 1,
    };

    searchDebounce: any = null;
    executeOnClick: any;

    async componentDidMount() {
        const productList = await this.getProductsFromServer();
        this.setState({
            product: productList
        })
    }

    private async getProductsFromServer(search?: string, page?: number) {
        const products = await api.getProducts(search, page);
        return products;
    }

    loadNextPage = async () => {
        const newPage = this.state.lastPage + 1;
        let ticketWithVisability = await this.getProductsFromServer(this.state.search, newPage);
        if (this.state.product) {
            ticketWithVisability = this.state.product.concat(ticketWithVisability);
        }
        this.setState({
            product: ticketWithVisability,
            lastPage: newPage
        });
    };

    renderTickets = (product: Product[]) => {

        const filteredTickets = product
            .filter((product) => (product.title.toLowerCase() + product.description.toLowerCase()).includes(this.state.search.toLowerCase()));

        return (
            <div className='products' style={{}}>
                {filteredTickets.map((product, index) => (
                    <ProductLi product={product} index={index} />
                ))}
            </div>
        );
    };


    onSearch = async (val: string, newPage?: number) => {

        clearTimeout(this.searchDebounce);

        this.searchDebounce = setTimeout(async () => {
            const ticketList = await this.getProductsFromServer(val, newPage);
            this.setState({
                search: val,
                product: ticketList,
                lastPage: 1
            });
        }, 300);

    };


    render() {
        const { product: products } = this.state;
        return <main>
            <h1>Products List</h1>
            <header>
                <input type="search" placeholder={"Search..."}
                    onChange={(e) => this.onSearch(e.target.value)} />
            </header>
            {products ? <div className='results'>Showing {products.length} results
            </div>
                : null}
            {products ? this.renderTickets(products) : <h2>Loading..</h2>}
            <button className='loadMoreBtn' onClick={this.loadNextPage}>load more...</button>

        </main>
    }


}

export default App;

