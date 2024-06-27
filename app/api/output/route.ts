import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/options";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest){
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const dbUser= await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(!dbUser){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    
    }

    const outputs= await prisma.aIOutput.findMany({
        where: {
            authorId: dbUser.id
        }
    })
    // console.log(outputs)

    return NextResponse.json(outputs)
}

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const {formData, templateSlug, aiResponse}= await req.json()

    const dbUser= await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(!dbUser){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    
    }

    try {
        const output= await prisma.aIOutput.create({
            data:{
                formData: formData,
                templateSlug: templateSlug,
                aiResponse: aiResponse,
                author: {connect: {id: dbUser.id}}
            }
        })
    
        return NextResponse.json(output)
    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}