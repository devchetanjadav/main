"use client"
import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'

export default function UpdatePost({params}:{ params: {id : string} }){
	const id = params.id;
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [tags, setTags] = useState('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async(e : any) => {
    	e.preventDefault()
        setIsLoading(true)

        await fetch('/api/post', {
            method: 'PUT', // Method put is to update
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, content, tags, id
            })
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        setIsLoading(false)
		router.push('/')
    }

    useEffect(() => {
    	getData()
    },[])

    const getData = async () => {
    	const res = await fetch('/api/post/' + id)
        const json = await res.json()

        if (!json) {
            router.push('/404')
            return
        }

        setTitle(json.post.title)
        setContent(json.post.content)
        setTags(json.post.tags)
    }

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-3' onSubmit={handleSubmit}>
        	<div className='mx-auto pb-5 font-bold'>Update Post</div>
            <input type="text" placeholder='Input your title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full border p-2 rounded-md' />
            <textarea rows={10} placeholder='Input your content' value={content} onChange={(e) => setContent(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="text" placeholder='Input your tags' value={tags} onChange={(e) => setTags(e.target.value)} className='w-full border p-2 rounded-md' />
            <button className='button' disabled={isLoading}>{isLoading ? 'Loading ...' : 'Update'}</button>
        </form>
    )
}