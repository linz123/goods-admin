import ListCommon from "@/components/ListCommon"
import { labelList, updateLabelById, deleteLabelById, addLabel } from '@/services/api/index';
import { useIntl, FormattedMessage } from 'umi';

export default function LabelList() {

    const intl = useIntl();

    const listProps: API.ListCommonProps = {
        addText: <FormattedMessage id="pages.labellist.add" defaultMessage="addLabel" />,
        rowKey: 'labelId',
        column: [
            { title: <FormattedMessage id="pages.labellist.labelId" defaultMessage="labelId" />, dataIndex: 'labelId', editable: false },
            { title: <FormattedMessage id="pages.labellist.labelName" defaultMessage="labelName" />, dataIndex: 'labelName' },
            { title: <FormattedMessage id="pages.labellist.labelDescribe" defaultMessage="labelDescribe" />, dataIndex: 'labelDescribe', colSize: 3, ellipsis: true },
            { title: <FormattedMessage id="pages.labellist.hot" defaultMessage="hot" />, dataIndex: 'hot' },
        ],
        addFormItems: [
            { type: 'Input', label: intl.formatMessage({ id: 'pages.labellist.labelName', defaultMessage: 'labelName' }), name: 'labelName', rules: [{ required: true, message: intl.formatMessage({ id: 'pages.labellist.inputName', defaultMessage: 'place inputName！' }) }] },
            { type: 'InputNumber', label: intl.formatMessage({ id: 'pages.labellist.hot', defaultMessage: 'hot' }), name: 'hot', rules: null },
            { type: 'TextArea', label: intl.formatMessage({ id: 'pages.labellist.labelDescribe', defaultMessage: 'labelDescribe' }), name: 'labelDescribe', rules: null },
        ],
        operator: {
            get: labelList,
            add: addLabel,
            update: updateLabelById,
            delete: deleteLabelById
        }
    }

    return <ListCommon {...listProps} />

}