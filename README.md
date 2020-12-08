# use-virtual-list

[![npm version](https://badge.fury.io/js/use-virtual-list.svg)](https://badge.fury.io/js/use-virtual-list)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Minimal React hook for [virtual list](https://weekend.dev/what-are-virtual-lists/)

- **Zero Dependency**
  
  This package doesn't require any extra dependent packages. The bundle size is less than 1Kb!

- **Fully Customizable UI**
  
  This hook doesn't force you to use any type of UI, but provides all information to render component, and you can customize UI appearance by yourself

## Usage

```jsx
export function MyVirtualList(props) {
    // 1. Call hook with list items
    const {
        setContainer,
        visibleItems,
        scrollHeight
    } = useVirtualList({
        items: props.items,
        itemHeight: 32,
    });

    return (
        // 2. For container node, set reference callback. Also you must set "overflow: auto" for its style 
        <div ref={setContainer} style={{ position: 'relative', height: 300, overflow: 'auto' }}>

            {/* 3. For list node, set "height: scrollHeight", so that list has appropriate scroll height */}
            <div style={{ height: scrollHeight }}>

                {visibleItems.map((itemData, i) => {
                    // 4. For each visible item, set "position: absolute, top: itemData.offsetTop"
                    return (
                        <div key={i} style={{ position: 'absolute', top: itemData.offsetTop, height: 32 }}>
                            Item(index = {itemData.item.index})
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
```

Done! Now you can customize the look and feel as you like!
