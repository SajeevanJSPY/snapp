import { ReactNode } from 'react';

import { Panel, usePanelContext } from '@/context/PanelContext';

export default function SidebarNavItem({
    children,
    panelValue,
}: {
    children: ReactNode;
    panelValue: Panel;
}) {
    const { panel, setPanel } = usePanelContext();

    return (
        <button
            id={`${panelValue}-tab`}
            type="button"
            className="cursor-pointer flex items-center justify-center"
            role="tab"
            aria-selected={panel === panelValue}
            aria-controls={panel}
            onClick={() => {
                setPanel(panelValue);
            }}
        >
            {children}
            <span className="sr-only">{panelValue}</span>
        </button>
    );
}
