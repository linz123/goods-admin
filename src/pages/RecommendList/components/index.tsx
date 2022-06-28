import React from 'react';
import ListCommon from '@/components/ListCommon';
import { addRecommend, deleteRecommendById, getRecommendByType } from '@/services/api';

const RecommendCard: React.FC<API.RecommendCardProps> = ({ currentKey }) => {

    const listProps: API.ListCommonProps = {
        addText: "新增推荐",
        rowKey: 'recommendId',
        hideHeader: true,
        column: [
            { title: "推荐ID", dataIndex: 'recommendId', editable: false },
            { title: "商品ID", dataIndex: 'goodId', editable: false },
            { title: "商品名称", dataIndex: 'goodsName', editable: false },
        ],
        addFormItems: [
            { type: 'InputNumber', label: "商品ID", name: 'goodId', rules: [{ required: true, message: "请输入商品ID" }] }
        ],
        operator: {
            get: () => getRecommendByType({ type: Number(currentKey) }),
            add: (params: any) => addRecommend({ ...params, type: Number(currentKey) }),
            update: null,
            delete: deleteRecommendById
        }
    }

    return <ListCommon {...listProps} />
}

export default RecommendCard;
