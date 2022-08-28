import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressAction } from '../../redux/action/userAction'
import { AuthContext } from '../../context/auth-context'
import RadioBox from '../UI/RadioBox/RadioBox'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Modal from '../UI/Modal/Modal'
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner'
import './AddressList.css'
import config from '../../config'

const AddressList = () => {

    const authContext = useContext(AuthContext)
    const [addressData, setAddressData] = useState([])
    const [tempAddressData, setTempAddressData] = useState([])

    const [showAddressModal, setShowAddressModal] = useState(false)
    const [askModal, setAskModal] = useState(false)
    const [currentPostCode, setCurrentPostCode] = useState(0)

    const dispatch = useDispatch()
    const setAddress = useSelector((state) => state.setUserAddress)
    const { editRquestLoading, editResponse } = setAddress

    const showAskModal = (postCode) => {
        setAskModal(!askModal)
        setCurrentPostCode(postCode)
    }

    const addressList = addressData.map((item, index) => {
        return (
            <div className='address-item flex-align' key={index}>
                <div className='w-100'>
                    <div className='flex-align w-100'>
                        <RadioBox
                            id={index}
                            label={item.address}
                            check={item.active}
                            group='address-group'
                            click={() => setActiveAddress(item.postCode)}
                        />
                        <div className='flex-align flex-gap-20'>
                            {item.active ? <div className='flex-align flex-gap-10'>
                                <i className='fa-solid fa-check icon-background blue-grad'></i>
                                <span className='descripe-2 no-select'>اصلی</span>
                            </div> : null}
                            <i onClick={() => showAskModal(item.postCode)} className='fa-regular fa-trash-can icon-background red-grad cursor-pointer'></i>
                        </div>
                    </div>
                    <div className='address-detail'>
                        <div className='flex-align'>
                            <p className='descripe-2'>کد پستی:</p>
                            <p className='font-samim title-2'>{item.postCode}</p>
                        </div>
                        <div className='flex-align'>
                            <p className='descripe-2'>شماره تلفن:</p>
                            <p className='font-samim title-2'>{item.phone}</p>
                        </div>
                        <div className='flex-align'>
                            <p className='descripe-2'>نام تحویل گیرنده:</p>
                            <p className='font-samim title-2'>{item.reciever}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    useEffect(() => {
        const address = authContext.userData.data.address
        const addressArr = address !== undefined ? JSON.parse(address) : ""
        if (Array.isArray(addressArr)) {
            setAddressData(addressArr)
        }
    }, [authContext.userData.data.address])

    const [inputValues, setInputValues] = useState({
        'address': {
            value: '',
            valid: true,
            used: true,
            errors: ''
        },
        'postCode': {
            value: '',
            valid: true,
            used: true,
            errors: ''
        },
        'reciever': {
            value: '',
            valid: true,
            used: true,
            errors: ''
        },
        'phone': {
            value: '',
            valid: true,
            used: true,
            errors: ''
        },
    })
    const inputData = [
        {
            id: 1, tag: 'address', type: 'text', placeholder: 'آدرس', validation: {
                required: true
            }, ...inputValues.address
        },
        {
            id: 2, tag: 'postCode', type: 'text', placeholder: 'کد پستی (ده رقمی)', validation: {
                required: true,
                length: 10,
                // number: true,
                postCodeDuplicate: true
            }, ...inputValues.postCode
        },
        {
            id: 3, tag: 'reciever', type: 'text', placeholder: 'نام و نام خانوادگی دریافت کننده', validation: {
                required: true
            }, ...inputValues.reciever
        },
        {
            id: 4, tag: 'phone', type: 'text', placeholder: 'شماره تماس', validation: {
                required: true,
                length: 11,
                // number: true
            }, ...inputValues.phone
        }
    ]

    const checkValidation = (value, rules) => {
        let errors = []
        if (rules.required) {
            if (value.trim() === '')
                errors.push('empty')
        }
        if (errors.length === 0) {
            if (rules.length) {
                if (value.length !== rules.length)
                    errors.push(`length-${rules.length}`)
            }
            if (rules.number) {
                const intValue = parseInt(value)
                if (!Number.isInteger(intValue))
                    errors.push(`number`)
            }
            if (rules.postCodeDuplicate) {
                addressData.forEach(item => {
                    if (item.postCode === value)
                        errors.push('postcode-duplicate')
                })
            }
        }
        let final = errors.join(' ')

        return final
    }

    const addAddressHandler = () => {
        let validateArr = {}
        inputData.forEach(element => {
            let validateResult = checkValidation(inputValues[element.tag].value, element.validation)
            validateArr = { ...validateArr, [element.tag]: validateResult }
        });
        let final = !Object.values(validateArr).some((x) => x !== '')

        if (final) {

            let addAddress = {}
            Object.keys(inputValues).forEach((item) => {
                addAddress = {
                    ...addAddress,
                    [item]: inputValues[item].value
                }
            })
            addAddress = { ...addAddress, active: true }

            //////deactive addressData////
            let deactivateAddressData = []
            addressData.forEach(element => {
                deactivateAddressData = [
                    ...deactivateAddressData,
                    { ...element, active: false }
                ]
            });

            const newAddressData = [...deactivateAddressData, addAddress]
            setTempAddressData(newAddressData)

            const finalAddress = '$' + JSON.stringify(newAddressData);

            const user_data = JSON.parse(window.localStorage.getItem("user_data"))
            if (user_data !== null) {
                if (user_data.phone.length === 11) {
                    let token = user_data !== null ? user_data.token : ''
                    dispatch(userAddressAction(user_data.phone, token, finalAddress))
                }
            }

        } else {
            let newInputArr = {}
            Object.keys(validateArr).forEach((element) => {
                let errorRender = validateArr[element] === '' ? null : validateArr[element].split(' ').map((error) => {
                    return (
                        <p key={`${element}-${error}`} className='descripe-2' style={{ color: 'var(--errorText)' }}>{` - ${config.errors[error]}`}</p>
                    )
                })

                newInputArr = {
                    ...newInputArr,
                    [element]: {
                        ...inputValues[element],
                        valid: validateArr[element] !== '' ? false : true,
                        used: true,
                        errors: errorRender
                    }
                }
            })
            setInputValues(newInputArr)
        }
    }

    const removeAddressHandler = (postCode) => {
        let newAddress = [...addressData]
        let findRecord = addressData.findIndex(address => address.postCode === postCode)
        newAddress.splice(findRecord, 1)

        /////active address
        if (!newAddress.some(address => address.active === true) && newAddress.length !== 0) {
            newAddress[0].active = true
        }
        console.log(newAddress)
        setTempAddressData(newAddress)

        const finalAddress = '$' + JSON.stringify(newAddress);
        const user_data = JSON.parse(window.localStorage.getItem("user_data"))
        if (user_data !== null) {
            if (user_data.phone.length === 11) {
                let token = user_data !== null ? user_data.token : ''
                dispatch(userAddressAction(user_data.phone, token, finalAddress))
            }
        }
    }

    const setActiveAddress = (postCode) => {
        let newAddress = [...addressData]
        let findRecord = addressData.findIndex(address => address.postCode === postCode)

        //deactive address
        newAddress.forEach(element => {
            element.active = false
        });

        newAddress[findRecord].active = true

        setTempAddressData(newAddress)

        const finalAddress = '$' + JSON.stringify(newAddress);
        const user_data = JSON.parse(window.localStorage.getItem("user_data"))
        if (user_data !== null) {
            if (user_data.phone.length === 11) {
                let token = user_data !== null ? user_data.token : ''
                dispatch(userAddressAction(user_data.phone, token, finalAddress))
            }
        }
    }

    useEffect(() => {
        if (Object.keys(editResponse).length !== 0) {
            setAddressData(tempAddressData)
            setShowAddressModal(false)
            setAskModal(false)
        }
    }, [editResponse])

    const inputChangeHandler = (input, value) => {
        const editValue = value.replaceAll(':', '').replaceAll(',', '')

        setInputValues((prevState) => ({
            ...prevState, [input]: {
                ...prevState[input],
                value: editValue,
                used: false
            }
        }))
    }

    return (
        <div className='marg-b-20 w-100 pad-h-20'>
            <Modal modalShow={showAddressModal} modalHandler={() => setShowAddressModal(!showAddressModal)}>
                {editRquestLoading ? <LoadingSpinner className="big-spinner" /> : <>
                    {inputData.map(item => {
                        const isNumber = item.validation.number ? '' : 'input-rtl'
                        return (
                            <div key={item.tag}>
                                <Input
                                    myclass={`form-input input-vazir ${isNumber}`}
                                    config={item}
                                    onChange={(event) => inputChangeHandler(item.tag, event.target.value)}
                                />
                                {!item.used ? '' : <div>
                                    {item.errors}
                                </div>}
                            </div>
                        )
                    })}
                    <div className='flex-align flex-gap-10'>
                        <Button btnType="form width-100" click={addAddressHandler}>اضافه کردن</Button>
                        <Button btnType="idle width-50" click={() => setShowAddressModal(!showAddressModal)}>لغو</Button>
                    </div></>
                }

            </Modal>
            <div className='address-list'>
                {addressList}
            </div>
            <Modal modalShow={askModal} modalHandler={() => setAskModal(false)}>
                {editRquestLoading ? <LoadingSpinner className="big-spinner" /> : <>
                    <p>این آدرس حذف شود؟</p>
                    <div className='flex-align flex-gap-10'>
                        <Button btnType="danger width-100" click={() => removeAddressHandler(currentPostCode)}>حذف آدرس</Button>
                        <Button btnType="idle width-50" click={() => setAskModal(!askModal)}>لغو</Button>
                    </div>
                </>}
            </Modal>
            {
                addressList !== undefined && addressList.length < 10 ? <div className='add-address' onClick={() => setShowAddressModal(true)}>
                    <i className='fa-regular fa-plus'></i>
                    <p>افزودن آدرس جدید</p>
                </div> : ''
            }
        </div >
    )
}

export default AddressList