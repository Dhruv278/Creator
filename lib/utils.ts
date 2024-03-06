import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import prismadb from "./prismadb"


export async function createMusicData(id:string){
  const user=await prismadb.streams.findUnique({
    where:{
      userId:id
    }
  })
  if(!user){
    const newUser=await prismadb.streams.create({
      data:{
        userId:id
      }
    })
  }
  else{
    const updateUser=await prismadb.streams.update({
      where:{
        userId:id
      },
      data:{
        musicStream:""
      }
    })
  }
}

export async function getMusicData(id:string){
  const user=await prismadb.streams.findUnique({
    where:{
      userId:id
    }
  })

  if(!user )return undefined
  else {

    if(user.musicStream.length===0)return undefined;
    else return user.musicStream
  };
}

export async function setMusicData(id:string,musicStream:string){
  const musicData=await prismadb.streams.update({
    where:{
      userId:id
    },
    data:{
      musicStream
    }
  })

}



export async function createVideoData(userId:string) {
  const user=await prismadb.streams.findUnique({
    where:{
      userId
    }
  })
  if(!user){
    const newUser=await prismadb.streams.create({
      data:{
        userId
      }
    })
  }
  else{
    const updateUser=await prismadb.streams.update({
      where:{
        userId
      },
      data:{
        videoStream:""
      }
    })
  }
}

export async function getVideoData(id:string){
  const user=await prismadb.streams.findUnique({
    where:{
      userId:id
    }
  })

  if(!user )return undefined
  else {
   
    if(user.videoStream.length===0)return undefined;
    else return user.videoStream
  };
}

export async function setVideoData(id:string,videoStream:string){
  const videoData=await prismadb.streams.update({
    where:{
      userId:id
    },
    data:{
      videoStream
    }
  })

}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path:string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}