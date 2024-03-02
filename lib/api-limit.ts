import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"
import { MAX_FREE_COUNTS } from "@/constants"


export const increaseApiLimit=async()=>{
    const { userId }=auth();

    if(!userId){
        return;
    }
    const userApiLimit =await prismadb.testUserApiLimit.findUnique({
        where:{
            userId
        }
    })
    if(userApiLimit){
        await prismadb.testUserApiLimit.update({
            where :{userId:userId},
            data:{count:userApiLimit.count +1}
        })
    }else{
        await prismadb.testUserApiLimit.create({
            data:{
                userId:userId,
                count:0
            }
        })
    }
}

export const checkApiLimits=async()=>{
    const { userId} =auth();
    if(!userId )return false;

    const userApiLimit=await prismadb.testUserApiLimit.findUnique({
        where:{
            userId
        }
    })
    if(!userApiLimit || userApiLimit.count<MAX_FREE_COUNTS)return true
    else return false
}
export const getApiLimit=async()=>{
    const {userId}=auth()
    if(!userId) return 0;
    const userApiLimit=await prismadb.testUserApiLimit.findUnique({
        where:{
            userId
        }
    })
    if(!userApiLimit)return 0;
    else return userApiLimit.count
}