import React, { useState, useEffect } from 'react'
import _ from 'underscore';
import axios from 'axios';

import { SubmitValid, SubmitUnvalid } from '../button/button';
import { useRouter } from 'next/router'
import useAuth from "../../store/auth/hooks";


const Signup = ({ selected }) => {
    const auth = useAuth();
    const router = useRouter();

    let condition = {
        majuscule: new RegExp("(?=.*?[A-Z])"),
        minuscle: new RegExp("(?=.*?[a-z])"),
        nombre: new RegExp("(?=.*?[0-9])"),
        special: new RegExp("(?=.*?[#?!@$%^&*-])"),
        longueur: new RegExp("(.{8,})")
    }


    const [mail, setMail] = useState("gmail12@test.fr");
    const [name, setName] = useState("Huot");
    const [firstName, setFirstName] = useState("Yoann");
    const [compagny, setCompagny] = useState("gmail12@test.fr")
    const [password, setPassword] = useState("Gmail12@test.fr");
    const [password2, setPassword2] = useState("Gmail12@test.fr");

    const [passwordValid, setPasswordValid] = useState()

    const [validity, setValidity] = useState()
    const [checked, setChecked] = useState()

    const [message, setMessage] = useState("")
    const [security, setSecurity] = useState()

    const [dataFetched, setDataFetched] = useState()
    const [mailValid, setMailValid] = useState(false)

    const [nameValidity, setNameValidity] = useState(false)
    const [firstNameValidity, setFirstNameValidity] = useState(false)

    const [compagnyValidity, setCompagnyValidity] = useState(false)

    const [role, setRole] = useState("recruteurs")
    const [isCandidat, setIsCandidat] = useState(false)

    const [candidatValidity, setCandidatValidity] = useState(false)
    const [otherValidity, setOtherValidity] = useState(false)

    const [response, setResponse] = useState()




    let resetSecurity = () => {
        // setName('')
        // setMail('')
        // setFirstName('')
        // setMessage("")
        // setPassword("")
        // setPassword2("")
        // setCompagny('')
        // setOtherValidity(false)
        // setCandidatValidity(false)
        // setResponse("")
    }


    useEffect(() => {
        if (auth.response) {
            setResponse(auth.response)
        }
    }, [auth.response])


    useEffect(() => {
        if (isCandidat && passwordValid && nameValidity && firstNameValidity && mailValid) {
            setCandidatValidity(true)
        } else {
            setCandidatValidity(false)
        }

        if (!isCandidat && passwordValid && nameValidity && firstNameValidity && mailValid && compagnyValidity) {
            setOtherValidity(true)
        } else {
            setOtherValidity(false)
        }

    }, [role, isCandidat, passwordValid, nameValidity, firstNameValidity, mailValid, compagnyValidity])

    /*
    * 
    * Refresh state when changing selection
    *
    */
    useEffect(() => {
        resetSecurity()
    }, [selected])

    /*
    * 
    * current role to change state
    *
    */
    useEffect(() => {
        if (role === "candidats") {
            setIsCandidat(true)
        } else {
            setIsCandidat(false)
        }
        resetSecurity()

    }, [role, isCandidat])


    /*
   * Check email validity
   *
   *
   */
    useEffect(() => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setMailValid(re.test(mail));
    }, [mail])

    /*
    * Check name validity
    *
    *
    */
    useEffect(() => {
        let regex = new RegExp("^[a-zA-Z\'-]+$")

        if (name && name.length >= 2 && name.match(regex)) {
            setNameValidity(true);

        } else {
            setNameValidity(false);
        }

    }, [name])

    useEffect(() => {
        let regex = new RegExp("^[a-zA-Z-]+$")

        if (firstName && firstName.length >= 2 && firstName.match(regex)) {
            setFirstNameValidity(true);

        } else {
            setFirstNameValidity(false);
        }

    }, [firstName])

    /*
   * Check compagny validity
   *
   *
   */
    useEffect(() => {
        if (!isCandidat && compagny && compagny.length > 2) {
            setCompagnyValidity(true);

        } else {
            setCompagnyValidity(false);
        }
    }, [compagny])

    useEffect(() => {
        if (password && password.length > 8 && password === password2) {
            setPasswordValid(true)
        } else {
            setPasswordValid(false)
        }
    }, [password, password2])


    /*
    * 
    * Check Password security
    *
    */
    useEffect(() => {
        const result = [];
        if (password) {
            _.map(condition, (c, i) => {
                let check = password.match(c)
                if (check !== null) {
                    result.push(i)
                }
            })
        }
        setValidity(result)

    }, [passwordValid, password])


    /*
    * 
    * Delete condition from array and from DOM
    *
    */
    useEffect(() => {
        const allTrought = [];
        _.map(condition, (c, i) => allTrought.push(i));
        setChecked(_.difference(allTrought, validity))

    }, [validity, password])

    /*
    * 
    * Update error message and security test
    *
    */
    useEffect(() => {
        if (validity && validity.length === 5) {
            setMessage("Sécurité")
        } else {
            setMessage("")
        }
    }, [validity])

    /*
    * 
    * Update error message and security test
    *
    */
    useEffect(() => {
        if (message && password) {
            const severalMaj = password.match(/[A-Z]/g) && password.match(/[A-Z]/g).length > 1;
            const specialCharArray = password.match(/[^a-zA-Z0-9]/g) && password.match(/[^a-zA-Z0-9]/g).length > 1;
            const severalNumber = password.match(/[0-9]/g) && password.match(/[0-9]/g).length > 1;
            const isLongEnought = password && password.length > 12;

            let securityTest = _.countBy([severalMaj, specialCharArray, severalNumber, isLongEnought])

            if (securityTest.true < 2) {
                setSecurity("low")
            } else if (securityTest.true >= 2 && securityTest.true < 4) {
                setSecurity("medium")
            } else if (securityTest.true == 4) {
                setSecurity("strong")
            }
        }

    }, [message, password])



    let handleSubmit = (e) => {
        if (!isCandidat && otherValidity) {
            e.preventDefault()
            console.log("compagny request");
            let data = {
                nom: name,
                prenom: firstName,
                email: mail,
                password: password,
                password2: password2,
                compagny: compagny,
                role: role
            }
            auth.signup(data)


        } else if (isCandidat && candidatValidity) {
            e.preventDefault()
            console.log("candidat request");
            let data = {
                nom: name,
                prenom: firstName,
                email: mail,
                password: password,
                password2: password2,
                role: role
            }
            auth.signup(data);
        }
    }


    useEffect(() => {
        if (!auth.authStore.logged) {
            console.warn("User is not logged in!");
        } else if (auth.authStore.logged) {
            auth.login({ mail: mail, password: password, role: role })
        }
    }, [auth.authStore.logged])


    useEffect(() => {

        if (!auth.authStore.jwt || auth.authStore.jwt.length < 1) {
            console.warn("Error 401 : no session token detected");
        } else if (auth.authStore.jwt && auth.authStore.jwt.length > 1) {
            router.push("/homepage")
        }
    }, [auth.authStore])


    return (
        <div className='flex flex-col items-center flex-1'>
            <div className='flex flex-col h-full justify-center w-full '>
                <div className='flex flex-col px-24'>
                    <label className='mt-4'>Vous êtes  </label>
                    <select className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg' defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="administrateurs">Administrateurs</option>
                        <option value="consultants">Consultants</option>
                        <option value="recruteurs">Recruteurs</option>
                        <option value="candidats">Candidats</option>
                    </select>

                    <label className='mt-2'>Nom</label>
                    <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg' type={"text"} value={name} onChange={(e) => setName(e.target.value)} />

                    <label className='mt-2'>Prénom</label>
                    <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg' type={"text"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    {!isCandidat &&
                        <>
                            <label className='mt-2'>Entreprise</label>
                            <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg' type={"text"} value={compagny} onChange={(e) => setCompagny(e.target.value)} />
                        </>
                    }

                    <label className='mt-2'>Mail</label>
                    <input className={`bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg ${mailValid ? "text-black" : "text-red-400"}`} type={"text"} value={mail} onChange={(e) => setMail(e.target.value)} />

                    <label className='mt-2'>Mot de passe</label>
                    <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg' type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label className='mt-2'>Confirmer votre mot de passe</label>
                    <input className='bg-app-blue bg-opacity-5 py-2 px-2 rounded-lg' type={"password"} value={password2} onChange={(e) => setPassword2(e.target.value)} />



                </div>
                <div className='px-32 md:px-48 w-full'>
                    {
                        isCandidat && candidatValidity || !isCandidat && otherValidity ?
                            <SubmitValid handleSubmit={handleSubmit} /> :
                            <SubmitUnvalid />
                    }
                </div>
            </div>
            <div className='w-full h-36 flex flex-col mt-4 pt-8 pb-4 px-10 bg-app-blue bg-opacity-5 '>

                {!message && !selected &&
                    <>
                        <p className='font-bold'>Mot de passe check </p>
                        <div className='grid grid-cols-3 gap-1 my-2 '>
                            {_.map(checked, (c, i) => {
                                return (
                                    <div key={i} className='flex flew-row w-full  items-center'>
                                        <div className='w-2 h-2 bg-red-400 rounded-full' />
                                        <p className='pl-2 capitalize'>{c}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </>}
                {message && !selected &&
                    <>
                        <p className='pb-2'>{message}</p>
                        <div className='w-full h-6 rounded-full flex flex-row capitalize'>
                            <div className='flex flex-col h-6 w-1/3 justify-center items-center'>
                                <div className={`w-full h-1/2  border-black border-solid ${security && security === "low" ? "bg-red-400" : "bg-white"} rounded-l-full`} />
                                {security && security === "low" ? <p className='h-1/2'>low</p> : <div className='h-1/2' />}

                            </div>
                            <div className='flex flex-col h-6 w-1/3 justify-center items-center'>
                                <div className={`w-full h-1/2  border-black border-solid ${security && security === "medium" ? "bg-orange-400" : "bg-white"}`} />
                                {security && security === "medium" ? <p className='h-1/2'>medium</p> : <div className='h-1/2' />}

                            </div>
                            <div className='flex flex-col h-6 w-1/3 justify-center items-center'>
                                <div className={`w-full h-1/2  border-black border-solid ${security && security === "strong" ? "bg-green-400" : "bg-white"} rounded-r-full`} />
                                {security && security === "strong" ? <p className='h-1/2'>strong</p> : <div className='h-1/2' />}
                            </div>
                        </div>
                        {response &&
                            <>
                                <span className='mt-6'>{response}</span>
                            </>}
                    </>
                }

            </div>
        </div>

    )
}

export default Signup