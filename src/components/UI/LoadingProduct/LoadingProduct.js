import React from 'react'
import './LoadingCard.css'
import LoadingCard from './LoadingCard';

const LoadingProduct = () => {

    const rows = [];
    for (var i = 0; i < 12; i++) {
        rows.push(<LoadingCard key={i} />);
    }

    return (
        <div className='loading-products'>
            {rows}
        </div>
    )
}

export default LoadingProduct