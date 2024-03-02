"use client"

import { useEffect, useState } from "react";
import ProModal from "@/components/ProModal";


const ModelProvider = () => {
   const [isMonted,setIsMounted]=useState(false)
   useEffect(()=>{
    setIsMounted(true)
   },[])
   if(!isMonted)return null
    return (
    <>
      <ProModal />
    </>
  )
};

export default ModelProvider
