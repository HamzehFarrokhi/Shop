import React from 'react'
import Box from '../../components/UI/Box/Box'
import ComingSoon from '../../components/UI/ComingSoon/ComingSoon'

const Comments = () => {
    return (
        <Box
            contentClass="flex-align flex-justify-center"
            className="marg-b-20"
            headConfig={{ exist: true, title: "آخرین بازدیدها", navigate: { exist: false } }}>
            <ComingSoon />
        </Box>
    )
}

export default Comments