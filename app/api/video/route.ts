import { checkApiLimits, increaseApiLimit } from '@/lib/api-limit';
import { createMusicData, createVideoData } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate=new Replicate({
    auth:process.env.REPLICATE_VIDEO_API_TOKEN
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
        const output =  replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
           
              prompt: prompt,
             
            },
            webhook:`https://main.d3e2c0kuarh3hk.amplifyapp.com/api/videoWebhook/hook/${userId}`
          }
        );

  

        await createVideoData(userId);
        return NextResponse.json(null,{status:200});
    }catch(error){
        console.log("[VIDEO ERROR]",error);
        return new NextResponse("Internal error ", {status:500});
    }
}