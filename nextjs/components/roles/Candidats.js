import React, { useEffect, useState } from 'react'
import useAuth from '../../store/auth/hooks';
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';

const Candidats = ({ firstname, name }) => {
    const auth = useAuth()
    const [consultantsUnChecked, setConsultantsUnchecked] = useState()
    const [validation, setValidation] = useState(false)

    /*
    /  Check consultants unValidate, adminstateurs rule
    */
    // useEffect(() => {
    //     if (auth.authStore.role && auth.authStore.role === "Consultants") {

    //         const payload = { token: Cookies.get('jwt') }
    //         axios.get('http://localhost:8000/pages/consultant-validation.php', { params: payload })
    //             .then(response => {
    //                 setConsultantsUnchecked(response.data);
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             });
    //     }
    // }, [auth.authStore.role, validation])

    // const handleValidation = (consultant) => {
    //     const payload = Cookies.get('jwt')
    //     axios.post('http://localhost:8000/pages/consultant-validation.php', { payload, consultant })
    //         .then((response) => {
    //             console.log(response.data);
    //             setValidation(!validation)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    // }

    return (
        <div>
            <span>
                Bonjour {firstname + " " + name}, Bienvenue sur Trt-Conseil  espace des {auth.authStore.role}
            </span>


        </div>
    )
}

export default Candidats