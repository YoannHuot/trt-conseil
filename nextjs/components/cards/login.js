import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SubmitValid } from '../button/button'
import useAuth from "../../store/auth/hooks";
import { useRouter } from 'next/router'

const Login = () => {
    const auth = useAuth();
    const router = useRouter();

    const [mail, setMail] = useState("Yoann.huot@gmail.com");
    const [password, setPassword] = useState("Yoshi90120!");
    const [role, setRole] = useState("recruteurs")

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
        <div className='flex flex-col justify-center'>

            <label className='mt-4'>Vous êtes  </label>
            <select defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                <option value="administrateurs">Administrateur</option>
                <option value="consultants">Consultant</option>
                <option value="recruteurs">Recruteur</option>
                <option value="candidats">Candidat</option>
            </select>

            <label className='mt-2'>Mail</label>
            <input type={"text"} value={mail} onChange={(e) => setMail(e.target.value)} />

            <label className='mt-2'>Mot de passe</label>
            <input type={"text"} value={password} onChange={(e) => setPassword(e.target.value)} />

            <SubmitValid handleSubmit={handleSubmit} />
        </div>
    )
}

export default Login