import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import GoogleMaps from './googleMaps'

export default function Branch() {
    
    const dispatch = useDispatch()
    const data = useSelector(state => state)

    useEffect(() => {
        dispatch(actions.getAllBranch())
    }, [])

    return (
        <>
            <h1 className='custom-h1'>{data?.product?.branch?.length} סניפים בארץ</h1>
            {data?.product?.branch?.map((item, key) => (
                <div>
                    <h2>{item.branchName}</h2>
                    <h6>{item.address}</h6>
                    <h6>{item.phone}</h6>
                    <h6>{item.email}</h6>
                    <GoogleMaps lat={item.lat} lng={item.lng} />
                    <br></br>
                </div>
            ))}
            {/* {dataUser?.currentUser?.password == dataUser?.adminAuth ? <>
                <button onClick={() => dispatch(actions.deleteBranch(item._id))}>מחיקה</button>
                <button>עדכון</button>
            </> : null} */}

        </>
    )
}