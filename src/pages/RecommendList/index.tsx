import { useState } from 'react';
import { Tabs } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import RecommendCard from './components'
const { TabPane } = Tabs;

const TabPanes: { tab: string; key: string }[] = [
    { tab: "推荐类型一", key: "1" },
    { tab: "推荐类型二", key: "2" },
    { tab: "推荐类型三", key: "3" },
]
export default function index() {
    const [activeKey, setActiveKey] = useState('1')
    return (
        <>
            <Tabs activeKey={activeKey} type="card" onChange={(key) => setActiveKey(key)} >
                {
                    TabPanes.map(item => <TabPane tab={<span><StarOutlined />{item.tab}</span>} key={item.key}>
                        {activeKey === item.key ? <RecommendCard currentKey={activeKey} /> : null}
                    </TabPane>)
                }
            </Tabs>
        </>
    )
}
