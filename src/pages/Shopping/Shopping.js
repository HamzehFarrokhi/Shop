import React from "react";
import { useParams } from 'react-router-dom'

import Wrapper from '../../components/UI/Wrapper/Wrapper';
import ProductList from "../../components/ProductList/ProductList";
import Filters from "../../components/Filters/Filters";

const Shopping = () => {
    let { category } = useParams()
    let { filter } = useParams()

    const style = {
        padding: '0 100px !important'
    }

    return (
        <Wrapper className="flex-wrapper" style={style}>
            <Filters category={category} filter={filter} />
            <ProductList category={category} filter={filter} />
        </Wrapper>
    )
}

export default Shopping