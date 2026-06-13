export function List({ children }: { children: React.ReactNode }) {
    return <ul className="flex flex-col gap-1 my-2">{children}</ul>;
}

export function ListItem({ label, value, testId }: { label: string; value: string, testId?:string }) {
    return (
        <li className="text-lg text-gray-400" data-testid={testId}>
            <span className="font-medium">{label}:</span> {value}
        </li>
    );
}
