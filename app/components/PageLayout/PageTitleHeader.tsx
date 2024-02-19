export default function PageTitleHeader({ title }: { title: string }){
    return(
        <div className="pl-2 pt-1.5 pb-1.5 border-b border-gray-400 flex flex-row gap-4 items-center">
            <p className="pl-2 text-lg font-medium text-black/75">{title}</p>
        </div>
    )
}