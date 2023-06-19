"use client";
import react, { useState, useEffect } from 'react'


export default function SkillShow() {
 
    return (
        <div className='w-5/6 ml-6'>
            <div className='title font-semibold underline text-gray-300 gray'>
                Proficiency
            </div>
            <div className='subTitle font-semibold text-gray-300 gray'>
                Front End
            </div>
            <div className='progressBar' >
                    <div className='fill    ' />


            </div> 
            <div className='subTitle font-semibold text-gray-300 gray'>
                Back End
            </div>

            <div className='progressBar'>
                <div className='fillT    ' />

            </div>
            <div className='subTitle font-semibold text-gray-300 gray'>
                Other
            </div>

            <div className='progressBar'>
                <div className='fillThree    ' />

            </div>
        </div>


    )
}