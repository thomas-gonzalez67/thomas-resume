import react, { useState,useEffect } from 'react';
import Image from 'next/legacy/image'
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index";


const endpoint = 'https://irp.iml.mybluehost.me/graphql/'
const FILMS_QUERY = `{
  mediaItems{
    edges{
      node{
        sourceUrl
      }
    }
  }
}`;

export default function Footer() {
    const [picO, setPicO] = useState('asd');
    const [picT, setPicT] = useState('asd');
    const [picTh, setPicTh] = useState('asd');
    const [picF, setPicF] = useState('asd');
    const [index, setIndex] = useState(0)
    const delay = 3000;

    const { data, isLoading, error } = useQuery("pics", () => {
   
        return axios({
            url: endpoint,
            method: "POST",
            data: {
                query: FILMS_QUERY
            }
        }).then(response => { setPicO(response.data.data.mediaItems.edges[0].node.sourceUrl); setPicT(response.data.data.mediaItems.edges[1].node.sourceUrl); setPicTh(response.data.data.mediaItems.edges[3].node.sourceUrl); setPicF(response.data.data.mediaItems.edges[2].node.sourceUrl); });
        console.log(posts)

    });

    useEffect(() => {
        setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === 3 ? 0 : prevIndex + 1),
            delay
        );
        return () => { };
    }, [index]);

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;
    return (
    <div className="slideshow">
            <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {
                    picF != 'asd' && <Image
                        src={picF}
                        width={450}
                        height={500}
                        alt="Picture of the author"
                    />
                }
                {
                    picT != 'asd' && <Image
                        src={picT}
                        width={450}
                        height={500}
                        alt="Picture of the author"
                    />
                }
                {
                    picTh != 'asd' && <Image
                        src={picTh}
                        width={450}
                        height={500}
                        alt="Picture of the author"
                    />
                }
                {
                    picO != 'asd' && <Image
                        src={picO}
                        width={450}
                        height={500}
                        alt="Picture of the author"
                    />
                }
            </div>
    </div>

    )
}
