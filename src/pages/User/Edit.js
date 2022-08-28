import React from 'react'
import Box from '../../components/UI/Box/Box'
import ComingSoon from '../../components/UI/ComingSoon/ComingSoon'

const Edit = () => {
    return (
        <Box
            contentClass="flex-align flex-justify-center"
            className="marg-b-20"
            headConfig={{ exist: true, title: "اطلاعات حساب کاربری", navigate: { exist: false } }}>
            <ComingSoon />
        </Box>
    )
}

export default Edit