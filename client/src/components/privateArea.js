import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../redux/actions'
import {useHistory} from 'react-router-dom'
export default function PrivateArea() {
    const dispatch = useDispatch()
    const data = useSelector(state => state)
     const history = useHistory()
    useEffect(() => {
     dispatch(actions.getBasketByUserId(data.user?.currentUser?._id))
    }, [])

    if(!data.user?.currentUser)
    history.push('/')

    return (
<div>
        {data?.user?.userBasket?.map((i,index)=>(
            <div class="bag-product" key={i._id}>
            {" "}
            <img
              style={{ width: "80px", height: "80px" }}
              src={data?.product.products?.find(p=>p._id==i.id)?.img} style={{width:"200px"}}
            ></img>
            <h3>
            {data?.product.products?.find(p=>p._id==i.id)?.productName}
            </h3>
            <h5>
              {" "}
              {data?.product.products?.find(p=>p._id==i.id)?.price} ש"ח
            </h5>
          
          </div>
  ))}

</div>
        // <table>
        //     <tbody>
        //     <tr>
        //         <th>כמות</th>
        //         <th>תאריך</th>
        //         <th>מחיר</th>
        //         <th>תמונה</th>
        //         <th>שם</th>
        //     </tr>
        // {data?.user?.userBasket?.map((item,index)=>(
        //     <tr key={item._id}>
        //           <td>{item.basketDate.split('T')[0]}</td>
        //          {item.products?.map((i,key)=>(
        //             <div key={i._id}>
        //           <td>{i.amount}</td> 
        //           <td>{data?.product.products?.find(p=>p._id==i.productCode)?.productName}</td>             
        //           <td>{data?.product.products?.find(p=>p._id==i.productCode)?.price}</td>             
        //           <td><img  src={data?.product.products?.find(p=>p._id==i.productCode)?.img} style={{width:"200px"}}></img></td>            
        //           </div>            
        //         ))}
        //     </tr>
        // ))}
        // </tbody>
        // </table>
    )
}