import Image from 'next/image';

export default function CastIcon({ width, height, onClick }: { width: number, height: number, onClick?: () => void }){
    return <Image src="https://i.imgur.com/XVaksRG.png" alt="Cast icon" className={`w-${width} h-${height}`} onClick={onClick} />;
}