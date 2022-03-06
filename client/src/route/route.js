import react from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../components/home/home'
import About from '../components/home/about'
import NavFunc from '../components/home/nav'
import Products from '../components/product/product'
import SignIn from '../components/login/signIn'
import SignUp from '../components/login/signUp'
import Updates from '../components/product/updates'
import Buy from '../components/buy'
import Cart from '../components/cart'
import Branch from '../components/branch/brands'
import Details from '../components/product/details'
import PrivateArea from '../components/privateArea'
export default function Routes() {

    // const dispatch = useDispatch()
    const data = useSelector(state => state.product)
    const dataUser = useSelector(state => state.user)

    return (
        <Router>
            <NavFunc></NavFunc>
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/Sign-in" component={SignIn} />
                <Route path="/Sign-up" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route path="/buy" component={Buy} />
                <Route path="/private-area" component={PrivateArea} />
                <Route path="/cart" component={Cart} />
                <Route path="/details/:id" component={Details} />
                <Route path="/branch" component={Branch} />
                <Route path="/updates" component={Updates} />
                {data.categories?.map((item, key) => (
                    <Route key={key} path={`/${item.categoryName}`} component={Products}/>
                ))}
                 <Route path="/" component={Home} />
                </Switch>
        </Router>
    )
}