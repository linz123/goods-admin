import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Button, Drawer, Space, Tag } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { deleteGoodById, goodsList } from '@/services/api/index';
import { goodsItemInitValue } from "@/util";
import AddAndEditeGoods from './components/addAndEditeGoods';

type addAndEditListItem = {
    show: boolean;
    type: string
}

export default function GoodList() {

    const intl = useIntl();

    const [addAndEditDrawer, setAddAndEditDrawer] = useState<addAndEditListItem>({
        show: false,
        type: ''  // add新增 edit编辑
    })

    const actionRef = useRef<ActionType>()

    const [currentInfo, setCurrentInfo] = useState<API.GoodListItem>({ ...goodsItemInitValue })

    const closeDrawer = (refresh = false) => {
        setAddAndEditDrawer({ show: false, type: '' });
        // 刷新表单
        refresh && actionRef.current?.reload()
    }

    // 删除
    const renderRemove = (id: number | null) => (
        <Popconfirm key="popconfirm" title={intl.formatMessage({ id: 'pages.listcommon.delete', defaultMessage: 'delete?' })} okText={intl.formatMessage({ id: 'pages.listcommon.yes', defaultMessage: 'yes' })} cancelText={intl.formatMessage({ id: 'pages.listcommon.no', defaultMessage: 'no' })} onConfirm={() => {
            deleteGoodById({ id })
            // 刷新表单
            actionRef.current?.reload()
        }}>
            <a><FormattedMessage id="pages.listcommon.del" defaultMessage="delete" /></a>
        </Popconfirm>
    );

    const columns: ProColumns<API.GoodListItem>[] = [
        { title: <FormattedMessage id="pages.goodlist.goodId" defaultMessage="goods ID" />, width: 50, dataIndex: 'goodId' },
        { title: <FormattedMessage id="pages.goodlist.title" defaultMessage="title" />, dataIndex: 'title', width: '10%', ellipsis: true },
        { title: <FormattedMessage id="pages.goodlist.goodsName" defaultMessage="goodsName" />, dataIndex: 'goodsName', width: '10%', ellipsis: true },
        { title: <FormattedMessage id="pages.goodlist.describe" defaultMessage="describe" />, dataIndex: 'describe', search: false, width: '10%', ellipsis: true },
        { title: <FormattedMessage id="pages.goodlist.price" defaultMessage="price" />, dataIndex: 'price' },
        {
            title: <FormattedMessage id="pages.goodlist.class" defaultMessage="class" />, dataIndex: 'classShowArr', ellipsis: true, search: false, render: (_, record) => (
                <Space>
                    {
                        record.classShowArr.map((item: string) => <Tag key={item} color="blue">{item}</Tag>)
                    }
                </Space>
            )
        },
        {
            title: <FormattedMessage id="pages.goodlist.label" defaultMessage="label" />, dataIndex: 'labelShowArr', ellipsis: true, search: false, render: (_, record) => (
                <Space>
                    {
                        record.labelShowArr.map((item: string) => <Tag key={item} color="cyan">{item}</Tag>)
                    }
                </Space>
            )
        },
        {
            title: <FormattedMessage id="pages.goodlist.tips" defaultMessage="tips" />, dataIndex: 'tipsShow', search: false, render: (_, record) => (
                <Space>
                    {
                        record.tipsShow ? <Tag color="red">{record.tipsShow.priceName}: {record.tipsShow.priceAmount}</Tag> : null
                    }
                </Space>
            )
        },
        {
            title: <FormattedMessage id="pages.goodlist.operation" defaultMessage="operation" />, dataIndex: 'option', valueType: 'option', render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        setCurrentInfo(record)
                        setAddAndEditDrawer({ show: true, type: 'edit' });
                    }}
                ><FormattedMessage id="pages.goodlist.eidt" defaultMessage="eidt" /></a>,
                renderRemove(record.goodId)
            ]
        },
    ];

    return (
        <PageContainer ghost={true}>
            <ProTable<API.GoodListItem, API.PageParams>
                actionRef={actionRef}
                columns={columns}
                request={goodsList}
                rowKey="goodId"
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            setCurrentInfo({ ...goodsItemInitValue })
                            setAddAndEditDrawer({ show: true, type: 'add' });
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.goodlist.addGoods" defaultMessage="addGoods" />
                    </Button>
                ]}
            />
            <Drawer
                width={800}
                visible={addAndEditDrawer.show}
                onClose={() => closeDrawer(false)}
                closable={false}
            >
                {
                    addAndEditDrawer.show ? <AddAndEditeGoods onClose={() => closeDrawer(true)} type={addAndEditDrawer.type} currentInfo={currentInfo} /> : null
                }
            </Drawer>
        </PageContainer>
    )
}
