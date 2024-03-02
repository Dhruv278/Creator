"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials=[

        {
            "name": "Dhruv",
            "avatar": "A",
            "title": "Creative Full Stack Developer",
            "description": "Revolutionary AI-driven application that seamlessly generates images, music, and videos from text, while also providing efficient code writing assistance."
        },
        {
            "name": "Disha",
            "avatar": "D",
            "title": "AI Enthusiast and Developer",
            "description": "Unparalleled application utilizing AI to produce images, music, and videos from text, along with intuitive code writing support, making it a standout tool for any AI project."
        },
        {
            "name": "Bhumi",
            "avatar": "B",
            "title": "Innovative Project Manager",
            "description": "Game-changing platform that generates images, music, and videos from text using AI, combined with a user-friendly interface and efficient code writing features, making it an indispensable asset for creative projects."
        },
        {
            "name": "Siddharth",
            "avatar": "S",
            "title": "Tech-savvy Innovator",
            "description": "Cutting-edge application with remarkable AI capabilities to generate images, music, and videos from text, seamlessly integrated with code writing functionalities, offering immense potential for innovation."
        }

    
]

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
         Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item)=>(
                <Card key={item.description} className="bg-[#192339] border-none text-white">
                    <CardHeader >
                        <CardTitle className="flex items-center gap-x-2">
                            <div>
                                <p className="text-lg">{item.name}</p>
                                <p className="text-sm text-zinc-400 ">{item.title}</p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0" >
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
            </div>      
    </div>
  )
};

export default LandingContent
