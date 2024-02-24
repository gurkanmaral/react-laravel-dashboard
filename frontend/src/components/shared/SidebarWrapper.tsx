import { useSidebar } from "@/lib/use-sidebar";
import { cn } from "@/lib/utils";


interface WrapperProps {
    children: React.ReactNode;
}


const Wrapper = ({children}:WrapperProps) => {

    const {collapsed} = useSidebar((state)=>state);


    return (
        <aside className={cn("shadow-md shadow-black border-none  transition-width md:mt-10 rounded-[10px] sticky top-5  md:left-3 w-60 h-[100%] md:h-[70%]  z-50",
        collapsed ? "w-[70px] transition-all" : "w-60 transition-all")}>
            {children}
        </aside>
    )

}

export default Wrapper