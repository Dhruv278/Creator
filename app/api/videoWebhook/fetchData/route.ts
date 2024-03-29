import { increaseApiLimit } from "@/lib/api-limit";
import {  setVideoData, getVideoData } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req:Request,context:any){
    const {userId}=auth();
    if(!userId)return new NextResponse("Unauthorized",{status:401});

    let videoData=await getVideoData(userId!);
   
    if(videoData===undefined)return new NextResponse(null,{status:204})
   
    await increaseApiLimit();

    return new NextResponse(JSON.stringify({url:videoData}),{status:200});
}