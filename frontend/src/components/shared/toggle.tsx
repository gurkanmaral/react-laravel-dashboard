
import { Button } from "@/components/ui/button";

import { useSidebar } from "@/lib/use-sidebar";
import { ArrowLeft, ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Hint from "./Hint";


const Toggle = () => {

    const {collapsed,onExpand,onCollapse} = useSidebar((state)=>state);

    const label = collapsed ? "Expand" : "Collapse";


  return (
    <>
    {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-3 mb-4" >
            <Hint label={label} side="right" asChild>
                <Button 
                onClick={onExpand}
                variant="ghost"
                className="h-auto p-2">
                    <ArrowRightFromLine className="h-4 w-4" />
                </Button>
            </Hint>
        </div>
    )}
    {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
            <Hint label={label} side="right" asChild>
                <Button className="h-auto p-2 ml-auto" variant="ghost"
                 onClick={onCollapse}>
                    <ArrowLeftFromLine  className="h-4 w-4"/>
                </Button>
            </Hint>
        </div>
    )}
    </>
  )
}

export default Toggle

