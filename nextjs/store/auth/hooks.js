import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { updateLogged, updateToken } from "./actions";
import axios from "axios";

const useAuth = () => {
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth);

    const [response, setResponse] = useState()
    const [loginResponse, setLoginResponse] = useState()

    const signup = async (e) => {
        await axios.post("http://localhost:8000/users/insert.php", { payload: e })
            .then(response => {
                if (response.data === "Success") {
                    dispatch(updateLogged(true));
                } else {
                    setResponse(response.data);
                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const login = async (data) => {
        await axios.get('http://localhost:8000/users/current.php', { params: data })
            .then(response => {
                if (response.data.jwt && response.data.jwt.length > 25) {
                    dispatch(updateToken(true, response.data.jwt))
                } else {
                    console.log((response.data));
                }
            })
            .catch(error => {
                setLoginResponse(response.data)
                console.log(error)
            });
    }


    return {
        authStore,
        signup,
        response,
        login,
        // signup,
    };
};

export default useAuth;