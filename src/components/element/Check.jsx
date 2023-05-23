import { useState } from "react";

function Check({id, list}) {
    const [active, setActive] = useState(false)
    return ( 
        <div className="cursor-pointer" onClick={
            ()=>
            {
                if(!active){                
                    list(a => [...a, id])
                    setActive(true)
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