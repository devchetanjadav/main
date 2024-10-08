import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Action to read
export const GET = async () => {
  	const posts = await prisma.posts.findMany({});

  	return NextResponse.json({
    	posts,
  	});
};


// Action to create
export const POST = async (req: NextRequest) => {
	
  	const { title, content, tags } = await req.json();

	const post = await prisma.posts.create({
		data: {
			title,
			content,
			tags,
		},
	});

	return NextResponse.json({
		post,
	});
};

// Action to delete
export const DELETE = async (req: NextRequest) => {
	const url = new URL(req.url).searchParams;
	const id = Number(url.get("id")) || 0;

	const post = await prisma.posts.delete({
		where: {
		  id: id,
		},
	});

  	if (!post) {
	    return NextResponse.json(
			{
				message: "Error",
			},
		    {
		    	status: 500,
		    }
	    );
  	}

  	return NextResponse.json({});
};

// Action to update or edit
export const PUT = async (req: NextRequest) => {
  	const { title, content, tags, id } = await req.json();

	const post = await prisma.posts.update({
		where: {
		  	id: Number(id),
		},

		data: {
			title,
			content,
			tags
		},
	});

	return NextResponse.json({
		post,
	});
};