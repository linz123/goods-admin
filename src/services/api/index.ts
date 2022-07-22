// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { compileGoodsData } from '@/util';
/**
 * 登录  /admin/login
 * 退出  /admin/loginOut
 * @param body
 * @param options
 * @returns
 */
export async function login(body: any, options?: { [key: string]: any }) {
  return request('/admin/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

let classes: any[] = [],
  labels: any[] = [],
  prices: any[] = [];
/**
 * 商品列表
 * 获取  /admin/goodList
 * 更新  /admin/updateGoodById
 * 删除  /admin/deleteGoodById
 * 新增  /admin/addGood
 */
export async function goodsList(body: any, options?: { [key: string]: any }) {
  if (!classes.length) {
    const res = await Promise.all([getAllClasses(), getAllLabels(), getAllTips()]);
    const [{ data: classesData }, { data: labelsData }, { data: pricesData }] = res;
    classes = classesData;
    labels = labelsData;
    prices = pricesData;
  }
  return request<API.TableResult>('/admin/goodList', {
    method: 'POST',
    data: {
      ...body,
      pageNumber: body.current,
    },
    ...(options || {}),
  }).then((res) => {
    const { data } = res;
    compileGoodsData(data, classes, labels, prices);
    console.log(data);
    return {
      data: data.list,
      success: true, // success 请返回 true，不然 table 会停止解析数据，即使有数据
      total: data.total, // 不传会使用 data 的长度，如果是分页一定要传
    };
  });
}

export async function getGoodById(body: any, options?: { [key: string]: any }) {
  return request('/admin/getGoodById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateGoodById(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateGoodById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteGoodById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteGoodById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function addGood(body: any, options?: { [key: string]: any }) {
  return request('/admin/addGood', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getAllClasses() {
  return request('/admin/getAllClasses', {
    method: 'POST',
  });
}

export async function getAllLabels() {
  return request('/admin/getAllLabels', {
    method: 'POST',
  });
}

export async function deleteImgById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteImgById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/**
 * 分类列表
 * 获取  /admin/getClassesByPage
 * 更新  /admin/updateClassById
 * 删除  /admin/deleteClassById
 * 新增  /admin/addClass
 */
export async function classList(body: any, options?: { [key: string]: any }) {
  const { pageSize, current } = body;
  return request<API.TableResult>('/admin/getClassesByPage', {
    method: 'POST',
    data: {
      pageSize,
      pageNumber: current,
    },
    ...(options || {}),
  }).then((res) => {
    const { data } = res;
    return {
      data: data.pages,
      success: true, // success 请返回 true，不然 table 会停止解析数据，即使有数据
      total: data.total, // 不传会使用 data 的长度，如果是分页一定要传
    };
  });
}

export async function updateClassById(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateClassById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteClassById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteClassById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function addClass(body: any, options?: { [key: string]: any }) {
  return request('/admin/addClass', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/**
 * 标签列表
 * 获取  /admin/getLabelsByPage
 * 更新  /admin/updateLabelById
 * 删除  /admin/deleteLabelById
 * 新增  /admin/addLabel
 */
export async function labelList(body: any, options?: { [key: string]: any }) {
  const { pageSize, current } = body;
  return request<API.TableResult>('/admin/getLabelsByPage', {
    method: 'POST',
    data: {
      pageSize,
      pageNumber: current,
    },
    ...(options || {}),
  }).then((res) => {
    const { data } = res;
    return {
      data: data.pages,
      success: true, // success 请返回 true，不然 table 会停止解析数据，即使有数据
      total: data.total, // 不传会使用 data 的长度，如果是分页一定要传
    };
  });
}

export async function updateLabelById(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateLabelById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteLabelById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteLabelById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function addLabel(body: any, options?: { [key: string]: any }) {
  return request('/admin/addLabel', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/**
 * 小费列表
 * 获取  /admin/getAllTips
 * 更新  /admin/updateTipById
 * 删除  /admin/deleteTipById
 * 新增  /admin/addTip
 */
export async function getAllTips() {
  return request<API.TableResult>('/admin/getAllTips', {
    method: 'POST',
  });
}

export async function updatePriceById(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateTipById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deletePriceById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteTipById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function addPrice(body: any, options?: { [key: string]: any }) {
  return request('/admin/addTip', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getImagesByIds(body: any, options?: { [key: string]: any }) {
  return request('/admin/getImagesByIds', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/**
 * 推荐列表
 * 获取  /admin/getRecommendByType
 * 更新  /admin/updateRecommendById
 * 删除  /admin/deleteRecommendById
 * 新增  /admin/addRecommend
 */
export async function addRecommend(body: any, options?: { [key: string]: any }) {
  return request('/admin/addRecommend', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateRecommendById(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateRecommendById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteRecommendById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteRecommendById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getRecommendByType(body: any, options?: { [key: string]: any }) {
  return request('/admin/getRecommendByType', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then((res) => {
    if (res.code === 200 && res.data) {
      res.data.forEach((ele: any) => {
        Object.assign(ele, ele.good);
        delete ele.good;
      });
    }
    return res;
  });
}

/**
 * 列表
 * 获取  /admin/getMenuById
 * 获取  /admin/getTreeList
 * 获取  /admin/getMenuList
 * 更新  /admin/updateMenuById
 * 删除  /admin/deleteMenuById
 * 新增  /admin/addMenu
 */
export async function addMenu(body: any, options?: { [key: string]: any }) {
  return request('/admin/addMenu', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteMenuById(body: any, options?: { [key: string]: any }) {
  return request('/admin/deleteMenuById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateMenuById(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateMenuById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getMenuById(body: any, options?: { [key: string]: any }) {
  return request('/admin/getMenuById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getTreeList(options?: { [key: string]: any }) {
  return request('/admin/getTreeList', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function getMenuList(options?: { [key: string]: any }) {
  return request('/admin/getMenuList', {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 列表
 * 获取  /admin/getOrderById
 * 获取  /admin/getOrderListByPage
 * 获取  /admin/getOrderByStatus
 * 更新  /admin/updateOrder
 * 删除  /admin/deleteMenuById
 * 新增  /admin/addOrder
 */
export async function addOrder(body: any, options?: { [key: string]: any }) {
  return request('/admin/addOrder', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getOrderById(body: any, options?: { [key: string]: any }) {
  return request('/admin/getOrderById', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getOrderListByPage(body: any, options?: { [key: string]: any }) {
  return request('/admin/getOrderListByPage', {
    method: 'POST',
    data: {
      ...body,
      pageNumber: body.current,
    },
    ...(options || {}),
  }).then((res) => {
    if (res.code === 200) {
      res.data.forEach((item: any, index: number) => {
        item.key = index;
        // item.orderId = item.orders[0].bill.orderId
        // item.createTime = item.orders[0].bill.createTime
      });
    }
    return res;
  });
}

export async function updateOrder(body: any, options?: { [key: string]: any }) {
  return request('/admin/updateOrder', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getOrderByStatus(body: any, options?: { [key: string]: any }) {
  return request('/admin/getOrderByStatus', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
