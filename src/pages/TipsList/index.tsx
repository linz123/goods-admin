import ListCommon from "@/components/ListCommon"
import { getAllTips, updatePriceById, deletePriceById, addPrice } from '@/services/api/index';
import { useIntl, FormattedMessage } from 'umi';

export default function TipsList() {

    const intl = useIntl();

    const listProps: API.ListCommonProps = {
        addText: <FormattedMessage id="pages.tipslist.add" defaultMessage="addTips" />,
        rowKey: 'tipId',
        column: [
            { title: <FormattedMessage id="pages.tipslist.tipsId" defaultMessage="tipsId" />, dataIndex: 'tipId', editable: false },
            { title: <FormattedMessage id="pages.tipslist.tipsName" defaultMessage="priceName" />, dataIndex: 'priceName' },
            { title: <FormattedMessage id="pages.tipslist.tipsAmount" defaultMessage="priceAmount" />, dataIndex: 'priceAmount' }
        ],
        addFormItems: [
            { type: 'Input', label: intl.formatMessage({ id: 'pages.tipslist.tipsName', defaultMessage: 'priceName' }), name: 'priceName', rules: [{ required: true, message: intl.formatMessage({ id: 'pages.tipslist.inputName', defaultMessage: 'place inputName！' }) }] },
            { type: 'InputNumber', label: intl.formatMessage({ id: 'pages.tipslist.tipsAmount', defaultMessage: 'priceAmount' }), name: 'priceAmount', rules: [{ required: true, message: intl.formatMessage({ id: 'pages.tipslist.inputMount', defaultMessage: 'place inputMount！' }) }] },
        ],
        operator: {
            get: getAllTips,
            add: addPrice,
            update: updatePriceById,
            delete: deletePriceById
        }
    }

    return <ListCommon {...listProps} />

}