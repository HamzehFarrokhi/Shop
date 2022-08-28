import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { productListAction, productFilterListAction } from "../../redux/action/productAction";

import './ProductList.css'
import Product from "./Product/Product"
import LoadingProduct from "../UI/LoadingProduct/LoadingProduct"
import NotFound from "../UI/NotFound/NotFound";
import CartControls from "./CartControls/CartControls";
import Pagination from "../Pagination/Pagination";

const ProductList = ({ category, filter }) => {

    const [productCount, setProductCount] = useState(null)

    const dispatch = useDispatch()

    const productList = useSelector((state) => (filter === undefined) ? state.productList : state.productFilter)
    const { productLoading, products } = productList

    useEffect(() => {
        if (filter !== undefined) {
            dispatch(productFilterListAction(category, filter))
        } else {
            dispatch(productListAction(category))
        }
    }, [dispatch, category, filter])

    useEffect(() => {
        if (products.length !== 0 && products[0].count !== undefined)
            setProductCount(products[0].count)
    }, [products])

    const productRenderer = () => {
        if (products.length !== 0 && products[0].count !== undefined && products[0].count > 0) {
            let newProducts = [...products]
            newProducts.splice(0, 1)
            try {
                return (
                    newProducts.map((item) => {
                        return <Product key={item.id} productData={item} >
                            <CartControls
                                products={products}
                                productId={item.id}
                            />
                        </Product>
                    })
                )
            } catch {
                return <NotFound text="محصولی یافت نشد" desc="فیلترها را تغییر دهید و یا دسته بندی دیگری را انتخاب کنید" />
            }
        } else {
            return <NotFound text="محصولی یافت نشد" desc="فیلترها را تغییر دهید و یا دسته بندی دیگری را انتخاب کنید" />
        }
    }

    const productListHandler = !productLoading ? productRenderer() : <LoadingProduct />;

    const paginationRenderer = () => {
        if (products.length !== 0 && products[0].count !== undefined && products[0].count > 0) {
            return <Pagination productCount={productCount} />
        } else {
            return ''
        }
    }

    const paginationHandler = !productLoading ? paginationRenderer() : '';

    return (
        <div className="product-container">
            <div className="product-list">
                {productListHandler}
            </div>
            {paginationHandler}
        </div>
    )
}

export default ProductList