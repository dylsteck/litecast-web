import Image from 'next/image';

export default function CastIcon({ width, height, onClick }: { width: number, height: number, onClick?: () => void }){
    return <Image src="https://i.imgur.com/o3p5x1i.png" alt="Cast icon" width={width} height={height} className={`w-${width} h-${height}`} onClick={onClick} />;
}