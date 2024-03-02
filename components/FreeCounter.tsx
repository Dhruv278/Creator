"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/user-pro-model";

interface counterProps{
    apiLimitCount:number,
    isPro:boolean
}
const FreeCounter = ({apiLimitCount=0,isPro=false}:counterProps) => {
  const proModal=useProModal();
  const [mounted,setMounted]=useState(false);
    useEffect(()=>{
        setMounted(true);
    },[])
    if(!mounted){
        return null;
    }
    if(isPro)return null
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0" >
        <CardContent className="py-6">
            <div className="text-center text-sm text-white mb-4 space-y-2 ">
                <p>
                    {apiLimitCount} / {MAX_FREE_COUNTS} Free Genrerations
                </p>
                <Progress className="h-3"
                value={(apiLimitCount/MAX_FREE_COUNTS )*100} />
                <Button onClick={proModal.onOpen} className=" w-full " variant="premium">
                    Upgrad
                    <Zap  className="w-4 h-4 ml-2 fill-white"/>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default FreeCounter
