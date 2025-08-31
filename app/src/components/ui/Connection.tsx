import { CircleCheck, CircleX } from 'lucide-react';

export default function Connection({ name }: { name: string }) {
    return (
        <>
            <li className="p-2 bg-secondary-content rounded-2xl flex justify-between">
                <div className="font-semibold pl-2">{name.toUpperCase()}</div>
                <div className="flex gap-2 pl-2">
                    <CircleCheck
                        className="text-success cursor-pointer"
                        onClick={e => {
                            e.preventDefault();
                        }}
                    />
                    <CircleX className="text-error cursor-pointer" />
                </div>
            </li>
        </>
    );
}
