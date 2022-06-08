import React, { useState } from "react";
import { Product } from "./api";
import ShowMoreText from 'react-show-more-text';
import './ProductLi.scss';

interface ProductLiProps {
    product: Product,
    index: number,
}

export const ProductLi = ({ ...props }: ProductLiProps) => {
    return (
        <div key={props.index} className='product'>
            <h1 className='title'>{props.product.title}</h1>
            <div className="App">
                <img className="product-img" src={props.product.imageUrl} alt="" />
            </div>
            <div className="product-desc">
                <ShowMoreText
                    more='see more'
                    less='see less'
                >
                    {props.product.description}
                </ShowMoreText>
                <a href={props.product.buyUrl}> link </a>
            </div>
            <footer>
                <div
                    className='meta-data'>By {props.product.webSite} | {props.product.category}</div>
            </footer>
        </div>
    );
};

