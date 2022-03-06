import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import { useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { AddShoppingCartIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function Products() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.product)
  const dataUser = useSelector(state => state.user)
  //  const {category} = useParams()

  return (
    <div className='casing'>
      <>
        {data.products?.filter(x => x.categoryCode == data?.category).map((item, key) => (
          <div className='product'>
          <Link to={`details/${item._id}`}>
            <div key={key}>
              <img src={item.img} style={{ width: '200px' }}></img>
              <h3>{item.productName}</h3>
              <h5>{item.description}</h5>
              <h5>{item.price}</h5>
              {/* <h3>name:{item.productName}</h3>
              <h5>description:{item.description}</h5>
              <h5>price:{item.price}</h5> */}
              {item.colors?.map(item => (
                <div key={item._id} style={{ backgroundColor: item.color, width: '50px', height: '50px' }}></div>
              ))}
              {/* <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton> */}
             
            </div>
          </Link>
           {dataUser?.currentUser?.password == dataUser?.adminAuth ? <>
            <button onClick={() => dispatch(actions.deleteProduct(item._id))}>מחיקה</button>
            <button>עדכון</button>
          </> : null}
          </div>
        ))}
      </>
    </div>
  )
}