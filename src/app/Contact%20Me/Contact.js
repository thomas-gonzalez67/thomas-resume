"use client";
import Footer from "../Components/Footer"
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import react, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Firsthalf from '../Components/Firsthalf'
import ContactMe from './ContactMe.js'
import DOMPurify from 'dompurify';
import git from '../Components/Pictures/git.png'
import linked from '../Components/Pictures/linked.jpg'
import Image from 'next/legacy/image'
import { useRecoilValue,useRecoilState } from 'recoil';
import { mobState,selectState } from '../Components/atoms'; 


const endpoint = 'https://thomas-res-wordpress-d1dd47.ingress-earth.ewp.live/graphql/'



const FILMS_QUERY = `{
            posts{
                edges{
                node{
                    title
                    content
                    }
                }   
            }
    }`;

export default function Contact() {
    const [title, setTitle] = useState('Loading...')
    const [description, setDescription] = useState('Loading...')
    const [posts, setPosts] = useState([]);
    const [lol, setLol] = useState([])
    const [pic, setPic] = useState('pic')
    const mobSide = useRecoilValue(mobState);
    const [select, setSelect] = useRecoilState(selectState);


    useEffect(() => {
        setSelect('Contact Me');
    }, [setSelect]);


    const { data, isLoading, error } = useQuery("stuff", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPosts(response.data.data.posts); setPic(response.data.data.posts.edges[6].node.content); setTitle(response.data.data.posts.edges[0].node.title); setDescription(response.data.data.posts.edges[0].node.content); });
        console.log(posts)

    });

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;




    return (
        <>
            {!mobSide &&
        <div className="flex min-h-screen screen flex-row items-center ">
            <Sidebar pic={pic} />




            <div className='FirstHalf h-screen flex flex-col w-2/5  p-10'>
                <h1 className='font-mono font-effect-outline underline text-5xl font-semibold text-white w-4/5 mb-2 mb-4 pt-20'>Contact Me</h1>

                <ContactMe />
                         <div className='flex flex-row justify-around  mt-10'>
                            <a href='https://github.com/thomas-gonzalez67' target='_blank'>
                                <Image
                                    src={git}
                                    width={100}
                                    height={100}
                                    alt="Picture of the author"
                                />
                            </a>

                            <a href='https://www.linkedin.com/in/tomas-gonzalez-745b23247/' target='_blank'>
                                <Image
                                    src={linked}
                                    width={100}
                                    height={100}
                                    alt="Picture of the author"
                                />
                            </a>

                        </div>
            </div>
            <div className='h-screen w-1/2 SecondHalf flex flex-col items-center pb-20 overflow-y-scroll overflow-x-hidden'>
                <div className='flex flex-col items-center justify-end h-screen pt-20 '>
                    <h1 className='font-mono font-effect-outline underline text-5xl font-semibold text-white  '>
                        {title}
                    </h1>
                    <div className=' w-full font-semibold flex flex-col items-center text-gray-300 pb-20'>
                       <div className='gray pb-4 pt-4 pl-4 pr-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}/>
                    </div>

                </div>

                <Footer />
            </div>
                </div>
            }
            {mobSide && <Sidebar />}
        </>
    )
}