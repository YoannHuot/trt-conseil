import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from '../../store/auth/hooks';
import { useRouter } from 'next/router'
import _ from 'underscore';
import Administrateurs from '../../components/roles/administrateurs';
import Candidats from '../../components/roles/candidats';
import Recruteurs from '../../components/roles/recruteurs';


const Homepage = () => {
    const router = useRouter()
    const auth = useAuth()
    const [isLogged, setIsLogged] = useState(false)
    const [isValidate, setIsValidate] = useState(false)
    const [name, setName] = useState();
    const [firstname, setFirstName] = useState()

    /*
   / Check logged and token validity the first time the page is run
   */
    useEffect(() => {
        if (auth.authStore.logged) {
            setIsLogged(true)
            auth.checkToken(Cookies.get('jwt'))

        } else setIsLogged(false)
    }, [])

    useEffect(() => {
        setIsValidate(auth.authStore.certified);
        if (auth.authStore.role) {
            router.replace('/homepage?=' + auth.authStore.role)
        }
    }, [auth.authStore.role])

    useEffect(() => {
        setName(auth.authStore.name);
        setFirstName(auth.authStore.firstname);
    }, [auth.authStore, auth.authStore])


    const getRole = useCallback(() => {
        switch (auth.authStore.role) {
            case "recruteurs":
                return (
                    <Recruteurs firstname={firstname} name={name} />
                )
                break;
            case "candidats":
                return (
                    <Candidats firstname={firstname} name={name} />
                )
                break;
            default:
                return (
                    <Administrateurs firstname={firstname} name={name} />
                )
        }
    }, [auth.authStore.role])

    return (
        <div className="flex flex-col min-h-screen h-full w-full"
        >
            <Header />

            {isLogged ?
                <div className="bg-white flex-1 flex justify-center items-center w-full"
                    style={{ backgroundImage: `url(${'./assets/bg-admin.jpg'})`, backgroundSize: 'cover' }}
                >
                    <div className='flex flex-col justify-center items-center'>
                        <span className='pb-10 font-bold text-white shadow-sm text-xl uppercase text-center px-8'>
                            Bonjour {firstname + " " + name}, Bienvenue sur Trt-Conseil  espace des {auth.authStore.role}
                        </span>
                        {getRole()}

                    </div>

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


