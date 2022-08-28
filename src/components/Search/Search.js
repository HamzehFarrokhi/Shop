import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
import Backdrop from "../UI/Backdrop/Backdrop";
import './Search.css'
import config from "../../config";

const Search = ({ activeSearch, setActiveSearch }) => {

    const [searchResult, setSearchResult] = useState([])
    const [resultStatus, setResultStatus] = useState(<p className="result-status">...</p>)
    const [searchFocus, setSearchFocus] = useState(false)

    const inputRef = useRef()
    const searchRef = useRef()

    const searchHandler = (value) => {
        const timer = setTimeout(() => {
            ////Clean Value////
            value = value.replaceAll('/', '')
            value = value.replaceAll('&', '')
            value = value.replaceAll('#', '')
            value = value.replaceAll(';', '')

            if (value.length < 2) {
                setSearchResult([])
                setResultStatus(<p className="result-status">...</p>)
            }
            else {
                setResultStatus(<div className="result-status"><i className="fa fa-spinner fa-spin"></i></div>)

                if (value === inputRef.current.value) {
                    if (value !== "") {
                        const settings = {
                            url: `/shop/search/${value}`,
                            method: "Get",
                            processData: false
                        }
                        const sendRequest = async () => {
                            axios(settings)
                                .then((response) => {
                                    setSearchResult(response.data)
                                    if (response.data.length !== 0) {
                                        setResultStatus("")
                                    }
                                    else (
                                        setResultStatus(<p className="result-status">محصولی یافت نشد</p>)
                                    )
                                })
                                .catch((error) => {
                                    console.log(error)
                                    setResultStatus(<p className="result-status">محصولی یافت نشد</p>)
                                })
                        }
                        sendRequest()
                    }
                    else {
                        setSearchResult([])
                    }
                }
            }
        }, 500);

        return () => { clearTimeout(timer) }
    }

    const inputChange = (value) => {
        searchHandler(value)
    }

    const ProductList = searchResult.map((item) => {
        return (
            <div className="builder" key={item.id}>
                <Link target="_blank" to={`${config.sourceFolder}/product/${item.id}`}>
                    <img alt={item.name} className="search-result-image" src={`${config.sourceFolder}/img/products/75/${item.id}.png`} />
                    <p className="search-result-title title-4">{item.name}</p>
                </Link>
            </div>
        )
    });

    const searchPanel = (searchFocus) ?
        <div>
            <div className="search-result">
                {/* <div className="search-filters">
                    <p>فیلتر</p>
                </div> */}
                <div className="result">
                    {(searchResult.length !== 0 && resultStatus === "") ? ProductList : resultStatus}
                </div>
            </div>
        </div> : null

    const searchShowState = activeSearch === true ? activeSearch : searchFocus

    const deactiveSearch = () => {
        setSearchFocus(false)
        setActiveSearch(false)
    }

    return (
        <>
            <Backdrop show={searchShowState} click={deactiveSearch} zIndex="89" />
            <div className={`fixed-holder ${activeSearch ? 'active-search' : ''}`}>
                <div
                    className="search"
                    ref={searchRef}
                    onFocus={() => setSearchFocus(true)}
                >
                    <div className="search-field">
                        <i className="fa-regular fa-magnifying-glass"></i>
                        <input
                            ref={inputRef}
                            placeholder="جستجو ..."
                            type="text"
                            onChange={(event) => inputChange(event.target.value)}
                        />
                    </div>
                    {searchPanel}
                </div>
            </div>
        </>
    )
}

export default Search