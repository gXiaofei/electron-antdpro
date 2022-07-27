import { Tabs } from 'antd';
import React, { useRef, useState } from 'react';

const { TabPane } = Tabs;

const defaultPanes = Array.from({ length: 2 }).map((_, index) => {
    const id = String(index + 1);
    return { title: `Tab ${id}`, content: `Content of Tab Pane ${index + 1}`, key: id };
});

const ChildrenRender: React.FC = (props) => {
    const { children } = props;
    console.log('props', props);
    const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
    const [panes, setPanes] = useState(defaultPanes);
    const newTabIndex = useRef(0);

    // const { initialState, loading, setInitialState } = useModel('@@initialState');

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setPanes([...panes, { title: 'New Tab', content: 'New Tab Pane', key: newActiveKey }]);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: string) => {
        const targetIndex = panes.findIndex((pane) => pane.key === targetKey);
        const newPanes = panes.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const { key } =
                newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setPanes(newPanes);
    };
    const onEdit = (
        e: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(e as string);
        }
    };
    return children;
    return (
        <div>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={onEdit}
            >
                {panes.map((pane) => (
                    <TabPane tab={pane.title} key={pane.key}>
                        {pane.content}
                        {children}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default ChildrenRender;
