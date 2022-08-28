import React from 'react'
import Box from '../../components/UI/Box/Box'
import AddressList from '../../components/AddressList/AddressList'

const Address = () => {
    return (
        <Box
            contentClass="flex-align flex-justify-center"
            className="marg-b-20"
            headConfig={{ exist: true, title: "آدرس‌ها", navigate: { exist: false } }}>
            <AddressList />
        </Box>
    )
}

export default Address