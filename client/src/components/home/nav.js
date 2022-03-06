import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import action from '../../redux/actions'
import './nav.css'
import Buy from '../buy'
import { useHistory } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavFunc() {

    const history = useHistory();
    const dispatch = useDispatch()
    const data = useSelector(state => state.product)
    const dataUser = useSelector(state => state.user)
    const [showModal, setShowModal] = useState(false);

    useEffect(async () => {
        await dispatch(action.getAllCategories())
        await dispatch(action.getAllProducts())
    }, [])

    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false)
    }

    function goToPay() {
        closeModal()
        history.push('/cart')
    }

    function func(e) {
        e.preventDefault()
        let u = dataUser?.currentUser
        u.isNewsLetter = true
        dispatch(action.updateUser(u))
    }

    return (<>
        <Navbar className="navBar-container" expand="lg">
            <Container>
                <div onClick={openModal}>
                    <i className="far fa-shopping-cart"></i>
                    <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                </div>
                <LogoutIcon onClick={()=>{dispatch(action.logout());history.push('/home')}}></LogoutIcon>
                <Navbar.Brand className="harmonia-logo"><h2 className='title'>הרמוניה לבית</h2></Navbar.Brand>
                <Link className="link" to="/home"><p>דף הבית</p></Link>
                {!dataUser.currentUser?<>
                <Link className="link" to="/Sign-in"><p>התחברות</p></Link>
                <Link className="link" to="/Sign-up"><p>הרשמה</p></Link></>:null
                }
                {data.categories?.map((item, key) => (
                    <Link className="link" key={key} to={`/${item.categoryName}`} onClick={() => dispatch(action.changeCategory(item._id))}><p>{item.categoryName}</p>{' '}</Link>
                ))}
                <Link className="link" to="/about"><p>אודות</p></Link>
                <Link className="link" to="/branch"><p>סניפים</p></Link>
                {dataUser.isAdmin?
                    < Link className="link" to="/updates"><p>עדכונים</p></Link>:null}
               
            </Container>

        {showModal && <Modal.Dialog>
            {/* <Modal.Header closeButton>
                    <Modal.Title>סגור</Modal.Title>
                </Modal.Header> */}
            <Modal.Body>
                <Buy />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>ביטול</Button>
                <Button variant="primary" onClick={() => goToPay()}>לתשלום</Button>
            </Modal.Footer>
        </Modal.Dialog>}
    </Navbar>
        {/* <div>
        <form onSubmit={(e)=>func(e)}>
            <input type='email' placeholder='הכנס מייל'></input>
            <button type='submit' ></button>
          </form>
        </div> */}
        </>
    )
}