import {getVersion} from "@/lib";
import {useEffect, useState} from "react";

export default function NavbarTitle() {
    const [version, setVersion] = useState<string>('');

    useEffect(() => {
        setVersion(getVersion());
    }, [])

    return (
        <div className={'flex flex-col items-center justify-center'}>
            <span>
                <span className={'font-extralight'}>Simple|</span>
                <span className={'font-semibold'}>Task</span>
            </span>
            <span className={'text-xs font-extralight'}>{version}</span>
        </div>
    )
}