import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import GetUser from "../../service/service"
import { IconButton, Icon } from '@mui/material'
import i from '../../assets/img/14.jpg'
// import image from './image.jpg'
import newimg from './25.jpg'
import { Link } from 'react-router-dom'

export default function Home() {

    const dispatch = useDispatch()
    const data = useSelector(state => state)
    const categories = useSelector(state => state.product.categories)

    return (
        <>
        <p>ggg</p>
            {/* <img className="nisayon" src={image} ></img> */}
            <img className="nisayon" src={newimg} ></img>
            <div style={{ backgroundImage: i, width: '500px' }}></div>
            <div className='home'>
                <br /><br />
                {data?.product?.categories?.map((item, index) => (
                    <div key={index} className="home2">
                        <h3 className="home3">{item.categoryName}</h3>
                        <Link to={`/${item.categoryName}`} onClick={() => dispatch(actions.changeCategory(item._id))}><img className='imgHome' src={data?.product?.products?.find(x => x.categoryCode == item._id)?.img} style={{ width: '300px' }}></img></Link>
                    </div>
                ))
                }
            </div>
            <br />
            <footer style={{ backgroundColor: "grey" }}>
                <div>
                    <h3>קטגוריות ראשיות</h3>
                    {categories.map((item, key) => {
                        return <Link className="link" key={key} to={`/${item.categoryName}`} onClick={() => dispatch(actions.changeCategory(item._id))}><p>{item.categoryName}</p>{' '}</Link>
                    })}
                </div>
                <div>
                    <h3>דברו איתנו</h3>
                    <p>טלפון : 03-7505497</p>
                    <p>פקס : 03-7748439</p>
                    <p>שעות פעילות משרדי החברה : ימים א' – ה': 16:00 - 9:00</p>
                    <br />
                    <p>מייל לפניות לקוחות : cs@hr-l.co.il</p>
                </div>
            </footer>
        </>
    )
}
