
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay'
import authOptions from '../auth/[...nextauth]/options';
import prisma from '@/prisma/client';

export async function GET(req: NextRequest){
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const sub= await prisma.userSubscription.findUnique({
        where:{
            email: session.user.email!
        }
    })

    if(sub){
        return NextResponse.json(true)
    }
    return NextResponse.json(false)
}

export async function POST(req: NextRequest){
    let instance=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID!,
        key_secret:process.env.RAZORPAY_SECRET_KEY!
    })

    const result=await instance.subscriptions.create({
        plan_id:process.env.SUBSCRIPTION_PLAN_ID!,
        customer_notify:1,
        quantity:1,
        total_count:1,
        addons:[],
        notes:{
            key1:'Note'
        }
    });

    return NextResponse.json(result);
}