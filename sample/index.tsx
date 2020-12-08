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
    const virtualListData = useVirtualList({ itemHeight: 32, items: DUMMY_ITEMS });

    return (
        <div ref={virtualListData.setContainer} style={{ position: 'relative', height: 300, overflow: 'auto', border: '1px solid #000' }}>
            <div style={{ height: virtualListData.scrollHeight }}>
                {virtualListData.visibleItems.map((itemData, i) => (
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
