"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Skills from './Skills.js'


const queryClient = new QueryClient()


export default function page() {

    return (
        <QueryClientProvider client={queryClient}>
            <Skills />
        </QueryClientProvider>
    )
}
