import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../redux/actions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';


export default function SignIn() {

    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector(state => state.user)

    function initUser(e) {
        e.preventDefault()
        let user = {}
        user.email = e.target.email.value
        user.password = e.target.password.value
        dispatch(action.login(user))
    }
    
    if (data.currentUser&&!data.isAdmin)
        history.push("/private-area")

    if(data.isAdmin)
    history.push("/updates")

    return (
        <form onSubmit={(e => initUser(e))}>
            <br />
            <h2>התחברות</h2>
            <br />
            <TextField
                id="email"
                label="הכנס מייל"
                type="email"
                autoComplete="-passwcurrentord"
                className='textfield'
            />
            <br /><br />
            <TextField
                id="password"
                label="סיסמא"
                type="password"
                autoComplete="-passwcurrentord"
                className='textfield'
            />
            <br /><br />
            {/* <input id='userName' placeholder='הכנס שם משתמש'></input>
            <input id='password' placeholder='הכנס סיסמה'></input> */}
            <span>   עדיין לא נרשמת <Link to='/Sign-up'> הרשם עכשיו </Link> </span>
            <br /><br />
            <Button variant="contained" type='submit'>התחבר</Button>
        </form>
    )
}