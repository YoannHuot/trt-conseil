import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import React, { useState, useEffect } from 'react'
import _ from 'underscore';
import Signup from '../components/cards/signup';
import Login from '../components/cards/login';

export default function Home() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex flex-col min-h-screen h-full bg-green-400">
      <Header />
      <div className="bg-red-400 flex-1 flex justify-center items-center">
        <div className="bg-blue-500 w-2/3 h-auto" style={{ height: "650px" }}>
          <div className="w-full flex-row flex justify-between h-12">
            <button className={` "inscription flex justify-center items-center w-1/2" ${selected ? "bg-green-300" : "bg-white"}`} onClick={() => {
              setSelected(!selected)
            }}>
              <p>Connexion</p>
            </button>
            <button className={` "inscription flex justify-center items-center w-1/2" ${selected ? "bg-white" : "bg-green-400"}`} onClick={() => {
              setSelected(!selected)
            }}>
              <p>Inscription</p>
            </button>
          </div>
          <div className='h-full flex items-center justify-center bg-blue-500  w-full flex-col '>
            {selected ?
              <Login />
              :
              <Signup selected={selected} />
            }

          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}