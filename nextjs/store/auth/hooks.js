import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { updateLogged } from "./actions";
import axios from "axios";

const useAuth = () => {
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth);

    const [response, setResponse] = useState()
    const login = async (e) => {

        const post = await axios.post("http://localhost:8000/users/insert.php", { payload: e })
            .then(response => {
                if (response.data === "Success") {
                    dispatch(updateLogged(true));
                } else {
                    setResponse(response.data);
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });


    };


    return {
        authStore,
        login,
        response
        // signup,
    };
};

export default useAuth;