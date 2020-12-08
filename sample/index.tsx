import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useVirtualList } from '../lib/index';

const DUMMY_ITEMS: { index: number }[] = [];
for (let i = 0; i < 100000; i++) {
    DUMMY_ITEMS.push({
        index: i,
    });
}

export function VirtualList(): React.ReactElement {
    const { setContainer, visibleItems, scrollHeight } = useVirtualList({
        items: DUMMY_ITEMS,
        itemHeight: 32,
    });

    return (
        <div ref={setContainer} style={{ position: 'relative', height: 300, overflow: 'auto', border: '1px solid #000' }}>
            <div style={{ height: scrollHeight }}>
                {visibleItems.map((itemData, i) => (
                    <div key={i} style={{ position: 'absolute', top: itemData.offsetTop, height: 32 }}>
                        Item(index = {itemData.item.index})
                    </div>
                ))}
            </div>
        </div>
    );
}

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<VirtualList />, document.getElementById('root'));
});
