import { combineReducers } from 'redux';
import loading from "../Screens/Loading/loadingSlice";
import auth from "../Auth/authSlice";
import status from "../Auth/statusSlice";

export default combineReducers({
    loading,
    auth,
    status
})