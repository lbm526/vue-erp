const db = require('./model')
const pay = require('../pay/modal')
require('../../js/Date/Udate.js')

module.exports = router => {
    // 查询收入列表
    router.get('/api/incomeAndPay/incomeList', (req, res) => {
        // 删除空指针的字段
        // 进行多条件查询
        let data = JSON.parse(JSON.stringify(req.query))
        let opt = {}
        for (let key in data) {
            if (data[key] !== '') {
                opt[key] = data[key]
            }
        }
        db.Income.find(opt).then((list) => {
            let result = JSON.parse(JSON.stringify(list))
            res.json({
                msg: '',
                success: true,
                result: result
            })
        })
    })

    // 查询今年收入列表
    router.get('/api/incomeAndPay/incomeList_year', (req, res) => {
        // 删除空指针的字段
        // 进行多条件查询
        const year = new Date().getFullYear().toString();
        // 第二个对象参数过滤不需要字段，1为显示
        db.Income.find({year,companyId:req.query.companyId},{
            "money": 1,
            "year": 1,
            "month": 1,
            "companyId": 1,
        }).sort({'month': 1}).then((list) => {
            let result = JSON.parse(JSON.stringify(list))
            // 将相同月的数据相加
            for(let i = 0; i < result.length-1; i++){
                for(let j =0; j<result.length-1-i; j++){
                    if(result[j].month == result[j+1].month){
                        result[j].money += result[j+1].money;
                        result.splice(j+1,1);
                    }
                }
            }
            res.json({
                msg: '',
                success: true,
                result: result
            })
        })
    })
    //   根据id查询收入信息
    router.get('/api/incomeAndPay/incomeGetById', (req, res) => {
        const data = req.query
        db.Income.findOne({
            _id: data._id
        }).then(item => {
            res.json({
                msg: '',
                success: true,
                result: item
            })
        })
    })
    //   新增收入明细
    router.post('/api/incomeAndPay/addIncome', (req, res) => {
        let data = req.body
        let year = new Date(data.paymentTime).getFullYear()
        let getMonth = new Date(data.paymentTime).getMonth() + 1
        let getDay = new Date(data.paymentTime).Format('yyyy-MM-dd')
        let day = getDay < 10 ? '0' + getDay : getDay
        let month = getMonth < 10 ? '0' + getMonth : getMonth
        const opt = {
            name: data.name,
            money: data.money,
            price: data.price,
            number: data.number,
            customer: data.customer,
            tell: data.tell,
            address: data.address,
            projectPerson: data.projectPerson,
            paymentTime: data.paymentTime,
            mark: data.mark,
            year: year,
            month: month,
            day: day,
            companyId: data.companyId
        }
        db.Income(opt).save(err => {
            if (err) throw err
            res.json({
                msg: '',
                success: true
            })
        })
    })
    //   编辑收入
    router.post('/api/incomeAndPay/editIncome', (req, res) => {
        const data = req.body
        db.Income.updateOne({
            _id: data._id
        }, {
            $set: {
                name: data.name,
                money: data.money,
                price: data.price,
                number: data.number,
                customer: data.customer,
                tell: data.tell,
                address: data.address,
                projectPerson: data.projectPerson,
                paymentTime: data.paymentTime,
                mark: data.mark
            }
        }, (err) => {
            if (err) {
                res.status(500).send()
                return
            }
            res.json({
                msg: '',
                success: true
            })
        })
    })
    //   删除收入明细
    router.post('/api/incomeAndPay/deleteIncome', (req, res) => {
        db.Income.findOneAndRemove({
            _id: req.body._id
        }, (err, tank) => {
            if (err) {
                res.status(500).send({
                    msg: '删除失败',
                    success: false
                })
                return false
            }
            res.json({
                msg: '',
                success: true
            })
        })
    })

    /**
     * 收入名称集合
     */
    router.get('/api/incomeAndPay/materialNameList', (req, res) => {
        db.Income.find({
            companyId: req.query.companyId
        }).then(list => {
            if (!list) {
                res.json({
                    msg: '',
                    success: true,
                    result: []
                })
                return false
            }
            let data = JSON.parse(JSON.stringify(list))
            let result = []
            for (let i = 0; i < data.length; i++) {
                let opt = {}
                for (let key in data[i]) {
                    if (key === 'name') {
                        opt[key] = data[i][key]
                        opt['_id'] = data[i]['_id']
                        result.push(opt)
                    }
                }
            }
            res.json({
                msg: '',
                success: true,
                result
            })
        })
    })
    /**
     * 首页资金汇总
     */
    router.get('/api/incomeAndPay/money', (req, res) => {
        db.Income.find({
            companyId: req.query.companyId
        }).then(list => {
            if (!list) {
                res.json({
                    msg: '',
                    success: true
                })
                return false
            }
            let totalIncome = 0
            let totalOutput = 0
            let opt = {}
            for (let i = 0; i < list.length; i++) {
                totalIncome = list[i].money + totalIncome
            }
            pay.PayModal.find({ companyId: req.query.companyId }).then(payList => {
                if (!payList) {
                    opt['totalIncome'] = totalIncome
                    opt['totalOutput'] = 0
                    opt['profit'] = totalIncome - totalOutput
                    res.json({
                        msg: '',
                        success: true,
                        result: opt
                    })
                    return false
                }
                for (let i = 0; i < payList.length; i++) {
                    totalOutput = payList[i].money + totalOutput
                }
                opt['totalIncome'] = totalIncome
                opt['totalOutput'] = totalOutput
                opt['profit'] = totalIncome - totalOutput
                res.json({
                    msg: '',
                    success: true,
                    result: opt
                })
            })
        })
    })
}