"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Home from './Home.js'


const queryClient = new QueryClient()


export default function page() {

    return (
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    )
}
