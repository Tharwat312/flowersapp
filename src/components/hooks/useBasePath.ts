import { usePathname } from 'next/navigation';

const useBasePath = () => {
    const pathname = usePathname();
    const segments = pathname.split('/'); 
    const basePath = '/' + (segments[2] || ''); 

    return basePath;
};
export default useBasePath;