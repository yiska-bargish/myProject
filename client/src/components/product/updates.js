import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../redux/actions'
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Sale from '../sale/sale'

export default function Updates(props) {

    const dispatch = useDispatch()
    const data = useSelector(state => state)
    const [img, setImg] = useState(null)
    const [arrcolor, setArrColor] = useState([])
    const [color, setColor] = useState()
    const [pToUpdate, setPToUpdate] = useState(null)
    const [addCategory, setAddCategory] = useState(false)
    const history = useHistory()


    useEffect(() => {
        debugger
        if (data.product.pToUpdate)
            setPToUpdate(data?.product.products.find(x => x._id == data.product.pToUpdate))
    }, [data.product.pToUpdate])


    async function initProduct(e) {

        e.preventDefault()
        let p = {}
        if (addCategory) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({ categoryName: e.target.newCategory.value }),
                redirect: 'follow'
            };

            await fetch("http://localhost:4000/createCategory", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    dispatch(action.addCategory(result.newCategory))
                    p.categoryCode = result.newCategory._id
                })
                .catch(error => console.log('error', error));
        }
        else
        p.categoryCode = data?.product?.categories[e.target.category.value]._id
        p.productName = e.target.productName.value
        p.price = e.target.price.value
        p.description = e.target.description.value
        p.colors = arrcolor
        p.count = e.target.count.value
        const formData = new FormData()
        formData.append('file', img)
        if (pToUpdate) {
            p._id = pToUpdate._id
            dispatch(action.updateProduct({ p: p, file: img ? formData : null }))
        }
        else
            dispatch(action.addProduct({ p: p, file: formData }))
        dispatch(action.changeCategory(p.categoryCode))
        history.push('/' + data?.product?.categories.find(x => x._id == p.categoryCode)?.categoryName)
    }

    if (!data?.user?.isAdmin)
        return <Redirect to='/home'></Redirect>

    return (
        <form className="updates" onSubmit={(e => initProduct(e))}>
            <div className='nihul'>
                <h3 class="custom-h1">ניהול מוצרים</h3>
                <select id='category' defaultValue={pToUpdate?.categoryCode}>
                    {data?.product?.categories?.map((item, key) => (
                        <option value={key}>{item.categoryName}</option>
                    ))}
                </select>
                <input defaultValue={pToUpdate?.productName} id='productName' placeholder='הכנס שם'></input>
                <input id='price' defaultValue={pToUpdate?.price} placeholder='הכנס מחיר'></input>
                <textarea id='description' defaultValue={pToUpdate?.description} placeholder='הכנס תיאור'></textarea>
                {/* מלאי */}
                <input id='count' min='1' defaultValue={pToUpdate?.count} type='number' placeholder='הכנס מלאי' ></input>
                <input type='file' onChange={(e) => setImg(e.target.files[0])}></input>
                
                <img src={pToUpdate ? pToUpdate?.img : img ? URL.createObjectURL(img) : ''} style={{ width: '200px' }}></img>
                <input id='color' value={color} onChange={e => setColor(e.target.value)} type='color'></input>
                <button type='button' class="btn-black-small" onClick={() => {
                    setArrColor([...arrcolor, { color: color }])
                    // setColor('')
                }}>הוסף צבע</button>
                <br />
                <div className="background-wrapper">
                    {arrcolor?.map((item) => (
                        <div style={{ backgroundColor: item.color, width: '30px', height: '30px' }}></div>
                    ))}</div>
                <br />
                <button type='submit' class="btn-gold-small">{pToUpdate ? "עדכן מוצר" : "הוסף מוצר"}</button>
            </div>
            <div className='nihul'>
                <h3 class="custom-h1">ניהול קטגוריות</h3>
                {addCategory ? <input id='newCategory' placeholder='הכנס שם קטגוריה' /> : <button type="button" className='btn-black-small' onClick={() => setAddCategory(true)}>הוספת קטגוריה</button>}
                <button type='submit' class="btn-gold-small">הוסף</button>
                {/* <button type='submit'>מחק</button> */}

            </div>
            <div className='nihul'>
                <h3 class="custom-h1">ניהול מבצעים</h3>

                <Sale />

            </div>
            <br />

            {/* <div className='nihul'>
                <h3 class="custom-h1">ניהול סניפים</h3>
                
                {addCategory ? <input id='newSale' placeholder='הכנס סניף' /> : <button type="button" onClick={() => setAddCategory(true)}>הוספת סניף</button>}
                <button type='submit'>הוסף</button>
                <button type='submit'>מחק</button>

            </div> */}

            {/* <button to="/home" onClick={()=>{dispatch(action.logout())}}>log off</button> */}
            {/* <button onClick={"/home"}>log off</button>  */}
        </form>

    )
}
