import Image from 'next/image';
import castIcon from '../../public/castIcon.png';

export default function CastIcon({ width, height, onClick }: { width: number, height: number, onClick?: () => void }){
    return <Image src={castIcon} alt="Cast icon" className={`w-${width} h-${height}`} onClick={onClick} />;
}