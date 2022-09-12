import { combineReducers } from 'redux';
import auth from "../Auth/authSlice";
import loading from "../Screens/Loading/loadingSlice";

export default combineReducers({
    loading,
    auth
})