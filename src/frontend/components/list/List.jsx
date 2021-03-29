import * as React from 'react';
import { List, arrayMove, arrayRemove } from 'react-movable';
import './list.less';

const RemovableIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-x-circle"
    >
        <title>Remove</title>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export default function MyList({ items, onUpdate }) {

    return (
        <div className="list-container">
            <List
                values={items}
                onChange={({ oldIndex, newIndex }) => onUpdate(arrayMove(items, oldIndex, newIndex))}
                renderList={({ children, props, isDragged }) => (
                    <ul {...props} style={{ cursor: isDragged ? 'grabbing' : 'inherit' }} >
                        {children}
                    </ul>
                )}
                renderItem={({ value, props, index, isDragged }) => (
                    <li
                        {...props}
                        style={{
                            ...props.style,
                            cursor: isDragged ? 'grabbing' : 'grab',
                            backgroundColor: isDragged ? 'lightslategray' : '#FFF'
                        }}
                    >
                        <div className="item">
                            <div className="item-id">{index + 1}</div>
                            <div className="item-name">{value}</div>
                            <button className="remove-button"
                                onClick={() => {
                                    onUpdate(
                                        typeof index !== 'undefined'
                                            ? arrayRemove(items, index)
                                            : items
                                    );
                                }}
                            >
                                <RemovableIcon />
                            </button>
                        </div>
                    </li>
                )}
            />
        </div>
    );
};
