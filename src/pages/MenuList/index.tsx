import React, { useEffect, useState } from 'react';
import { Tree, TreeProps, List, Button, Drawer, notification, Popconfirm } from 'antd';
import { TagOutlined, PlusOutlined, SettingOutlined, MinusOutlined } from '@ant-design/icons';
import { getMenuList, getAllClasses, deleteMenuById } from '@/services/api';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less'
import { filterData, MenuItemInitValue, menuListToTree } from '@/util';
import AddMenuList from './components/AddMenuList'

export default function MenuList() {

    const [treeData, setTreeData] = useState<any[]>([])
    const [classData, setClassData] = useState<any[]>([])
    const [allClass, setAllClass] = useState<any[]>([])
    const [addDrawer, setAddDrawer] = useState<boolean>(false)
    const [initialVal, setInitialVal] = useState<API.MenuInital>(MenuItemInitValue)
    const [currentSelect, setCurrentSelect] = useState<API.MenuInital>(MenuItemInitValue)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        Promise.all([
            getMenuList().then(res => {
                if (res.code === 200 && res.data) {
                    res.data = menuListToTree(res.data)
                    setTreeData(res.data);
                    return res.data;
                }
            }),
            getAllClasses().then(res => {
                if (res.code === 200 && res.data) {
                    setAllClass(res.data);
                    return res.data;
                }
            })
        ]).then(res => {
            const [menuArr, allClassArr] = res;
            const cls = menuArr[0].classIds.split(',')
            setClassData(filterData(cls, allClassArr, 'classId', 'className'))
            setCurrentSelect(menuArr[0])
        })
    }, [])

    /**
     * 树形菜单选择
     * @param selectedKeys 
     * @param info 
     */
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info: any) => {
        const cls = info.node.classIds.split(',')
        // 显示当前分类
        setClassData(filterData(cls, allClass, 'classId', 'className'))
        // 当前选择
        setCurrentSelect(info.node)
    };
    /**
     * 新增、编辑
     * @param type 
     */
    const open = (type: string) => {
        if (type === 'add') {
            setInitialVal(MenuItemInitValue)
            setAddDrawer(true)
        } else {
            const { menuId, classIds, description, name, pid, status, url } = currentSelect
            const classArr = classIds !== '' ? classIds.split(',').map((item: string) => Number(item)) : []
            setInitialVal({ menuId, classIds: classArr, description, name, pid, status, url })
            setAddDrawer(true)
        }
    }
    const submit = () => {
        getMenuList().then(res => {
            if (res.code === 200 && res.data) {
                // 更新当前分类
                const newItem = res.data.find((item: any) => item.menuId === currentSelect.menuId)
                const cls = newItem.classIds.split(',')
                setClassData(filterData(cls, allClass, 'classId', 'className'))
                // 更新树形数据
                res.data = menuListToTree(res.data)
                setTreeData(res.data);
            }
        })
        setAddDrawer(false)
    }
    /**
     * 删除
     */
    const detele = () => {
        deleteMenuById({ menuId: currentSelect.menuId }).then(res => {
            if (res.code === 200) {
                notification.success({
                    message: "提示",
                    description: res.message
                })
                setVisible(false)
            }
        }).then(() => {
            getMenuList().then(res => {
                if (res.code === 200 && res.data) {
                    // 重置当前分类和选择项
                    setClassData([])
                    setCurrentSelect(MenuItemInitValue)
                    // 更新树形数据
                    res.data = menuListToTree(res.data)
                    setTreeData(res.data);
                }
            })
        })
    }

    return (
        <PageContainer ghost={true}>
            <div className={styles.main}>
                <div className={styles.menuList}>
                    <div className={styles.title}>
                        <h2>菜单</h2>
                        <div>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => open('edit')}
                            >
                                <SettingOutlined /> 编辑
                            </Button>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => open('add')}
                            >
                                <PlusOutlined /> 新增
                            </Button>

                            <Popconfirm
                                title="确认删除？"
                                visible={visible}
                                onConfirm={detele}
                                onCancel={() => setVisible(false)}
                            >
                                <Button type="primary" size="small" onClick={() => setVisible(true)}>
                                    <MinusOutlined /> 删除
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                    {
                        treeData.length > 0 && <Tree
                            showLine
                            showIcon
                            fieldNames={{ title: "name", key: "menuId" }}
                            defaultExpandAll
                            defaultSelectedKeys={[1]}
                            onSelect={onSelect}
                            treeData={treeData}
                        />
                    }
                </div>
                <div className={styles.classList}>
                    <div className={styles.title}>
                        <h2>分类</h2>
                    </div>
                    <div className={styles.lisetMain}>
                        <List
                            header={null}
                            footer={null}
                            dataSource={classData}
                            renderItem={item => (
                                <List.Item>
                                    <TagOutlined /> {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
            <Drawer
                width={400}
                visible={addDrawer}
                onClose={() => {
                    setAddDrawer(false);
                }}
                closable={false}
            >
                {
                    addDrawer ? <AddMenuList allClass={allClass} initialVal={initialVal} submit={submit} /> : null
                }
            </Drawer>
        </PageContainer>
    )
}
