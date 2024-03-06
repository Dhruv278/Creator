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
import { useProModal } from '@/hooks/user-pro-model';



const VideoPage = () => {
  const router = useRouter();
  const proModal=useProModal();
  const [video, setVideo] = useState<string>();
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    setVideo(undefined);
    setIsLoading(true)

      const response = await axios.post('/api/video',values);
      if(response.status===200){
        const timer=setInterval(async()=>{
           try{
            const res=await axios.get("/api/videoWebhook/fetchVideoData");

            if(res.status===200){
              setVideo(res.data.url);
              setIsLoading(false)
              router.refresh();
              clearInterval(timer);
            }
           }catch(error:any){
             console.log(error) 
           }

        },7000)
      }
      form.reset()
    } catch (error: any) {
      setIsLoading(false)
      if(error?.response?.status===403){
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your text into Video.(Warning: VIdeo generation will take some time, so please wait.)"
        icon={MessageSquare}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 '
          >
            <FormField name="prompt" render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent ' disabled={isLoading} placeholder='Clown fish swimming around a coral reef' {...field} />
                </FormControl>
              </FormItem>
            )} />
            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            <Empty label='No Music generated' />
          )}
          {
            video && (
              <video className='w-full aspect-video mt-8 rounded-lg border bg-black' controls>
                <source src={video}/>
              </video>
            ) 
          }
        </div>
      </div>
    </div>
  )
};

export default VideoPage
