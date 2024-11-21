'use client'

import axios from "axios";
import { useEffect } from "react";

export type SearchProp = {
    query: string;
    pageNumber: number;
}

export default function useSearch(query: string, pageNumber: number) {
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://dummyjson.com/products'
        }).then(res =>
            console.log(res)
        )
            .catch(e => console.log(e))
    }, []);
    return
}