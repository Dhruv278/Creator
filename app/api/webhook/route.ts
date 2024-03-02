import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async  function POST(req:Request){
    const body=await req.text();
    const signature=headers().get("Stripe-Signature") as string;
    let event :Stripe.Event;

    try{
        event=stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch(error:any){
        return new NextResponse(`Webhook error : ${error.message}`,{status:400});
    }

    const session=event.data.object as Stripe.Checkout.Session;
     console.log(event.type);
    if(event.type==="checkout.session.completed"){
        console.log("call 1")
        const subscription=await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        if(!session?.metadata?.userId){
            return new NextResponse("user id is requires",{status:400})
        }
      
        await prismadb.userSubscription.create({
            data:{
                userId:session?.metadata?.userId,
                stripeSubscriptionId:subscription.id,
                stripeCostumerId:subscription.customer as string,
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd:new Date(
                    subscription.current_period_end*1000
                )
            }
        })
    }

    if(event.type==="invoice.payment_succeeded"){
        console.log("call 2")
        const subscription=await stripe.subscriptions.retrieve(
            session.subscription as string

        )
        try{
            await prismadb.userSubscription.update({
                where:{
                    stripeSubscriptionId:subscription.id,
                },
                data:{
                    stripePriceId:subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd:new Date(
                        subscription.current_period_end*1000
                 )
                }
            })
        }catch(error:any){
            if(error.code!=="P2025")console.log("error in updation",error)
        }
    }
    return new NextResponse(null,{status:200});
}