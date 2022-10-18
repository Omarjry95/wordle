import { combineReducers } from 'redux';
import loading from "../Screens/Loading/loadingSlice";
import auth from "../Auth/authSlice";
import status from "../Auth/statusSlice";
import scene from "../Auth/sceneSlice";
import playground from "../Screens/Playground/playgroundSlice";

export default combineReducers({
    loading,
    auth,
    status,
    scene,
    playground
})