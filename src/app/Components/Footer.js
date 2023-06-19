import  react  from 'react';
import wordpress from './Pictures/wordpress.png'
import ReactPic from './Pictures/ReactPic.png'
import Image from 'next//legacy/image'

export default function Footer() {
    return (
        <div className='h-full w-full pt-20 flex flex-col justify-end items-center '>
            <h1 className='font-serif text-3xl font-effect-fire-animation font-semibold text-white w-3/4 '>Made with React, Wordpress, and Next.js</h1>
            <div className='mt-5 w-1/2 flex justify-around'>
                <Image
                    src={wordpress}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
                <Image
                    src={ReactPic}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
            </div>

        </div>
    )
}
