"use client";
import Image from 'next/image'
import axios from 'axios';
import react, { useState, useEffect } from 'react'
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';



DOMPurify.setConfig({ ADD_ATTR: ['target'] });


const Firsthalf = ({ title, description }) => {
    const url = 'https://thomas-res-wordpress-d1dd47.ingress-earth.ewp.live/wp-json/wp/v2/pages';





        return (
            <main className="flex fixScroll  h-screen flex-col justify-start pt-20 overflow-y-scroll overflow-x-hidden">
                <div className='w-full flex flex-col  '>
                    <h1 className='font-mono  font-effect-outline underline text-5xl font-semibold text-white w-4/5 mb-2 mb-4'>
                        {title}
                    </h1>
                    <div className=' font-semibold text-gray-300 pb-20'>
                        <div className='gray pb-4 pt-4 pl-4 pr-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}/>
                    </div>
                </div>




            </main>
        )
    }

    export default Firsthalf;