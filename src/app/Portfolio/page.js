"use client";
import React, { useState } from 'react';
import Portfolio from './Portfolio.js'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function page() {
    return (
        <QueryClientProvider client={queryClient}>
            <Portfolio />
        </QueryClientProvider>
    )
}