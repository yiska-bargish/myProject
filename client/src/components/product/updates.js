import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../redux/actions'
import { Redirect, useHistory } from 'react-router-dom';

export default function Updates() {

    const dispatch = useDispatch()
    const data = useSelector(state => state)

    const [img, setImg] = useState('')
    const [arrcolor, setArrColor] = useState([])
    const [color, setColor] = useState()
    const [addCategory, setAddCategory] = useState(false)
    const history = useHistory()
    async function initProduct(e) {
        debugger
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
        const formData = new FormData()
        formData.append('file', img)
        dispatch(action.addProduct({ p: p, file: formData }))
        dispatch(action.changeCategory(p.categoryCode))
        history.push('/' + data?.product?.categories.find(x => x._id == p.categoryCode)?.categoryName)
    }

    if (!data?.user?.isAdmin)
        return <Redirect to='/home'></Redirect>

    return (
        <form onSubmit={(e => initProduct(e))}>
            <div className='nihul'>
                <h3>ניהול מוצרים</h3>
                <select id='category'>
                    {data?.product?.categories?.map((item, key) => (
                        <option value={key}>{item.categoryName}</option>
                    ))}
                </select>
                {/* מלאי */} 
                <input id='productName' placeholder='הכנס שם מוצר'></input>
                <input id='price' placeholder='הכנס מחיר'></input>
                <textarea id='description' placeholder='הכנס תיאור'></textarea>
                <input type='file' onChange={(e) => setImg(e.target.files[0])}></input>
                <img src={img ? URL.createObjectURL(img) : ''} style={{ width: '200px' }}></img>
                <input id='color' value={color} onChange={e => setColor(e.target.value)} type='color'></input>
                <button type='button' onClick={() => {
                    setArrColor([...arrcolor, { color: color }])
                    // setColor('')
                }}>הוסף צבע</button>
                {arrcolor?.map((item) => (
                    <div style={{ backgroundColor: item.color, width: '50px', height: '50px' }}></div>
                ))}
                <button type='submit'>הוסף</button>
            </div>
            <div className='nihul'>
                <h3>ניהול קטגוריות</h3>
                {addCategory ? <input id='newCategory' placeholder='הכנס קטגוריה' /> : <button type="button" onClick={() => setAddCategory(true)}>הוספת קטגוריה</button>}
                <button type='submit'>הוסף</button>
                {/* <button type='submit'>מחק</button> */}

            </div>
            <div className='nihul'>
                <h3>ניהול מבצעים</h3>
{/*                 
                {addCategory ? <input id='newCategory' placeholder='הכנס מבצע' /> : <button type="button" onClick={() => setAddCategory(true)}>הוספת מבצע</button>}
                <button type='submit'>הוסף</button> */}

            </div>
            <div className='nihul'>
                <h3>ניהול סניפים</h3>
{/* 
                {addCategory ? <input id='newSale' placeholder='הכנס סניף' /> : <button type="button" onClick={() => setAddCategory(true)}>הוספת סניף</button>}
                <button type='submit'>הוסף</button>
                <button type='submit'>מחק</button> */}

            </div>
            <button to="/home" onClick={()=>{dispatch(action.logout())}}>log off</button>
            {/* <button onClick={"/home"}>log off</button>  */}
        </form>
    )
}
//addProduct