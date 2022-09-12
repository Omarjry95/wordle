import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Loading from "../Screens/Loading";
import Playground from "../Screens/Playground";

export const RESTRICTED_ROUTES = [
    { name: 'Home', component: Home, options: { headerShown: false } },
    { name: 'Playground', component: Playground, options: { headerShown: false } }
]

export const ALLOWED_ROUTES = [
    { name: 'Login', component: Login, options: { headerShown: false } }
]

export const LOADING_ROUTES = [
    { name: 'Loading', component: Loading, options: { headerShown: false } }
]