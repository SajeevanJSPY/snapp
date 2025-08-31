import Connection from './Connection';

export default function ConnectionRequest() {
    const names = ['hinata', 'tobio', 'kenma'];

    return (
        <section
            id="requests-panel"
            role="tabpanel"
            aria-labelledby="requests-tab"
            className="flex-1 max-w-md mx-auto h-full mt-5"
        >
            <div className="mx-1">
                <h2 className="text-2xl font-bold mb-4 text-center">Connection Requests</h2>
                <ul className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-70px)]">
                    {names.map(name => {
                        return <Connection name={name} />;
                    })}
                </ul>
            </div>
        </section>
    );
}
