"use client";
import Footer from "../Components/Footer"
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import react, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Firsthalf from '../Components/Firsthalf'
import SkillShow from '../Components/SkillShow'
import { useRecoilState, useRecoilValue } from 'recoil';
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

export default function About() {

    const [title, setTitle] = useState('Loading...')
    const [description, setDescription] = useState('Loading...')
    const [posts, setPosts] = useState([]);
    const [lol, setLol] = useState([])
    const [pic, setPic] = useState('pic')
    const url = '/resume/wp-json/wp/v2/pages';
    const mobSide = useRecoilValue(mobState);
    const [select, setSelect] = useRecoilState(selectState);

    useEffect(() => {
        setSelect('Skills');
    }, [setSelect]);

    const { data, isLoading, error } = useQuery("stuff", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPosts(response.data.data.posts); setPic(response.data.data.posts.edges[6].node.content); setTitle(response.data.data.posts.edges[2].node.title); setDescription(response.data.data.posts.edges[2].node.content); });
        console.log(posts)

    });

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;





    return (
        <>
            {!mobSide &&
        <div className="flex min-h-screen screen flex-row items-center ">
            <Sidebar pic={pic} />




            <div className='FirstHalf h-screen w-2/5  pl-10'>
                <Firsthalf title={title} description={description} />
            </div>
            <div className='h-screen w-1/2 SecondHalf flex flex-col  pb-20 overflow-y-scroll overflow-x-hidden'>
                <div className='flex flex-col justify-start h-screen  items-center pt-28 pb-2 '>
                    <SkillShow />

                </div>

                <Footer />
            </div>
                </div>}
            {mobSide && <Sidebar />}
        </>
    )
}
