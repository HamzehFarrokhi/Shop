import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Pagination.css'

const Pagination = ({ productCount }) => {
    let { category } = useParams()
    let { filter } = useParams()

    const [pageNumbers, setPageNumbers] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [urlFilters, setUrlFilters] = useState([])

    const jsonSaz = (data) => {
        try {
            const split_1 = data.split('&');
            let txt = `{`
            split_1.forEach(arr => {
                const split_2 = arr.split('=')
                txt = `${txt} "${split_2[0]}":"${split_2[1]}",`
            });
            txt = txt.substring(0, txt.length - 1)
            txt += '}'

            return JSON.parse(txt)
        } catch {
            return []
        }
    }

    useEffect(() => {
        const newUrlFilter = filter !== undefined ? jsonSaz(filter) : []
        const newActivePage = newUrlFilter.page !== undefined ? newUrlFilter.page : 1

        setActivePage(parseInt(newActivePage))
        setUrlFilters(newUrlFilter)
    }, [filter])

    useEffect(() => {
        if (productCount !== null) {
            const pageCount = Math.ceil(productCount / 16)
            let newPageNumber = []
            for (let i = 1; i <= pageCount; i++) {
                newPageNumber.push(i)
            }
            setPageNumbers(newPageNumber)
        }
    }, [productCount])

    let navigate = useNavigate();
    const pageChangeHandler = (action, page) => {
        let newUrlFilter = { ...urlFilters }

        const currentPage = newUrlFilter.page === undefined ? 1 : parseInt(newUrlFilter.page)

        let newPage = currentPage
        switch (action) {
            case "direct":
                newPage = page;
                break;
            case "back":
                if (currentPage > 1) { newPage = currentPage - 1; }
                break;
            case "next":
                if (currentPage < pageNumbers[pageNumbers.length - 1]) {
                    newPage = currentPage + 1;
                }
                break;
            default:
                break;
        }

        if (newPage !== currentPage) {

            if (newPage !== 1)
                newUrlFilter = { ...newUrlFilter, page: newPage }
            else
                delete newUrlFilter.page;


            let filterArr = []
            Object.entries(newUrlFilter).forEach(entry => {
                filterArr.push(`${entry[0]}=${entry[1]}`)
            })

            navigate(`/shopping/${category}/${filterArr.join('&')}`, { replace: true })
        }
    }

    return (
        <div className='pagination'>
            <div className='back-next' onClick={() => pageChangeHandler("back", null)}>
                <i className="fa-solid fa-chevron-left"></i>
                <p>قبلی</p>
            </div>
            <div className='page-panel'>
                {pageNumbers.map((page) => {
                    const activeStyle = activePage === page ? 'active-page' : ''
                    return (
                        <p key={page} onClick={() => pageChangeHandler("direct", page)} className={activeStyle}>{page}</p>
                    )
                })}
            </div>
            <div className='back-next' onClick={() => pageChangeHandler("next", null)}>
                <p>بعدی</p>
                <i className="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    )
}

export default Pagination