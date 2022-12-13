import { useState } from "react";

function Check({id, list}) {
    const [active, setActive] = useState(false)
    return ( 
        <div className="cursor-pointer" onClick={
            ()=>
            {
                if(!active){
                    setActive(true)
                    list(a => [...a, id])
                }else{
                    list(a=> a.filter((word) => word != id))
                    setActive(false)
                }
            }
            }>
            {active ? <img src='/u_check-square.svg' /> :
            <img src='/u_square-full.svg' />
            }
        </div>
     );
}

export default Check;