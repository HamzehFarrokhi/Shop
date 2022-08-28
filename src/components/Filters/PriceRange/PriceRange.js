import React, { useEffect, useState, useRef } from 'react'
import './PriceRange.css'

import Input from '../../UI/Input/Input'

let optimizerCount = 0

const PriceRange = ({ max, filterPrice, filterChangeHandler }) => {
    const [sliderOneValue, setSliderOne] = useState(0);
    const [sliderTwoValue, setSliderTwo] = useState(max);
    const [rangeOne, setRangeOne] = useState(0);
    const [rangeTwo, setRangeTwo] = useState(max);
    const [minGap, setMinGap] = useState(500000);
    const [step, setStep] = useState(500000);

    const inputRefmin = useRef()
    const inputRefmax = useRef()

    const refs = [inputRefmin, inputRefmax]

    const [sliderStyle, setStyler] = useState({});

    useEffect(() => {
        let newMinGap = Math.round(max / 15)
        setMinGap(newMinGap)
        setStep(newMinGap)
        
        if (filterPrice === null) {
            setSliderOne(0)
            setRangeOne(0)
            setSliderTwo(max)
            setRangeTwo(max)
        } else {
            setSliderOne(filterPrice.min > (max - newMinGap) ? 0 : filterPrice.min)
            setRangeOne(filterPrice.min > (max - newMinGap) ? 0 : filterPrice.min)
            setSliderTwo(Math.min(filterPrice.max, max))
            setRangeTwo(Math.min(filterPrice.max, max))
        }
    }, [max, filterPrice])

    useEffect(() => {
        const p1 = 100 - Math.round((sliderOneValue / max) * 100);
        const p2 = 100 - Math.round((sliderTwoValue / max) * 100);
        setStyler({
            background: `linear-gradient(to right, #dadae5 ${p2}% , #95afff ${p2}% , #95afff ${p1}%, #dadae5 ${p1}%)`
        });
    }, [sliderOneValue, sliderTwoValue, max]);

    const commaAdder = (price) => {
        try {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } catch {
            return price
        }
    }

    const slideOne = (value) => {
        const lastValue = parseInt(sliderTwoValue) - value <= minGap ? parseInt(sliderTwoValue) - minGap : value;
        setSliderOne(lastValue);
        setRangeOne(lastValue);

        networkOptimizer({ min: lastValue, max: sliderTwoValue })
    };

    const slideTwo = (value) => {
        const lastValue = value - parseInt(sliderOneValue) <= minGap ? parseInt(sliderOneValue) + minGap : value;
        setSliderTwo(lastValue);
        setRangeTwo(lastValue);

        networkOptimizer({ min: sliderOneValue, max: lastValue })
    };

    const networkOptimizer = (data) => {
        optimizerCount++;
        const optimizer = (tempTimeOut) => {
            setTimeout(() => {
                if (tempTimeOut === optimizerCount) {
                    filterChangeHandler('PRICE', data)
                    optimizerCount = 0;
                }
            }, 1500)
        }
        optimizer(optimizerCount)
    }

    const inputData = [
        {
            id: 1, tag: 'min-price', type: 'text', placeholder: '', value: commaAdder(rangeOne), validation: {
                required: true
            }, valid: false, used: false
        },
        {
            id: 2, tag: 'max-price', type: 'text', placeholder: '', value: commaAdder(rangeTwo), validation: {
                required: true
            }, valid: false, used: false
        }
    ]

    const inputChange = (val, id) => {
        const value = val.replaceAll(',', '')
        if (value !== '') {
            if (id === 1 && value >= 0)
                slideOne(value)
            else if (id === 2 && value <= max)
                slideTwo(value)
        }
    }

    return (
        <div className="price-range">
            <div className="value-inputs">
                {inputData.map(item => {
                    return (
                        <div className={`input-${item.tag}`} key={item.id}>
                            <Input
                                config={item}
                                key={item.id}
                                onChange={(event) => inputChange(event.target.value, item.id)}
                                step={step}
                                ref={refs[item.id - 1]}
                            />
                            <p>تومان</p>
                        </div>
                    )
                })}
            </div>
            <div className="container">
                <div className="slider-track" style={sliderStyle}></div>
                <input
                    type="range"
                    min={0}
                    max={max}
                    step={step}
                    value={sliderOneValue}
                    onInput={(event) => slideOne(event.target.value)}
                />
                <input
                    type="range"
                    min={0}
                    max={max}
                    step={step}
                    value={sliderTwoValue}
                    onInput={(event) => slideTwo(event.target.value)}
                />
            </div>
        </div>
    )
}

export default PriceRange