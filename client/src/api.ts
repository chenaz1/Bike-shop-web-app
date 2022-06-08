import axios from 'axios';
import { APIRootPath } from '@bike-shop/config';

export type Product = {
    title: string,
    creationTime: number,
    imageUrl: string,
    description: string,
    buyUrl: string,
    webSite: string,
    category: string,
    youTubeLink: string,
}

export type ApiClient = {
    getProducts: (search?: string, page?: number) => Promise<Product[]>;
}

export const createApiClient = (): ApiClient => {
    return {
        getProducts: (search?: string, page?: number) => {
            return axios.get(APIRootPath, {
                params: {
                    search: search,
                    page: page
                }
            }).then((res) => res.data);
        }
    }
}
