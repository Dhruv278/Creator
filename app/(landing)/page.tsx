import LandingContent from "@/components/LandingContent";
import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function first() {
    return (
     <div className="h-full">
        <LandingNavbar /> 
        <LandingHero />
        <LandingContent />
     </div>
    )
}