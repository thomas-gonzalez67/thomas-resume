"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import About from './About.js'


const queryClient = new QueryClient()


export default function page() {

    return (
        <QueryClientProvider client={queryClient}>
            <About />
        </QueryClientProvider>
    )
}
