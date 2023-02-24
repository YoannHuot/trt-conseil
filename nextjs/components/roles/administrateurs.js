import React, { useEffect, useState } from 'react'
import useAuth from '../../store/auth/hooks';
import axios from "axios"
import _ from 'underscore';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

const Administrateurs = ({ firstname, name }) => {
    const auth = useAuth()
    const router = useRouter();
    const [role, setRole] = useState(false);

    const features = {
        create: {
            title: "Inscriptions des utilisateurs",
            text: "Vous retrouvrez l'ensemble des consultants et recruteurs nouvellement inscrits qui attendent votre validation",
            action: () => router.push("/listes")
        },
        profil: {
            title: "Voir votre profil",
            text: "Mettez à jour votre profil pour rassurer les candidats sur la pertinence de vos annonces",
            action: () => router.push("/profil")
        },
    }


    useEffect(() => {
        if (auth.authStore.role === "administrateurs" || auth.authStore.role === "consultants") {
            setRole(auth.authStore.role)
        }
    }, [auth.authStore.role]);

    const handleClick = (action) => {
        const payload = { token: Cookies.get('jwt') }
        axios.get('http://localhost:8000/users/check-jwt.php', { params: payload })
            .then(response => {
                if (response.data) {
                    action()
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <section className='Admin-section w-full h-full flex justify-center flex-col px-8' >
            {auth.authStore.certified ?
                <div className='grid grid-cols-2 gap-4 place-items-center px-8'>
                    {
                        _.map(features, (feature, key) => {
                            return (
                                <button key={key} onClick={() => handleClick(feature.action)} className='bg-app-gray pb-4 shadow-xl cursor-pointer h-72 w-full flex flex-col rounded-xl justify-center px-4 text-left'>
                                    <span className='py-4 font-semibold h-14'>{feature.title}</span>
                                    <div className='w-8 bg-red-500 h-1'></div>
                                    <span className='py-4 flex-1'>{feature.text}</span>
                                    <span className='py-2  px-4  bg-app-blue text-white uppercase font-bold shadow-lg rounded-md'>Consulter</span>
                                </button>
                            )
                        })
                    }
                </div> :
                <div className='text-center'>Votre compte est en cours de validation, un administrateur se charge de l'examiner. Un mail vous sera envoyé une fois votre compte actif</div>
            }
        </section>
    )
}

export default Administrateurs