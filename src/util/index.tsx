/**
 * 商品列表也数据转换
 * @param classArr 
 * @param allArr 
 * @param findId 
 * @param findName 
 * @returns 
 */
export const filterData = (classArr: any[] = [], allArr: any[] = [], findId: string, findName: string) => {
    const newArr: string[] = []
    classArr.forEach(ele => {
        if (ele !== '') {
            const list = allArr.find(item => {
                return item[findId] == ele
            })
            list && newArr.push(list[findName])
        }
    })
    return newArr
}

export const compileGoodsData = (data: any[] = [], classes: any[] = [], labels: any[] = [], prices: any[] = []) => {
    data.forEach(ele => {
        // 分类名称数组
        const cls = ele.classId.split(',')
        ele.classShowArr = filterData(cls, classes, 'classId', 'className')
        // 标签名称数组
        const lab = ele.labelId.split(',')
        ele.labelShowArr = filterData(lab, labels, 'labelId', 'labelName')
        // 小费
        const tipId = ele.tipId
        const tip = prices.find(item => item.tipId === tipId)
        ele.tipsShow = tip ? { priceName: tip.priceName, priceAmount: tip.priceAmount } : null
    })
}

export const goodsItemInitValue = {
    classId: "",
    createTime: "",
    describe: "",
    goodId: null,
    goodsName: "",
    imgId: "",
    labelId: "",
    price: null,
    serialNumber: "",
    thumbId: "",
    tipId: null,
    title: "",
    updateTime: "",
    classShowArr: [],
    labelShowArr: [],
    tipsShow: null
}

/**
 * 
 * @param arr 菜单列表
 * @returns 
 */
export const menuListToTree = (arr: any[]): any[] => {
    function loop(parentId: number) {
        let res = []
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            item.icon = <span style={{ opacity: 0.5, backgroundColor: '#e1e1e1' }}>[{item.menuId}]</span>
            if (item.pid !== parentId) {
                continue
            }
            item.children = loop(item.menuId)
            res.push(item)
        }
        return res
    }
    return loop(0)
}

export const MenuItemInitValue = {
    classIds: [],
    description: "",
    menuId: null,
    name: "",
    pid: null,
    status: 0,
    url: ""
}
