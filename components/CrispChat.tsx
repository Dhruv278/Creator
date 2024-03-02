"use client"

import { Crisp } from "crisp-sdk-web"
import { useEffect } from "react";


const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("eb868579-c0bf-4316-a86f-e3fa3f41a1ae")
    },[])
  return null
};

export default CrispChat
