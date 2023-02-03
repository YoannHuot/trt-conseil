import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { SubmitValid } from '../button/button'

const Login = () => {
    const [mail, setMail] = useState("Y.h@gmail.fr");
    const [password, setPassword] = useState("Yoshi90120!");
    const [role, setRole] = useState("recruteurs")

    const handleSubmit = () => {
        const data = { mail: mail, password: password, role: role }
        axios.get('http://localhost:8000/users/current.php', { params: data })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }


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