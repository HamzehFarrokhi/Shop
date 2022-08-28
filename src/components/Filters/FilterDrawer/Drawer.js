import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './Drawer.css'
import Checkbox from '../../UI/Checkbox/Checkbox'
import config from '../../../config'

const Drawer = ({ filterData, drawerType, filterChangeHandler }) => {
    let { category } = useParams()
    let { filter } = useParams()

    const [firstInitial, setFirstInitial] = useState([])
    const [drawerData, setDrawerData] = useState([])

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
        if (filterData.length !== 0) {
            const newDrawerData = [...filterData]

            newDrawerData.splice(0, 1)

            let myData = []
            let allCount = 0
            newDrawerData.forEach(element => {
                if (Object.keys(element).indexOf(drawerType) !== -1) {
                    myData.push(element)
                    allCount += parseInt(element.count)
                }
            });

            let arr = []
            myData.forEach(element => {
                let addTo = {}
                addTo.checked = false
                addTo.text = config.brands[element[drawerType]].fa

                element = { ...element, ...addTo }
                arr.push(element)
            });

            const allCat = { [drawerType]: 'all', count: allCount, checked: false, text: 'همه' }
            const arr2 = [allCat, ...arr]

            setFirstInitial(arr2)
        }
    }, [filterData, drawerType])

    const catReady = useCallback(() => {
        let newDrawerData = [...firstInitial]
        const newCatStr = category.split('-')

        newDrawerData.forEach(element => {
            const catIndex = newCatStr.findIndex((cat) => {
                return cat === element.type
            })
            if (catIndex !== -1) {
                element.checked = true
            } else {
                element.checked = false
            }
        });
        setDrawerData([])
        setTimeout(() => {
            setDrawerData(newDrawerData)
        }, 10);
    }, [category, firstInitial])

    const brandReady = useCallback(() => {
        let newDrawerData = [...firstInitial]
        const newBrandStr = jsonSaz(filter)

        if (newBrandStr.brand !== undefined) {
            const brandArray = newBrandStr.brand.split('-')
            newDrawerData.forEach(element => {
                const catIndex = brandArray.findIndex((cat) => {
                    return cat === element.brand
                })
                if (catIndex !== -1) {
                    element.checked = true
                } else {
                    element.checked = false
                }
            });
        } else {
            if (newDrawerData.length !== 0)
                newDrawerData[0].checked = true
        }
        setDrawerData([])
        setTimeout(() => {
            setDrawerData(newDrawerData)
        }, 10);
    }, [filter, firstInitial])

    useEffect(() => {
        if (drawerType === 'type')
            catReady()
        if (drawerType === 'brand')
            brandReady()
    }, [catReady, brandReady, drawerType])

    const drawerRender = drawerData.map((item, index) => {
        return (
            <div className='filter-drawer-items' key={`${index}-${drawerType}`}>
                <div className='flex-align' style={{ width: 'calc(100% - 1.3rem)' }}>
                    <Checkbox
                        id={item[drawerType]}
                        label={item.text}
                        check={item.checked}
                        click={(event) => filterChangeHandler(drawerType.toUpperCase(), { id: event.target.id, drawerType: drawerType })}
                    />
                </div>
                <p className='drawer-count'>{`(${item.count})`}</p>
            </div>
        )
    })

    return (
        <div className='filter-drawer'>
            {drawerRender}
        </div>
    )
}

export default Drawer