"use client";
import Footer from "../Components/Footer"
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import react, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Firsthalf from '../Components/Firsthalf'
import SlideShow from '../Components/SlideShow.js'
import { useRecoilState } from 'recoil';
import { mobState,selectState } from '../Components/atoms'; 



const endpoint = 'http://thomasreswordpress.com/graphql/'



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

export default function About() {

    const [title, setTitle] = useState('Loading...')
    const [description, setDescription] = useState('Loading...')
    const [posts, setPosts] = useState([]);
    const [lol, setLol] = useState([])
    const [pic, setPic] = useState('pic')
    const url = '/resume/wp-json/wp/v2/pages';
    const [mobSide, setMobSide] = useRecoilState(mobState);
    const [select, setSelect] = useRecoilState(selectState);


    useEffect(() => {
        setSelect('About Me');
    }, [setSelect]);

    const { data, isLoading, error } = useQuery("stuff", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPosts(response.data.data.posts); setPic(response.data.data.posts.edges[6].node.content); setTitle(response.data.data.posts.edges[4].node.title); setDescription(response.data.data.posts.edges[4].node.content); });
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
            {!mobSide &&
                <div className="flex min-h-screen screen flex-row items-center ">
                    <Sidebar pic={pic} />




                    <div className='FirstHalf h-screen w-2/5  pl-10'>
                        <Firsthalf title={title} description={description} />
                    </div>
                    <div className='h-screen w-1/2 SecondHalf flex flex-col items-center pb-20 overflow-y-scroll overflow-x-hidden'>
                        <div className='flex flex-col justify-end h-screen pt-20 '>
                            <SlideShow />

                        </div>

                        <Footer />
                    </div>
                </div>}
            {mobSide && <Sidebar />}
        </>

    )
}
