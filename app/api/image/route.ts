import { checkApiLimits, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);




export async function POST(req: Request) {
    try {
        const {userId}=auth();
        const body=await req.json();
        const {prompt,amount=1,resolution="256x256"}=body;

        if(!userId)return new NextResponse("Unauthorized",{status:401});

        if(!configuration)return new NextResponse("Open AI API key not configured",{status:500});


        if(!prompt){
            return new NextResponse("Prompt are require",{status:400})
        }
        if(!amount){
            return new NextResponse("Amount are require",{status:400})
        }
        if(!resolution){
            return new NextResponse("Resolution are require",{status:400})
        }
        const freeTrial=await checkApiLimits();
        if(!freeTrial){
            return new NextResponse("Free trial has expired", {status:403})
        }
        const response=await openai.createImage({
            prompt,
            n:parseInt(amount,10),
            size:resolution,
        })
        await increaseApiLimit();
        console.log(response)
        return NextResponse.json(response.data.data);
    }catch(error){
        console.log("[Image ERROR]",error);
        return new NextResponse("Internal error ", {status:500});
    }
}