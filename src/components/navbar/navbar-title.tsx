import {version} from '../../../package.json'

export default function NavbarTitle() {
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