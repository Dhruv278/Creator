import { Button } from "@/components/ui/button" 
import { UserButton } from "@clerk/nextjs"
import  { Menu } from "lucide-react"
import MobileSidebar from "@/components/mobile-sidebar"
import { checkSubscription } from "@/lib/subscription"
interface NavbarProps{
    apiLimitCount:number
}
export default async function Navbar({apiLimitCount=0}:NavbarProps) {
    const isPro=await checkSubscription(); 
   return (
    <div className="flex items-center p-4">
       <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        <div className=" flex w-full justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
        
    </div>
   )
}