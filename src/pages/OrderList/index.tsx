import { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Modal, notification, Table, Popconfirm } from 'antd';
import { getOrderListByPage, getGoodById, getOrderByStatus, updateOrder } from '@/services/api';
import moment from "moment";

const columns = [
    {
        title: '订单ID',
        dataIndex: 'orderId',
        key: 'orderId',
    },
    {
        title: '账单ID',
        dataIndex: 'billId',
        key: 'billId',
    },
    {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
    },
    {
        title: '商品数量',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '小费',
        dataIndex: 'tip',
        key: 'tip',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text: string) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }
];

export default function OrderList() {

    const actionRef = useRef<ActionType>()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState<any[]>([]);

    useEffect(() => {
        // 轮询获取未确定订单， 每分钟一次
        const timer = setInterval(() => {
            getOrderByStatus({ status: 0 }).then(res => {
                if (res.data && res.data.length > 0) {
                    res.data.forEach((ele: any) => {
                        openNotification(ele)
                    });
                }
            })
        }, 1000 * 60)
        return () => {
            clearInterval(timer)
        }
    }, [])

    // 未确认弹框
    const openNotification = (record: any) => {
        const key = record.orderNumber;
        const btn = (
            <Button type="primary" size="small" onClick={() => { notification.close(key); confirmOrder(record) }}>确认订单</Button>
        );
        notification.open({
            message: '来业务啦',
            description: '请确认并核查订单！',
            duration: null,
            btn,
            key,
            onClose: () => { actionRef.current?.reload() }
        });
    };

    // 确定订单
    const confirmOrder = (record: any) => {
        console.log({ ...record, status: 1 })
        updateOrder({ ...record, status: 1 }).then(res => {
            if (res.code === 200) {
                // 刷新表单
                actionRef.current?.reload()
            }
        })
    }

    const actionRender = (record: any) => {
        return record.status === 0 ?
            <Popconfirm
                title="确认订单?"
                onConfirm={() => confirmOrder(record)}
                okText="确认"
                cancelText="取消"
                key="sure"
            >
                <Button
                    type="primary"
                    size="small"
                >确认订单
                </Button>
            </Popconfirm>
            : null
    }

    const column: any = [
        { title: '订单号', dataIndex: 'orderNumber' },
        {
            title: "订单状态", dataIndex: 'status', valueType: 'select', valueEnum: {
                0: {
                    color: 'red',
                    text: '未确认',
                },
                1: {
                    color: 'yellow',
                    text: '已确认',
                },
                2: {
                    color: 'green',
                    text: '已完成',
                }
            }
        },
        { title: "总价格", dataIndex: 'allTotal' },
        { title: "总商品价格", dataIndex: 'totalPrice' },
        { title: "总代购费", dataIndex: 'totalTip' },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_: any, record: any) => ([
                <Button
                    type="primary"
                    size="small"
                    key="detail"
                    onClick={() => showDetail(record)}
                >查看详情
                </Button>,
                actionRender(record)
            ]),
        }
    ]

    const showDetail = (record: any) => {
        const arrDetail: any[] = []
        const promiseArr: any[] = []
        record.orders.forEach((item: any, index: number) => {
            const { price, tip, bill: { amount, billId, createTime, goodId, orderId } } = item
            let objItem = {
                key: index,
                goodsName: '',
                orderId,
                billId,
                amount,
                createTime,
                price,
                tip
            }
            arrDetail.push(objItem)
            promiseArr.push(getGoodById({ id: goodId }))
        })
        Promise.all(promiseArr).then(res => {
            res.forEach((item, index) => {
                arrDetail[index].goodsName = item.data.goodsName
            })
            setDataSource(arrDetail)
            setIsModalVisible(true)
        })
    }

    return (
        <PageContainer ghost={true}>
            <ProTable
                actionRef={actionRef}
                columns={column}
                request={getOrderListByPage}
                rowKey="key"
                pagination={{
                    showQuickJumper: true,
                }}
                search={false}
                dateFormatter="string"
            />
            <Modal title="订单详情" width={1200} visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)} >
                <Table rowKey="key" dataSource={dataSource} columns={columns} pagination={false} />
            </Modal>
        </PageContainer>
    )
}
