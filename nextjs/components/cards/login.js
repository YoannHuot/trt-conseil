import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SubmitValid } from '../button/button'
import useAuth from "../../store/auth/hooks";
import { useRouter } from 'next/router'

const Login = () => {
    const auth = useAuth();
    const router = useRouter();

    const [mail, setMail] = useState("admin@admin-trt.fr");
    const [password, setPassword] = useState("Yoshi90120!");
    const [role, setRole] = useState("administrateurs")

    const handleSubmit = () => {
        const data = { mail: mail, password: password, role: role }
        auth.login(data);
    }

    useEffect(() => {
        if (auth.authStore.logged === true && auth.authStore.jwt.length > 0) {
            router.push("/homepage")
        }
    }, [auth])

    return (
        <div className='relative flex flex-col justify-center w-full h-full '>

            <div className='flex flex-col px-24'>
                <label className='mt-4'>Role</label>
                <select className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg ' defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="administrateurs">Administrateur</option>
                    <option value="consultants">Consultant</option>
                    <option value="recruteurs">Recruteur</option>
                    <option value="candidats">Candidat</option>
                </select>

                <label className='mt-2'>Mail</label>
                <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg ' type={"text"} value={mail} onChange={(e) => setMail(e.target.value)} />

                <label className='mt-2'>Mot de passe</label>
                <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg ' type={"text"} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='px-32 md:px-48 w-full'>

                <SubmitValid handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Login