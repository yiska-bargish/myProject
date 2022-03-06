import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../redux/actions'
import {useHistory} from 'react-router-dom'
import { getStepButtonUtilityClass } from '@mui/material'

export default function Cart() {
   const history = useHistory()

   const [sum, setSum] = useState()
   const [buy, setBuy] = useState(false)
   const data = useSelector(state => state.product)
   const dataUser = useSelector(state => state.user)
   const dispatch = useDispatch()

   useEffect(() => {
      debugger
      let s = 0
      data?.shoppingCart?.forEach(item => {
         s += (Number(data?.products?.find(x => x._id == item.id)?.price)) * item.count
      })
      setSum(s)
   }, [data?.shoppingCart])

   async function func(e) {
      debugger
      e.preventDefault();
      let user = {}
      user.userName = e.target.userName.value||dataUser?.currentUser?.userName
      user.phone = e.target.phone.value||dataUser?.currentUser?.phone
      user.email = e.target.email.value||dataUser?.currentUser?.email
      user.address = e.target.address.value||dataUser?.currentUser?.address
      user.password = e.target.password.value||dataUser?.currentUser?.password
      if (dataUser?.currentUser)
         dispatch(actions.updateUser(user))
      else
         await dispatch(actions.addUser(user))
      let b = {}
      b.products = []
      data?.shoppingCart?.forEach(item => {
         b.products.push({ productCode: item.id, amount: item.count })
      })
      dispatch(actions.addBasket(b))
      setBuy(true)
      setTimeout(()=>history.push("/private-area"),2000)
      dispatch(actions.resetCart())
   }
   return (
      <>
         {data?.shoppingCart?.map((item, key) => (
            <div key={key}>
               {data?.products?.find(x => x._id == item.id)?.productName}
               {data?.products?.find(x => x._id == item.id)?.price}
               <img style={{ width: "150px" }} src={data?.products?.find(x => x._id == item.id)?.img}></img>
               <lable>כמות: <input defaultValue={item.count} type='number' min='1' max={data?.products?.find(x => x._id == item.id)?.count} onClick={(e) => dispatch(actions.updateCart({ id: item.id, count: e.target.value }))}></input></lable>
            </div>
         ))}
         <h1>כמות המוצרים:{data?.shoppingCart.length}</h1>
         <h1>סה"כ:{sum}</h1>
         <form onSubmit={(e) => func(e)}>
            <input id="userName" defaultValue={dataUser?.currentUser?.userName} placeholder="שם"></input>
            <input id="phone" type='tel' defaultValue={dataUser?.currentUser?.phone} placeholder="טלפון"></input>
            <input id="email" type='email' defaultValue={dataUser?.currentUser?.email} placeholder="מייל"></input>
            <input id="address" defaultValue={dataUser?.currentUser?.address} placeholder="כתובת"></input>
            <input id="password" defaultValue={dataUser?.currentUser?.password} placeholder="סיסמה"></input>
            <div>
               <p>הכנסת פרטי כרטיס אשראי</p>
            </div>
            <button type='submit'> אישור ההזמנה</button>
         </form>
         {buy?<h1>קנייתך בוצעה בהצלחה!!</h1>:null}
      </>

   )
}