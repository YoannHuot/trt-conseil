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
    <div className="flex flex-col min-h-screen h-full ">
      <Header />
      <div className=" flex-1 flex justify-center items-center"
        style={{ backgroundImage: `url(${'./assets/background.jpg'})`, backgroundSize: 'cover' }}
      >
        <div className="bg-app-gray h-full w-2/3 rounded-2xl overflow-hidden drop-shadow-xl flex flex-col justify-between" style={{ height: "850px" }}>
          <div className="w-full flex-row flex justify-between h-16">
            <button className={`inscription h-full flex justify-center items-center w-1/2 ${selected ? "bg-app-blue text-white" : "bg-white"}`} onClick={() => {
              setSelected(true)
            }}>
              <p>Connexion</p>
            </button>
            <button className={`inscription h-full flex justify-center items-center w-1/2 ${selected ? "bg-white" : "bg-app-blue text-white"}`} onClick={() => {
              setSelected(false)
            }}>
              <p>Inscription</p>
            </button>
          </div>
          {selected ?
            <Login />
            :
            <Signup selected={selected} />
          }
        </div>
      </div>
    </div>

  )
}