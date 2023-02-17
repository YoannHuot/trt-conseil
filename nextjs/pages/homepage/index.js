import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from '../../store/auth/hooks';
import { useRouter } from 'next/router'
import _ from 'underscore';
import Administrateurs from '../../components/roles/Administrateurs';
import Consultants from '../../components/roles/Consultant';
import Candidats from '../../components/roles/Candidats';
import Recruteurs from '../../components/roles/Recruteurs';


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
        setIsValidate(auth.authStore.certfied);
        if (auth.authStore.role) {
            router.replace('/homepage?=' + auth.authStore.role)
        }
    }, [auth.authStore.role])

    useEffect(() => {
        setName(auth.authStore.name);
        setFirstName(auth.authStore.firstname);
    }, [auth.authStore])


    const getRole = useCallback(() => {
        switch (auth.authStore.role) {
            case "administrateurs":
                return (
                    <Administrateurs firstname={firstname} name={name} />
                )
                break;
            case "consultants":
                return (
                    <Consultants firstname={firstname} name={name} />
                )
                break;
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
                break;
        }
    }, [auth.authStore])

    return (
        <div className="flex flex-col min-h-screen h-full bg-green-400 w-full">
            <Header />
            {isLogged ?
                <div className="bg-red-400 flex-1 flex justify-center items-center w-full">
                    {getRole()}
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


