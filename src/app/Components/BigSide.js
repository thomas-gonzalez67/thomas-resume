"use client";
import axios from 'axios';
import react, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { selectState ,mobState} from './atoms';
import { useRecoilState } from 'recoil';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

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

const BigSide = () => {
    const [select, setSelect] = useRecoilState(selectState);
    const [menu, setMenu] = useState([])
    const url = 'http://localhost/resume/wp-json/wp/v2/pages';
    const [pic, setPic] = useState('pic')
    const [mobSide, setMobSide] = useRecoilState(mobState);

    const { data, isLoading, error } = useQuery("stuff", () => {
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPic(response.data.data.posts.edges[6].node.content); });
        console.log(posts)

    });
    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setMenu(response.data)
            });
    }, [])

    return (

        <div className='bg-black w-screen h-screen flex flex-col overflow-hidden'>
        <Link href="/">
            <div  onClick={()=>setMobSide(false)} className={` w-screen mb-20  items-center flex flex-col justify-around ${select == ("") ? "bg-gray-700" : 'pfpPic'}`}>
                <div className='h-40 w-40' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pic) }} />
            </div>
        </Link>
        <nav>
            <div className='flex flex-col  items-center text-gray-300 border-b-2  border-gray-400'>
                {menu.map((page) =>
                    <Link href={`/${page.title.rendered}`} key={page.id} onClick={()=>setMobSide(false)}className={`w-full h-14  border-t-2 hov text-center border-gray-400 border-solid  ${select == (page.title.rendered) && "bg-gray-700"}`}>
                        <h1 className='mt-4 '>{page.title.rendered}</h1>
                    </Link>)}
            </div>
        </nav>
    </div>)
}

export default BigSide;