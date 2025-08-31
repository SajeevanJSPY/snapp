import { useThemeContext } from '@/context/ThemeContext';

export default function Settings() {
    const { toggleTheme } = useThemeContext();

    return (
        <section
            id="settings-panel"
            role="tabpanel"
            aria-labelledby="settings-tab"
            className="flex-1 max-w-md mx-auto h-full mt-5"
        >
            <h2 className="sr-only">Settings Panel</h2>
            <ul className="flex flex-col gap-2 mx-1 p-2 rounded-2xl overflow-y-auto max-h-[calc(100vh-70px)] bg-secondary-content">
                <li className="flex justify-between content-center min-h-[50px] p-2 px-2 border-b-1">
                    <span className="self-center">Set the Theme</span>
                    <button
                        type="button"
                        onClick={e => {
                            e.preventDefault();
                            toggleTheme();
                        }}
                        aria-label="Toggle theme"
                        role="switch"
                        className="cursor-pointer"
                    >
                        Toggle
                    </button>
                </li>
                <li className="flex justify-between content-center min-h-[50px] p-2 px-2">
                    <span className="self-center">Update The Profile</span>
                </li>
            </ul>
        </section>
    );
}
