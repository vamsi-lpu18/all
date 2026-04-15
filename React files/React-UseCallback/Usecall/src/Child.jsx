import React from "react";
function Child(props){
   console.log("this is child component");
    return (
        <>
        <h1>this is child</h1>
        <h2>{props.print()}</h2>
        </>
    )
}
export default React.memo(Child)