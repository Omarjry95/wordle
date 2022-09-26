import React, {useEffect} from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {updateAuthState} from "./authSlice";
import { useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";
import {updateLoadingState} from "../Screens/Loading/loadingSlice";
import {setStatus} from "./statusSlice";

const Auth = ({ children }) => {

    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(() => {
        signOut(auth);
    }, []);

    onAuthStateChanged(auth, async (user) => {
        let authDetails = { isAuthenticated: !!user, user: undefined };
        let statusRef = { status: [] };

        if (user) {
            const userSnapshot = await get(child(ref(getDatabase()), 'users/' + user.uid));

            const authDetailsBySnapshot = userSnapshot.exists() ? { user: { id: user.uid, ...userSnapshot.val()} } : { isAuthenticated: false };

            authDetails = {...authDetails, ...authDetailsBySnapshot};

            const statusSnapshot = await get(child(ref(getDatabase()), 'status'));

            if (statusSnapshot.exists()) {
                const statusBySnapshot = statusSnapshot.val();

                statusRef.status = Object.keys(statusBySnapshot).map((key) => {
                    const { value } = statusBySnapshot[key];
                    return { id: key, value }});
            }
        }

        dispatch(updateAuthState(authDetails));
        dispatch(setStatus(statusRef));
        dispatch(updateLoadingState(false));
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Auth;