import {gotToHome, replayVideo} from "./utils";

export const actions = [
    { id: "1", icon: 'replay', iconLibrary: 'MaterialIcons', op: replayVideo },
    { id: "2", icon: 'home', iconLibrary: 'MaterialIcons', op: gotToHome }
]