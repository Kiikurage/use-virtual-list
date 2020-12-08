import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface VirtualListProps<T> {
    items: T[];
    itemHeight: number;
    hiddenItemCount?: number;
}

export interface VirtualListItemData<T> {
    index: number;
    item: T;
    offsetTop: number;
}

export interface VirtualListData<T> {
    visibleItems: VirtualListItemData<T>[];
    scrollHeight: number;
    setContainer: (container: HTMLElement | null) => void;
}

export const useVirtualList = <T>(props: VirtualListProps<T>): VirtualListData<T> => {
    const { items, itemHeight, hiddenItemCount = 10 } = props;

    const onResizeHandlerRef = useRef<(entries: readonly ResizeObserverEntry[]) => void>(() => void 0);
    onResizeHandlerRef.current = (entries: readonly ResizeObserverEntry[]) => {
        for (const entry of entries) {
            if (entry.target !== container) continue;

            setClientHeight(entry.contentRect.height);
        }
    };
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    useEffect(() => {
        resizeObserverRef.current = new ResizeObserver((entries) => onResizeHandlerRef.current(entries));
    }, []);

    const [container, setContainer] = useState<HTMLElement | null>(null);

    const [scrollTop, setScrollTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(100);
    const [visibleItemIndexFrom, setVisibleItemIndexFrom] = useState(0);
    const [visibleItemIndexTo, setVisibleItemIndexTo] = useState(Math.min(hiddenItemCount, items.length));
    const visibleItems = useMemo(() => {
        return items.slice(visibleItemIndexFrom, visibleItemIndexTo).map((item, index) => ({
            index,
            item,
            offsetTop: (visibleItemIndexFrom + index) * itemHeight,
        }));
    }, [itemHeight, items, visibleItemIndexFrom, visibleItemIndexTo]);

    useEffect(() => {
        setVisibleItemIndexFrom(Math.max(0, Math.floor(scrollTop / itemHeight) - hiddenItemCount));
        setVisibleItemIndexTo(Math.min(items.length, Math.ceil((scrollTop + clientHeight) / itemHeight) + 1 + hiddenItemCount));
    }, [clientHeight, hiddenItemCount, itemHeight, items.length, scrollTop]);

    const onScrollHandlerRef = useRef<() => void>(() => void 0);
    onScrollHandlerRef.current = () => {
        setScrollTop(container?.scrollTop ?? 0);
    };
    const onScroll = useCallback(() => onScrollHandlerRef.current(), []);
    useEffect(() => {
        if (container !== null) {
            resizeObserverRef.current?.observe(container);
            container.addEventListener('scroll', onScroll);
            return () => {
                resizeObserverRef.current?.unobserve(container);
                container.removeEventListener('scroll', onScroll);
            };
        }
    }, [container, onScroll]);

    const scrollHeight = items.length * itemHeight;

    return { visibleItems, setContainer, scrollHeight };
};
