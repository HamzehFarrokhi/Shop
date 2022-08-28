import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { filterDataAction } from "../../redux/action/productAction";

import './Filters.css'
import Box from '../UI/Box/Box'
import Drawer from './FilterDrawer/Drawer'
import PriceRange from './PriceRange/PriceRange'

const Filters = ({ category, filter }) => {

    const [priceMax, setPriceMax] = useState(1000000)
    const [drawerData, setDrawerData] = useState([])
    const [urlFilters, setUrlFilters] = useState([])
    const [activeFilter, setActiveFilter] = useState(false)

    const [filterPrice, setFilterPrice] = useState(null)

    const dispatch = useDispatch()
    const getFilterData = useSelector((state) => state.filterData)
    const { loading, filterData } = getFilterData

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
        dispatch(filterDataAction(category))

        const filters = jsonSaz(filter)

        const newUrlFilter = filter !== undefined ? filters : []
        setUrlFilters(newUrlFilter)

        const newFilterPrice = filters.max !== undefined ? { min: parseInt(filters.min), max: parseInt(filters.max) } : null
        setFilterPrice(newFilterPrice)

    }, [dispatch, category, filter])

    useEffect(() => {
        if (!loading && filterData.length !== undefined) {
            setPriceMax(parseInt(filterData[0].priceMax))
            setDrawerData(filterData)
        }
    }, [loading, filterData])

    let navigate = useNavigate();
    const filterChangeHandler = (action, data) => {
        let newUrlFilter = { ...urlFilters }
        let newCat = category

        if (action === 'PRICE') {
            if (parseInt(data.max) === priceMax && parseInt(data.min) === 0) {
                newUrlFilter = { ...newUrlFilter, max: undefined, min: undefined }
            } else {
                newUrlFilter = { ...newUrlFilter, max: data.max, min: data.min }
            }
        }
        else if (action === 'TYPE') {
            const newValue = data.id.toString()

            if (newValue === 'all') {
                newCat = 'all'
            }
            else {
                let newCatArr = category.split('-')

                const allIndex = newCatArr.findIndex((cat) => {
                    return cat === 'all'
                })
                if (allIndex !== -1)
                    newCatArr.splice(allIndex, 1)

                const valueIndex = newCatArr.findIndex((cat) => {
                    return cat === newValue
                })
                if (valueIndex === -1) {
                    newCatArr.push(newValue)
                } else (
                    newCatArr.splice(valueIndex, 1)
                )

                if (newCatArr.length === 0)
                    newCat = 'all'
                else
                    newCat = newCatArr.join('-')
            }
        }
        else if (action === 'BRAND') {
            const newValue = data.id.toString()
            let newBrand = ''

            if (newValue === 'all') {
                newBrand = undefined
                newUrlFilter = { ...newUrlFilter, brand: undefined }
            }
            else {
                let newBrandArr = newUrlFilter.brand === undefined ? [] : newUrlFilter.brand.split('-')

                const valueIndex = newBrandArr.findIndex((br) => {
                    return br === newValue
                })
                if (valueIndex === -1) {
                    newBrandArr.push(newValue)
                } else (
                    newBrandArr.splice(valueIndex, 1)
                )

                if (newBrandArr.length === 0)
                    newBrand = undefined
                else
                    newBrand = newBrandArr.join('-')

                newUrlFilter = { ...newUrlFilter, brand: newBrand }
            }
        }

        newUrlFilter = { ...newUrlFilter, page: undefined }
        let finalStr = []
        Object.entries(newUrlFilter).forEach(entry => {
            const value = entry[1]
            if (value !== undefined)
                finalStr.push(entry)
        })
        let filterArr = []
        finalStr.forEach(element => {
            filterArr.push(`${element[0]}=${element[1]}`)
        });

        navigate(`/shopping/${newCat}/${filterArr.join('&')}`, { replace: true })
    }

    return (
        <>
            <div className={`filter-container ${activeFilter ? 'active-filter' : ''}`}>
                <div className='filter-sticky'>
                    <h4 className='filter-container-title'>فیلترها</h4>

                    <Box className="category-filter" headConfig={{ exist: false }}>
                        <h5 className='filter-title'>دسته بندی</h5>
                        <Drawer filterData={drawerData} drawerType='type' filterChangeHandler={filterChangeHandler} />
                    </Box>
                    <Box className="category-filter" headConfig={{ exist: false }}>
                        <h5 className='filter-title'>محدوده قیمت</h5>
                        <PriceRange
                            filterPrice={filterPrice}
                            max={priceMax}
                            filterChangeHandler={filterChangeHandler}
                        />
                    </Box>
                    <Box className="category-filter" headConfig={{ exist: false }}>
                        <h5 className='filter-title'>برند</h5>
                        <Drawer filterData={drawerData} drawerType='brand' filterChangeHandler={filterChangeHandler} />
                    </Box>
                </div>
            </div>
            <div className='filter-button' onClick={() => setActiveFilter(!activeFilter)}>
                <i className={`fa-solid fa-${activeFilter ? 'xmark' : 'filter-list'}`}></i>
                <p className='no-select'>فیلتر</p>
            </div>
        </>
    )

}

export default Filters