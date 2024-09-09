"use client"
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

export default function CreatePost(){
	const [title, setTitle]  = useState('');
	const [content, setContent] = useState('')
	const [tags, setTags] = useState('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	const handleSubmit = async(e: any) => {
		e.preventDefault()
        setIsLoading(true)

        await fetch('/api/post',{
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body:JSON.stringify({
        		title, content, tags
        	})
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })

        setIsLoading(false)
        router.push('/')
	}

	return (
		<form className='w-[500px] mx-auto pt-20 flex flex-col gap-3' onSubmit={handleSubmit}>
			<div className='mx-auto pb-5 font-bold'>Create Post</div>
            <input type="text" placeholder='Input your title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full border p-2 rounded-md' />
            <textarea rows={10} placeholder='Input your content' value={content} onChange={(e) => setContent(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="text" placeholder='Input your tags' value={tags} onChange={(e) => setTags(e.target.value)} className='w-full border p-2 rounded-md' />
            <button className='button' disabled={isLoading}>{isLoading ? 'Loading ...' : 'Submit'}</button>
        </form>
	)
}