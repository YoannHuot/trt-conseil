import React, { useEffect, useState } from 'react'
import useAuth from '../../store/auth/hooks';
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';

const Candidats = ({ firstname, name }) => {
    const auth = useAuth()
    const [consultantsUnChecked, setConsultantsUnchecked] = useState()
    const [validation, setValidation] = useState(false)


    return (
        <div>
            {auth.authStore.certified ?
                <>
                    certified ma gueule
                </> :
                <div>Votre compte est en cours de validation, un administrateur se charge de l'examiner. Nous reviendrons vers vous une fois votre compte validé</div>
            }
        </div>
    )
}

export default Candidats