
import { increaseApiLimit } from "@/lib/api-limit";
import {  getMusicData, setMusicData } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(req:Request,context:any){
    const {params}=context;
    const id=params.id;
    console.log("data fetched")

    // const final=await req.json();
    
    // await setMusicData(id,final.output.audio)
    return new NextResponse(id,{status:200})
    
}
export async function GET(req:Request,context:any){
    const {userId}=auth();
    if(!userId)return new NextResponse("Unauthorized",{status:401});

    let musicData=await getMusicData(userId);
    // console.log(musicData);
    if(musicData===undefined)return new NextResponse(undefined,{status:204})
    
    await increaseApiLimit();

    return new NextResponse(JSON.stringify({url:musicData}),{status:200});
}