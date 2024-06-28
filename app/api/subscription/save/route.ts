import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions)
    const { email, userName, active, paymentId }= await req.json()

    if(!session?.user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    if(session.user.email !== email){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    //todo: add input validation using zod

    const sub= await prisma.userSubscription.create({
        data:{
            email,
            userName,
            active,
            paymentId
        }
    })

    return NextResponse.json(sub)
}