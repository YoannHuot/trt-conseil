import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from '../../store/auth/hooks';
import { useRouter } from 'next/router'
import axios from 'axios';
import _ from 'underscore';


const Homepage = () => {
    const router = useRouter()
    const auth = useAuth()
    const [isLogged, setIsLogged] = useState(false)
    const [isValidate, setIsValidate] = useState(false)
    const [consultantsUnChecked, setConsultantsUnchecked] = useState()

    useEffect(() => {
        if (auth.authStore.logged) {
            setIsLogged(true)
        } else setIsLogged(false)
    }, [])

    useEffect(() => {
        auth.checkToken(Cookies.get('jwt'))
    }, [])

    useEffect(() => {
        setIsValidate(auth.authStore.certfied);
        if (auth.authStore.role) {
            router.replace('/homepage?=' + auth.authStore.role)
        }
    }, [auth])

    useEffect(() => {
        if (auth.authStore.role && auth.authStore.role === "administrateurs") {
            const payload = { token: Cookies.get('jwt') }
            axios.get('http://localhost:8000/pages/to-validate.php', { params: payload })
                .then(response => {
                    setConsultantsUnchecked(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [auth.authStore.role])




    const handleValidation = (consultant) => {
        const payload = Cookies.get('jwt')
        axios.post('http://localhost:8000/pages/to-validate.php', { payload, consultant })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="flex flex-col min-h-screen h-full bg-green-400">
            <Header />
            {isLogged ?
                <div className="bg-red-400 flex-1 flex justify-center items-center">
                    {isValidate
                        ?
                        <div>
                            <span>
                                Bienvenue sur Trt-Conseil  espace des {auth.authStore.role}
                            </span>
                            {_.map(consultantsUnChecked, (consultant) => {
                                return (
                                    <div className='flex flex-center w-full flex-col bg-amber-500 mb-4 '>

                                        <span className='mr-2'>{consultant.nom}</span>
                                        <span className='mr-2'>{consultant.prenom}</span>
                                        <span>{consultant.email}</span>
                                        <button className='bg-blue-400' onClick={() => { handleValidation(consultant) }}>Valider le consultant</button>
                                    </div>
                                )

                            })

                            }

                        </div>
                        :
                        <div>
                            Un administrateur va valider votre demande
                        </div>
                    }
                </div>
                :
                <div className="bg-blue-400 flex-1 flex justify-center items-center">
                    Vous n'êtes plus connecté, vous allez être renvoyé à la page d'authentification.
                </div>
            }
            <Footer />
        </div >
    )
}



export default Homepage


