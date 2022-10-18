export const replayVideo = (ref) => {
    ref.current.replayAsync();
}

export const gotToHome = (navigation) => {
    navigation.navigate("Home");
}