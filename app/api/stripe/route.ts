import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


const settingsUrl=absoluteUrl("/settings");

export async function GET(){
    // try{
    //     const {userId}=auth();
    //     const user=await currentUser();

    //     if(!userId || !user)return new NextResponse("Unauthorized",{status:401})

    //     const userSubscription=await prismadb.userSubscription.findUnique({
    //         where:{
    //             userId
    //         }
    //     })
    //     if(userSubscription && userSubscription.stripeCostumerId){
    //         const stripeSession=await stripe.billingPortal.sessions.create({
    //             customer:userSubscription.stripeCostumerId,
    //             return_url:settingsUrl,

    //         });
    //         return new NextResponse(JSON.stringify({url:stripeSession.url}));
    //     }
    //     const stripeSession=await stripe.checkout.sessions.create({
    //         success_url:settingsUrl,
    //         cancel_url:settingsUrl,
    //         payment_method_types:["card"],
    //         mode:"subscription",
    //         billing_address_collection:"required",
    //         customer_email:user.emailAddresses[0].emailAddress,
    //         line_items:[
    //             {
    //                 price_data:{
    //                     currency:"INR",
    //                     product_data:{
    //                         name:"Creator Pro",
    //                         description:"Unlimited AI Generation",
    //                     },
    //                     unit_amount:800000,
    //                     recurring:{
    //                         interval:"month"
    //                     }
    //                 },
    //                 quantity:1
    //             }
    //         ],
    //         metadata:{
    //             userId,
    //         }
    //     })
        // return new NextResponse(JSON.stringify({url:stripeSession.url}))
        return new NextResponse("/")

    // }catch (error){
    //     console.log("[STRIPE-ERROR]",error);
    //     return new NextResponse("Internal error",{status:500});


    // }
}