import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { notification, Popconfirm, Button, Drawer, Form, Input, InputNumber } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { FormInstance } from 'antd/es/form';
import { useIntl, FormattedMessage } from 'umi';
import styles from './index.less';
const { TextArea } = Input;


export default function ListCommon(props: API.ListCommonProps) {
    const intl = useIntl();
    const { column, rowKey, addText, addFormItems, operator } = props
    const [addDrawer, setAddDrawer] = useState<boolean>(false)
    const actionRef = useRef<ActionType>()

    // 编辑
    const renderEdit = (action: any, id: number) => {
        if (operator.update === null) return null;
        return <a
            key="editable"
            onClick={() => {
                action?.startEditable?.(id);
            }}><FormattedMessage id="pages.goodlist.eidt" defaultMessage="eidt" />
        </a>
    }

    // 删除
    const renderRemove = (id: number) => (
        <Popconfirm key="popconfirm" title={intl.formatMessage({ id: 'pages.listcommon.delete', defaultMessage: 'delete?' })} okText={intl.formatMessage({ id: 'pages.listcommon.yes', defaultMessage: 'yes' })} cancelText={intl.formatMessage({ id: 'pages.listcommon.no', defaultMessage: 'no' })} onConfirm={() => {
            operator.delete({ [rowKey]: id })
            // 刷新表单
            actionRef.current?.reload()
        }}>
            <a><FormattedMessage id="pages.listcommon.del" defaultMessage="delete" /></a>
        </Popconfirm>
    );

    // 添加
    const add = (params: any) => {
        operator.add({ ...params }).then((res: API.TableResult) => {
            if (res.code === 200) {
                setAddDrawer(false)
                // 刷新表单
                actionRef.current?.reload()
                notification.success({
                    message: intl.formatMessage({ id: 'pages.listcommon.tips', defaultMessage: 'tips' }),
                    description: res.message
                })
            }
        })
    }

    const columns: ProColumns[] = [
        ...column,
        {
            title: <FormattedMessage id="pages.goodlist.operation" defaultMessage="operation" />, dataIndex: 'option', valueType: 'option', render: ((text, record, _, action) => [
                renderEdit(action, record[rowKey]),
                renderRemove(record[rowKey])
            ])
        }
    ];

    return (
        <PageContainer ghost={true} className={props.hideHeader ? styles.hideHeader : ''}>
            <ProTable<any, API.PageParams>
                actionRef={actionRef}
                search={false}
                columns={columns}
                rowKey={rowKey}
                request={operator.get}
                editable={{
                    type: 'multiple',
                    actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.save, defaultDoms.cancel];
                    },
                    onSave: async (rowKey, data, row) => {
                        if (data.hot) data.hot = Number(data.hot)
                        if (data.priceAmount) data.priceAmount = Number(data.priceAmount)
                        operator.update({ ...data })
                    }
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        onClick={() => {
                            setAddDrawer(true);
                        }}
                    >
                        <PlusOutlined /> {addText}
                    </Button>
                ]}
            />
            <Drawer
                width={400}
                visible={addDrawer}
                onClose={() => {
                    setAddDrawer(false);
                }}
                closable={false}
            >
                {
                    addDrawer ? <AddList list={addFormItems} submit={(params: any) => add(params)} /> : null
                }
            </Drawer>
        </PageContainer>
    )
}

/**
 * 添加组件
 * @param submit 
 * @returns 
 */
export const AddList: React.FC<API.addClassFormProps> = ({ list, submit }) => {

    const formRef = React.createRef<FormInstance>();

    // Form.Item 输入框类型
    const InputType = (type: string) => {
        switch (type) {
            case 'Input':
                return <Input />
            case 'InputNumber':
                return <InputNumber style={{ width: '100%' }} />
            case 'TextArea':
                return <TextArea rows={2} />
            default:
                return null
        }
    }

    const onFinish = (values: any) => {
        submit({ ...values })
        // 重置表单
        formRef.current!.resetFields();
    };

    return (
        <>
            <h3 className={`${styles.title} ${styles.mB30}`}><FormattedMessage id="pages.goodlist.add" defaultMessage="add" /></h3>
            <Form
                ref={formRef}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                {
                    list.map((item) => (
                        <Form.Item
                            key={item.label}
                            label={item.label}
                            name={item.name}
                            rules={item.rules}
                        >
                            {InputType(item.type)}
                        </Form.Item>
                    ))
                }

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        <FormattedMessage id="pages.goodlist.sub" defaultMessage="sub" />
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
