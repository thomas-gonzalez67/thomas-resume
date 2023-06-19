"use client";
import Footer from "../Components/Footer"
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import react, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Firsthalf from '../Components/Firsthalf'
import SlideShow from '../Components/SlideShow.js'
import { useRecoilValue, useRecoilState } from 'recoil';
import { mobState, selectState } from '../Components/atoms'; 


const endpoint = 'http://localhost/resume/graphql/'


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

export default function Portfolio() {

    const [title, setTitle] = useState('Loading...')
    const [description, setDescription] = useState('Loading...')
    const [posts, setPosts] = useState([]);
    const [lol, setLol] = useState([])
    const [pic, setPic] = useState('pic')
    const url = '/resume/wp-json/wp/v2/pages';
    const mobSide = useRecoilValue(mobState);
    const [select, setSelect] = useRecoilState(selectState);


    useEffect(() => {
        setSelect('Portfolio');
    }, []);

    const { data, isLoading, error } = useQuery("stuff", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPosts(response.data.data.posts); setPic(response.data.data.posts.edges[6].node.content); setTitle(response.data.data.posts.edges[1].node.title); setDescription(response.data.data.posts.edges[1].node.content); });
        console.log(posts)

    });

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;



    /*useEffect(() => {
        axios.get(url)
            .then((response) => {
                setLol(response.data)
            });
    }, [])*/

    return (
        <>
            {!mobSide && <div className="flex min-h-screen flex-row screen items-center ">
            <Sidebar pic={pic} />   




            <div className='FirstHalf h-screen w-2/5  pl-10'>
                <Firsthalf title={title} description={description} />
            </div>
            <div className='h-screen w-1/2 SecondHalf flex flex-col items-center pb-20 overflow-y-scroll overflow-x-hidden'>
                <div className='flex flex-col items-center justify-end h-screen pt-20 '>
                    <h1 className='font-mono font-effect-outline underline text-5xl font-semibold text-white  mb-2 mb-4'>
                        My portfolio
                    </h1>
                    <div className=' font-semibold flex flex-col items-center text-gray-300 pb-20'>
                        <div className='gray pb-4 pt-4 pl-4 pr-4'> Here is a list of some of the web aps I've made. Each one of these projects were made entirely by me and completely from scratch. With every new project I try to learn something new. Especially learning frameworks/tools that are in high demand in the world of professional development.  
                        </div>
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
