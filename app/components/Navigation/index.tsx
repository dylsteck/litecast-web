import React from "react";

export default function Navigation({ children }: { children: React.ReactNode }){
    return(
        <div className="border-b border-black">
            {children}
        </div>
    )
}