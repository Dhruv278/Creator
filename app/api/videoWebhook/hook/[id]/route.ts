

import { setVideoData } from "@/lib/utils";
import { NextResponse } from "next/server"

export async function POST(req:Request,context:any){
    const {params}=context;
    const id=params.id;

    const final=await req.json();
    console.log(final);
    await setVideoData(id,final.output[0]);
   
  
    return new NextResponse(null,{status:200})
    
}
