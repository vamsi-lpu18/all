import { useContext } from "react"
import { Theme } from "./Countext"

const C1=()=>{
    // const user=useContext(UserContext);  Ce3DDDE3`   XZ <C>DE3</C>
    const {name,setName}=useContext(Theme)
    return (
        <>
        <h1>
            <form>
                <input type="text"  value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter any text"/>
            </form>
            {/* name is :{user.name} */}
        </h1>
        </>
    )
}
export default C1