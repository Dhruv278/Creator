import { checkApiLimits, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

const instructionMessage:ChatCompletionRequestMessage={
    role:"system",
    content:"You are a code generator, you must answer only in markdown code snippets. Use code comments for explanantion"
}


export async function POST(req: Request) {
    try {
        const {userId}=auth();
        const body=await req.json();
        const {messages}=body;

        if(!userId)return new NextResponse("Unauthorized",{status:401});

        if(!configuration)return new NextResponse("Open AI API key not configured",{status:500});


        if(!messages){
            return new NextResponse("Messages are require",{status:400})
        }
        const freeTrial=await checkApiLimits();
        if(!freeTrial){
            return new NextResponse("Free trial has expired", {status:403})
        }
        const response=await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages:[instructionMessage,...messages]
        })
        await increaseApiLimit();
        return NextResponse.json(response.data.choices[0].message);
    }catch(error){
        console.log("[CONVERSATION ERROR]",error);
        return new NextResponse("Internal error ", {status:500});
    }
}