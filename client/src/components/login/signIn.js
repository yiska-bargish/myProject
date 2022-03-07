import React from "react";
import { useDispatch, useSelector } from "react-redux";
import action from "../../redux/actions";
// import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme, createMuiTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset  } from '@mui/styles';
import TextField from 'mui-rtl-textfield'
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const jss = create({ plugins: [...jssPreset().plugins, rtl(true)] });



export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);

  function initUser(e) {
    e.preventDefault();
    let user = {};
    user.email = e.target.email.value;
    user.password = e.target.password.value;
   
    dispatch(action.login(user));
    
  }
  const theme = createTheme({
    direction: "rtl"
  });

  if (data.currentUser && !data.isAdmin) history.push("/private-area");

  if (data.isAdmin) history.push("/updates");

  return (
    <form  dir="rtl" onSubmit={(e) => initUser(e)}>
    
      <h1 className="custom-h1">התחברות</h1>
     
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <TextField
            id="email"
            label="הכנס מייל"
            type="email"
            autoComplete="-passwcurrentord"
            className="textfield"
          />
          <br />
          <br />
          <TextField
            id="password"
            label="סיסמא"
            type="password"
            autoComplete="-passwcurrentord"
            className="textfield"
          />{" "}
        </ThemeProvider>
      </StylesProvider>
      <br />
      <br />
      {/* <input id='userName' placeholder='הכנס שם משתמש'></input>
            <input id='password' placeholder='הכנס סיסמה'></input> */}
      <span>
        {" "}
        עדיין לא נרשמת <Link to="/Sign-up"> הרשם עכשיו </Link>{" "}
      </span>
      <br />
      <br />
      <button className="btn-gold-small" type="submit">
        התחבר
      </button>
    </form>
  );
}
