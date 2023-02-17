import React, { useEffect, useState } from 'react'
import useAuth from '../../store/auth/hooks';
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';

const Consultants = ({ firstname, name }) => {
    const auth = useAuth()
    const [validation, setValidation] = useState(false)
    const [roles, setRoles] = useState()

    /*
    /  Check consultants unValidate, adminstateurs rule
    */
    useEffect(() => {

        if (auth.authStore.role && auth.authStore.role === "consultants") {
            const payload = { token: Cookies.get('jwt') }
            axios.get('http://localhost:8000/pages/validation.php', { params: payload })
                .then(response => {
                    setRoles(response.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [])

    const handleValidation = (user, role) => {
        const payload = Cookies.get('jwt')
        axios.post('http://localhost:8000/pages/validation.php', { payload, user, role })
            .then((response) => {
                console.log(response.data);
                setValidation(!validation)
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className='w-full px-4 '>
            <span>
                Bonjour {firstname + " " + name}, Bienvenue sur Trt-Conseil  espace des {auth.authStore.role}
            </span>

            <div className=' grid grid-cols-2 justify-center '>
                {
                    _.map(roles, (role, key) => {
                        return (
                            <div className='pt-4 w-3/4'>
                                <span className='font-lg font-semibold uppercase'>{key}</span>
                                {
                                    _.map(role, (user, index) => {
                                        return (
                                            <div className='flex flex-center w-full flex-col bg-amber-500 mb-4 ' key={index}>
                                                <span className='mr-2'>{user.nom}</span>
                                                <span className='mr-2'>{user.prenom}</span>
                                                <span>{user.email}</span>
                                                <button className='bg-blue-400' onClick={() => { handleValidation(user, key) }}>Valider</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default Consultants