import React, { useEffect, useState } from 'react'
import useAuth from '../../store/auth/hooks';
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';

const Administrateurs = ({ firstname, name }) => {
    const auth = useAuth()
    const [consultantsUnChecked, setConsultantsUnchecked] = useState()
    const [validation, setValidation] = useState(false)

    /*
    /  Check consultants unValidate, adminstateurs rule
    */
    useEffect(() => {
        if (auth.authStore.role && auth.authStore.role === "administrateurs") {
            const payload = { token: Cookies.get('jwt') }
            axios.get('http://localhost:8000/pages/validation.php', { params: payload })
                .then(response => {
                    setConsultantsUnchecked(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [auth.authStore.role, validation])


    const handleValidation = (user) => {
        const payload = Cookies.get('jwt')
        axios.post('http://localhost:8000/pages/validation.php', { payload, user })
            .then((response) => {
                console.log(response.data);
                setValidation(!validation)
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div>
            <span>
                Bonjour {firstname + " " + name}, Bienvenue sur Trt-Conseil  espace des {auth.authStore.role}
            </span>
            {consultantsUnChecked && consultantsUnChecked.length > 0 ?

                _.map(consultantsUnChecked, (user, key) => {
                    return (
                        <div className='flex flex-center w-full flex-col bg-amber-500 mb-4 ' key={key}>
                            <span className='mr-2'>{user.nom}</span>
                            <span className='mr-2'>{user.prenom}</span>
                            <span>{user.email}</span>
                            <button className='bg-blue-400' onClick={() => { handleValidation(user) }}>Valider le consultant</button>
                        </div>
                    )

                }) : <div>Aucun nouveau consultant à valider</div>
            }

        </div>
    )
}

export default Administrateurs