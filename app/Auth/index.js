import React, {useEffect} from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {updateAuthState} from "./authSlice";
import { useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";

const Auth = ({ children }) => {

    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(() => {
        signOut(auth);
    }, []);

    onAuthStateChanged(auth, async (user) => {
        let authDetails = { isAuthenticated: !!user, user: undefined }

        if (user) {
            const snapshot = await get(child(ref(getDatabase()), 'users/' + user.uid));

            const authDetailsBySnapshot = snapshot.exists() ? { user: snapshot.val() } : { isAuthenticated: false };

            authDetails = {...authDetails, ...authDetailsBySnapshot};
        }

        dispatch(updateAuthState(authDetails));
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Auth;