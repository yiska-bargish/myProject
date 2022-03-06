import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { propTypes } from 'react-bootstrap/esm/Image'
import actions from '../redux/actions'

export default function Buy(props) {

    const [sum, setSum] = useState(0)
    const data = useSelector(state => state.product)
    const dispatch = useDispatch();
    const history = useHistory(); //באמצע עם אסתי למודל

    // const forPay = () => {
    //     props.closeModal();
    //     history.push('/cart')
    // }

    useEffect(() => {
        debugger
        let s = 0
        data?.shoppingCart?.forEach(item => {
            s += (Number(data?.products?.find(x => x._id == item.id)?.price)) * item.count
        })
        setSum(s)
    }, [data?.shoppingCart])

    return (
        <>
            {data?.shoppingCart?.map((item, key) => (
                <div key={key}>
                    {data?.products?.find(x => x._id == item.id)?.productName}
                    {data?.products?.find(x => x._id == item.id)?.price}
                    <img style={{ width: "100px" }} src={data?.products?.find(x => x._id == item.id)?.img}></img>
                    <lable>כמות: <input defaultValue={item.count} type='number' min='1' max={data?.products?.find(x => x._id == item.id)?.count} onClick={(e) => dispatch(actions.updateCart({ id: item.id, count: e.target.value }))}></input></lable>
                    <button onClick={() => dispatch(actions.deleteFromCart(item.id))}>הסר מהסל</button>
                </div>
            ))}
            <h4>כמות המוצרים:{data?.shoppingCart.length}</h4>
            <h4>סה"כ:{sum}</h4>
            {data.user?.currentUser ?
                <div>
                    {/* <h1>פרטים אישיים</h1> */}
                    {/* <h1>{data.user.currentUser.firstname}</h1>
                    <h1>{data.user.currentUser.lastName}</h1> */}
                    <h1>{data.user.currentUser.userName}</h1>
                    <h1>{data.user.currentUser.phone}</h1>
                    <h1>{data.user.currentUser.emeil}</h1>
                </div> :
                <form>
                    {/* <input id="firstname" placeholder="שם פרטי"></input>
                    <input id="lastName" placeholder="שם משפחה"></input>
                    <input id="phone" placeholder="טלפון"></input>
                    <input id="emeil" placeholder="מייל"></input> */}
                    <p>כאן מופיעים כל המוצרים שכרגע נמצאים בעגלת הקניות שלכם</p>
                </form>
            }
        </>

    )
}