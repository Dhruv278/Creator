

import { setMusicData } from "@/lib/utils";
import { NextResponse } from "next/server"

export async function POST(req:Request,context:any){
    const {params}=context;
    const id=params.id;
    console.log("data fetched")

    const final=await req.json();
    
    await setMusicData(id,final.output.audio)
    return new NextResponse(id,{status:200})
    
}
