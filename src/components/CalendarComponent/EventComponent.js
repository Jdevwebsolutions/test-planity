import React from 'react'

export default function EventComponent(props) {
    return (<div>
        <li  style={{
         left: 3+props.left+ "px",
         width: (props.containerWidth/props.units)+ "px",
         top: props.top+ "px",
         height: props.height+ "px",
         display:"flex",
         alignItems: "center",
         justifyContent: "center",
         backgroundColor:"#196389"
        }} 
         key={props.event.id}>
            <p style={{fontSize:18}}><b className="term">Event : </b> {props.event.id}</p>
        </li>
    </div>);
}
