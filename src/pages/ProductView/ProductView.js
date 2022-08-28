import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

import { productDetailAction } from '../../redux/action/productAction'

import Wrapper from '../../components/UI/Wrapper/Wrapper'
import Head from '../../components/ProductPage/Head/Head'
import Content from '../../components/ProductPage/Content/Content';

const ProductView = () => {
    let { id } = useParams()

    const dispath = useDispatch()

    const productDetail = useSelector((state) => state.productDetail)
    const { loading, product } = productDetail

    useEffect(() => {
        dispath(productDetailAction(id))
    }, [dispath, id])

    const productRender = (!loading && product[0] !== undefined) ? <>
        <Head product={product[0]} />
        <Content />
    </> : null

    return (
        <Wrapper>
            {productRender}
        </Wrapper>
    )
}

export default ProductView