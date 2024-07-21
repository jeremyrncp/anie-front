import Image from "next/image";
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
    return (
        <nav className="lg:hidden px-6 h-[60px] flex items-center bg-white border-b border-slate-300 fixed top-0 w-full z-50">
            <MobileSidebar />
            <div className="flex-grow flex justify-center">
                <a href="/">
                    <Image src="/(Icons & modals)/logodazaga.png" height={48} width={48} alt="Logo" />
                </a>
            </div>
        </nav>
    );
};
