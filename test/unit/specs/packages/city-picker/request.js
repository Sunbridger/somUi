
export function getProvinceData () {
    return Promise.resolve([
        {
            code: '01075',
            dindex: 2147483647,
            enName: '安徽',
            level: 'province',
            name: '安徽',
            type: 'area',
            letter: 'A'
        },
        {
            code: '00001',
            dindex: 1,
            letter: 'B',
            enName: '北京',
            level: 'province',
            name: '北京',
            type: 'area'
        },
        {
            code: '00002',
            dindex: 1,
            letter: 'B',
            enName: '四川',
            level: 'province',
            name: '四川',
            type: 'area'
        },
        {
            code: '00003',
            dindex: 1,
            letter: 'B',
            enName: '浙江',
            level: 'province',
            name: '浙江',
            type: 'area'
        },
        {
            code: '00004',
            dindex: 1,
            letter: 'B',
            enName: '重庆',
            level: 'province',
            name: '重庆',
            type: 'area'
        }
    ]);

}


export function getCityDataUrl () {
    return Promise.resolve([
        {
            code: '01130',
            dindex: 2147483647,
            enName: '黄山',
            id: '8fd3e967-92a9-4209-9c37-c864557d6ba2',
            level: 'city',
            name: '黄山',
            type: 'area'
        },
        {
            code: '01132',
            dindex: 214647,
            level: 'city',
            name: '杭州',
            type: 'area'
        },
        {
            code: '01175',
            dindex: 2147483647,
            enName: '亳州',
            level: 'city',
            name: '亳州',
            type: 'area'
        },
        {
            code: '01180',
            dindex: 2147483647,
            enName: '池州',
            level: 'city',
            name: '池州'
        },
        {
            code: '02273',
            dindex: 1,
            enName: '成都',
            level: 'city',
            name: '成都',
            type: 'area'
        }
    ]);

}

export function getDistrictDataUrl () {
    return Promise.resolve([
        {
            code: '340304',
            level: 'region',
            name: '禹会区',
            type: 'area'

        },
        {
            code: '340301',
            level: 'region',
            name: '市辖区',
            type: 'area'
        },
        {
            code: '340303',
            level: 'region',
            name: '蚌山区',
            type: 'area'
        },
        {
            code: '340302',
            level: 'region',
            name: '龙子湖区',
            type: 'area'
        },
        {
            code: '340322',
            level: 'region',
            name: '五河县',
            type: 'area'
        }
    ]);

}
