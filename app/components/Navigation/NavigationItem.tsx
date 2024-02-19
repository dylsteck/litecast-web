
export default function NavigationItem({ text, underline = false, handleClick}: { text: string, underline?: boolean, handleClick?: () => void }){
    return(
        <p onClick={handleClick} className={`cursor-pointer ${underline && "underline font-medium"}`}>
            {text}
        </p>
    )
}