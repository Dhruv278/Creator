"use client"

import axios from 'axios';
import * as z from 'zod'
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form"
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionRequestMessage } from 'openai';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import {  cn} from '@/lib/utils';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';
import { useProModal } from '@/hooks/user-pro-model';
import toast from 'react-hot-toast';
const MusicPage = () => {
  const router = useRouter();
  const proModal=useProModal();
  const [isLoading,setIsLoading]=useState<boolean>(false);
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
    setMusic(undefined);
 
    const response = await axios.post('/api/music',values);
      if(response.status===200){
        const timer=setInterval(async()=>{
           try{
            const res=await axios.get("/api/musicWebhook/fetchData");
            console.log(res.data)
            console.log(res.status)
            if(res.status===200){
              setMusic(res.data.url);
              setIsLoading(false);
              clearInterval(timer);
              router.refresh();
            }
           }catch(error:any){
             console.log(error) 
           }

        },3000)
      }
      form.reset()
    } catch (error: any) {
      setIsLoading(false);
      if(error?.response?.status===403){
        proModal.onOpen();
      }else{
        toast.error("Something went wrong")
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your text into music.(Warning: Music generation will take some time, so please wait.)"
        icon={MessageSquare}
        iconColor="text-emrald-500"
        bgColor="bg-emrald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 '
          >
            <FormField name="prompt" render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ' disabled={isLoading} placeholder='Piano solo' {...field} />
                </FormControl>
              </FormItem>
            )} />
            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className='space-y-4 mt-4'>
          {isLoading  && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <Empty label='No Music generated' />
          )}
          {
            music && (
                <audio controls className='w-full mt-8'>
                    <source src={music} />
                </audio>
            ) 
          }
        </div>
      </div>
    </div>
  )
};

export default MusicPage
