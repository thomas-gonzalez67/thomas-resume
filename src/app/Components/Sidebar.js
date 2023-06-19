"use client";
import axios from 'axios';
import react, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link';
import git from './Pictures/git.png'
import linked from './Pictures/linked.jpg'
import Image from 'next/legacy/image'
import { useRecoilState } from 'recoil';
import { selectState, mobState, sideState } from './atoms';
import DOMPurify from 'dompurify';
import BigSide from './BigSide'

const Sidebar = ({ pic }) => {
    const [menu, setMenu] = useState([])
    const url = 'http://localhost/resume/wp-json/wp/v2/pages';
    const [select, setSelect] = useRecoilState(selectState);
    const [showSide, setShowSide] = useState(sideState);
    const [mobSide, setMobSide] = useRecoilState(mobState);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setMenu(response.data)
            });
    }, [])




    function useMediaQuery(query) {
        const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
        const [match, setMatch] = useState(mediaQuery.matches);
        useEffect(() => {
            const onChange = () => setMatch(mediaQuery.matches);
            mediaQuery.addEventListener("change", onChange);

            return () => mediaQuery.removeEventListener("change", onChange);
        }, [mediaQuery]);
        return match;
    }

    function useMediaQueries() {
        const md = useMediaQuery("(min-width: 800px)");

        return md;
    }

    function ResponsiveComponent() {
        const md = useMediaQueries();

        if (!md) {
            setShowSide(false);
            return <div onClick={() => setMobSide(!mobSide)} className='menuBar flex flex-col justify-between' ><div className={`bar ${!mobSide ? "bg-black" : ' bg-white'}`} /> <div className={`bar ${!mobSide ? "bg-black" : ' bg-white'}`} /> <div className={`bar ${!mobSide ? "bg-black" : ' bg-white'}`} /></div>
            
        }

        if (md) {
            setShowSide(true);
            setMobSide(false);
        }

    }

    return (
        <>
            <ResponsiveComponent/>
            {showSide && <div className="flex h-screen w-44 h-48 SideBar flex-col items-center justify-between ">
                <div >
                    <Link href="/">
                        <div onClick={() => setSelect('')} className={`  h-72   mb-20 text-center flex flex-col justify-around ${select == ("") ? "bg-gray-700" : 'pfpPic'}`}>
                            <div className=' pl-2 pr-2 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pic) }} />
                            <div className='text-gray-400'>Thomas Gonzalez</div>
                            <div className='text-gray-400'>Web Developer</div>
                        </div>
                    </Link>


                    <nav>
                        <div className='flex flex-col items-center text-gray-300 border-b-2  border-gray-400'>
                            {menu.map((page) =>
                                <Link href={`/${page.title.rendered}`}  key={page.id} className={`w-full h-14  border-t-2 hov text-center border-gray-400 border-solid  ${select == (page.title.rendered) && "bg-gray-700"}`}>
                                    <h1 className='mt-4 '>{page.title.rendered}</h1>
                                </Link>)}
                        </div>
                    </nav>

                </div>


                <div className='flex flex-row justify-around w-1/2 mb-10'>
                    <a href='https://github.com/thomas-gonzalez67' target='_blank'>
                        <Image
                            src={git}
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
                    </a>

                    <a href='https://www.linkedin.com/in/tomas-gonzalez-745b23247/' target='_blank'>
                        <Image
                            src={linked}
                            width={30}
                            height={30}
                            alt="Picture of the author"
                        />
                    </a>

                </div>

            </div >}
            {mobSide && <BigSide  />

                }
        </>

    )
}

export default Sidebar;