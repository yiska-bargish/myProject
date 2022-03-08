
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../redux/actions'
import TextField from 'mui-rtl-textfield'
import Button from '@mui/material/Button';
import { Link, Redirect, useHistory } from 'react-router-dom';

export default function SignIn() {

    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector(state => state.user)

    function initUser(e) {
        e.preventDefault()
        let user = {}
        user.userName = e.target.userName?.value
        user.password = e.target.password?.value
        user.email = e.target.email?.value
        user.phone = e.target.phone?.value
        user.isNewsLetter = e.target.news.checked
        dispatch(action.addUser(user))
    }

    if (data.currentUser)
        history.push("/private-area")

    return (
        <form onSubmit={(e => initUser(e))}>
            {/* <input id='userName' placeholder='הכנס שם משתמש'></input>
            <input type='password' id='password' placeholder='הכנס סיסמה'></input>
            <input type="email" id='email' placeholder='הכנס מייל'></input>
            <input id='phone' placeholder='הכנס טלפון'></input>
            <button type='submit'>הרשם</button> */}

            <h1 className='custom-h1'>הרשמה</h1>

            {/* <TextField
                id="userName"
                label="שם משתמש"
                type="text"
                autoComplete="-passwcurrentord"
            />
            <br /><br />
            <TextField
                id="password"
                label="סיסמא"
                type="password"
                autoComplete="-passwcurrentord"
            /> */}

            <TextField
                className='textfield'
                id="userName"
                label="שם מלא"
                type="text"
                autoComplete="-passwcurrentord"
                required
            />
            <br /><br />
            <TextField
                className='textfield'
                id="email"
                label="מייל"
                type="email"
                //name="email-inputted"‏
                autoComplete="-passwcurrentord"
                required
            />
            <br /><br />
            <TextField
                className='textfield'
                id="phone"
                label="טלפון"
                type="text"
                autoComplete="-passwcurrentord"
                required
            />
            <br /><br />
            <TextField
                className='textfield'
                id="address"
                label="כתובת"
                type="text"
                autoComplete="-passwcurrentord"
                required
            />
            <br /><br />
            <TextField
                className='textfield'
                id="password"
                label="סיסמה"
                type='password'
                autoComplete="-passwcurrentord"
                required
            />
            <br />
            <p style={{ direction: "ltr" }}>מאשר/ת קבלת מיילים <input id='news' type="checkbox"></input></p>
            <button className='btn-gold-small' type='submit'>הרשם</button>
            <br /> <br />
        </form>
    )
}