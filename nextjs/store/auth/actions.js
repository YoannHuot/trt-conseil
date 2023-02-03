export const UPDATE_LOGGED = "UPDATE_LOGGED";

export const updateLogged = (logged) => {
    console.log("user logged : " + logged)
    return {
        type: UPDATE_LOGGED,
        logged
    };
};
