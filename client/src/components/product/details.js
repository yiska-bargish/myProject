import React, { useState } from 'react'
import { useParams ,useHistory} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import actions from '../../redux/actions'

export default function Details() {
    const history = useHistory()
    const data = useSelector(state => state)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [add,setAdd]=useState()

    function addFunc(){
        dispatch(actions.addToCart(id))
        setAdd(true)
        setTimeout(()=>
        history.push(`/${data?.product?.categories?.find(x=>x._id==data?.product?.category)?.categoryName}`)
        ,2000)
    }

    if(!id)
    history.push('/')

    return (
        <>
            <button onClick={()=>history.push(`/${data?.product?.categories?.find(x=>x._id==data?.product?.category)?.categoryName}`)}>הקודם</button>
            {data?.product?.products?.find(x => x._id == id)?.productName}
            {data?.product?.products?.find(x => x._id == id)?.description}
            {data?.product?.products?.find(x => x._id == id)?.price}
            <img src={data?.product?.products?.find(x => x._id == id)?.img} style={{ width: '300px' }}></img>
            {/* {data?.product?.products?.find(x => x._id == id)?.description} */}
            {data?.product?.products?.find(x => x._id == id)?.colors?.map((item) => (
                <div style={{ backgroundColor: item.color, width: '50px', height: '50px' }}></div>
            ))}
            <button onClick={()=>addFunc()}>הוסף לסל</button>
            {add?<h1>!!!המוצר נוסף לסל בהצלחה</h1>:null}
        </>
    )
}