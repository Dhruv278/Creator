import { checkApiLimits, increaseApiLimit } from '@/lib/api-limit';
import { createMusicData } from '@/lib/utils';

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate=new Replicate({
    auth:process.env.REPLICATE_API_TOKEN
})





export async function POST(req: Request) {
    try {
        const {userId}=auth();
        const body=await req.json();
        const {prompt}=body;

        console.log(body)
        if(!userId)return new NextResponse("Unauthorized",{status:401});



        if(!prompt){
            return new NextResponse("Messages are require",{status:400})
        }
        const freeTrial=await checkApiLimits();
        if(!freeTrial){
            return new NextResponse("Free trial has expired", {status:403})
        }
        const response =  replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
              
                prompt_a: prompt,
               
              },
              webhook:`https://webhooks.amplify.eu-north-1.amazonaws.com/prod/webhooks?id=849687bc-27af-4881-81a7-2dcf8cf3e87e&token=gAwmohtlIpTs1Wgony03aaoLjLMZ5VdbjwE1VB79u1w&operation=startbuild/api/musicWebhook/${userId}`
              
            }
          );
        //   console.log(response);
       await createMusicData(userId);
        return NextResponse.json(null,{status:200});
    }catch(error){
        console.log("[CONVERSATION ERROR]",error);
        return new NextResponse("Internal error ", {status:500});
    }
}