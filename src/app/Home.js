"use client";

import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import react, { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import Footer from "./Components/Footer"
import Firsthalf from './Components/Firsthalf'
import jomas2 from './Components/Pictures/jomas2.png'
import Image from 'next/legacy/image'
import res from './Components/Pictures/res.png';
import { useRecoilState} from 'recoil';
import { mobState, selectState } from './Components/atoms'; 
import resume from './Components/Pictures/resume.pdf';

const endpoint = 'https://irp.iml.mybluehost.me/graphql/'


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

export default function Home() {

    const [title, setTitle] = useState('loading...')
    const [description, setDescription] = useState('loading...')
    const [posts, setPosts] = useState([]);
    const [lol, setLol] = useState([])
    const [pic, setPic] = useState('pic')
    const url = '/resume/wp-json/wp/v2/pages';
    const [mobSide, setMobSide] = useRecoilState(mobState);
    const [select, setSelect] = useRecoilState(selectState);

        useEffect(() => {
        setSelect('');
    }, [setSelect]);

    const { data, isLoading, error } = useQuery("stuff", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPosts(response.data.data.posts); setPic(response.data.data.posts.edges[4].node.content); setTitle(response.data.data.posts.edges[3].node.title); setDescription(response.data.data.posts.edges[3].node.content);  });
        console.log(posts)

    });

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;





    return (
        <>{!mobSide && 
            <div className=" min-h-screen  screen items-center overflow-hidden">
                <Sidebar pic={pic} />




                <div className='FirstHalf h-screen w-2/5  pl-10 '>
                    <Firsthalf title={title} description={description} />

                </div>
                <div className='h-screen w-1/2 SecondHalf flex flex-col items-center pb-20 overflow-y-scroll overflow-x-hidden'>
                    <div className='flex flex-col justify-end h-screen pt-20 rounded-lg'>
                        <Image
                            src={jomas2}
                            width={420}
                            height={500}
                            alt="Picture of the author"
                        />

                    </div>

                    <Footer />
                </div>

            </div>}
            {mobSide && <Sidebar/> }
        </>

    )
}
