import { Palette } from "lucide-react";

export default function CustomizeButton({open,setOpen}){

return(

<div
className="
fixed
right-0
top-1/2
translate-y-[-50%]
z-50
"
>


<div

onClick={()=>setOpen(!open)}

className="
bg-white
px-5
py-4

rounded-l-xl

shadow-xl

cursor-pointer

flex
items-center
gap-3

hover:scale-105
transition
"
>


<Palette
size={18}
className="text-blue-600"
/>


<p className="font-medium">
Customize
</p>


</div>


</div>

)

}