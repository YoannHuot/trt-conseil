export const UPDATE_LOGGED = "UPDATE_LOGGED";

export const updateLogged = (logged) => {
    console.log("user logged : " + logged)
    return {
        type: UPDATE_LOGGED,
        logged
    };
};

export const UPDATE_TOKEN = "UPDATE_TOKEN";

export const updateToken = (logged, jwt) => {
    return {
        type: UPDATE_TOKEN,
        logged: logged,
        jwt: jwt
    };
};

export const CHECK_VALIDATION = "CHECK_VALIDATION";

export const checkValidation = (certfied, role) => {
    return {
        type: CHECK_VALIDATION,
        certfied: certfied,
        role: role
    };
};