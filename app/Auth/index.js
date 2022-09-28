import React, {useEffect} from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {updateAuthState} from "./authSlice";
import { useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from "firebase/database";
import {updateLoadingState} from "../Screens/Loading/loadingSlice";
import {setStatus} from "./statusSlice";
import {populateScenes} from "./sceneSlice";

const Auth = ({ children }) => {

    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(() => {
        signOut(auth);
    }, []);

    async function browseReferentialList(path, reference, attribute, values) {
        const statusSnapshot = await get(child(ref(getDatabase()), path));

        if (statusSnapshot.exists()) {
            const statusBySnapshot = statusSnapshot.val();

            reference[attribute] = Object.keys(statusBySnapshot).map((key) => {
                const customValues = values.reduce((acc, current) => {
                    return {
                        ...acc,
                        [current]: statusBySnapshot[key][current]
                    }
                }, {});

                return { id: key, ...customValues }});
        }

        return reference;
    }

    onAuthStateChanged(auth, async (user) => {
        let authDetails = { isAuthenticated: !!user, user: undefined };
        let statusRef = { status: [] };
        let scenesRef = { scenes: [] };

        if (user) {
            const userSnapshot = await get(child(ref(getDatabase()), 'users/' + user.uid));

            const authDetailsBySnapshot = userSnapshot.exists() ? { user: { id: user.uid, ...userSnapshot.val()} } : { isAuthenticated: false };

            authDetails = {...authDetails, ...authDetailsBySnapshot};

            statusRef = await browseReferentialList('status', statusRef, 'status', ['value']);

            scenesRef = await browseReferentialList('scenes', scenesRef, 'scenes', ['movieName', 'url', 'year']);
        }

        dispatch(updateAuthState(authDetails));
        dispatch(setStatus(statusRef));
        dispatch(populateScenes(scenesRef));
        dispatch(updateLoadingState(false));
    });

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Auth;