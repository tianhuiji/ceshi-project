module.exports = {
    api: "/bestbuy-app-server-cloud-server/api/v1/bill/detail",
    response: function(req, res) {
        res.json({
            code: "00000",
            message: "操作成功",
            value: {
                phase: 12,
                contractNo: "HM1815414948201098633145",
                totalAmount: 3000.06, //当月应还金额
                orderId: 21193,
                periodNum: 12,
                termNum: 8500.0, //分期总金额
                applyTime: "2017-05-15",
                orderStates: 3,
                serverPrice: 57.8,
                principal: 944.45,
                accountBalance: 100, //账户余额
                busiName: "测试商户名称",
                capitalType: 1, //1保理；2P2P
                productName: "测试商品名称",
                customerName: "颜思思",
                visible: true,
                contractStatus: 3, //1待放款 2放款中 3放款成功 4放款失败 5无效放款
                fundProviderCode: "FR_WZCB", //使用的资金方,ONLINE_IQIANJIN：爱钱进,FACTORING：保理, BAI_RONG：百融, FR_WZCB：温州银行
                billPeriodDetailDtos: [
                    {
                        dueDate: "2017-01-15",
                        phase: 1,
                        periodPrice: 1002.25,
                        repayplanStatus: "REFUND_REPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-02-15",
                        phase: 2,
                        periodPrice: 1002.25,
                        repayplanStatus: "UNREPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-03-15",
                        phase: 3,
                        periodPrice: 1002.25,
                        repayplanStatus: "REFUND_REPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: true
                    },
                    {
                        dueDate: "2017-04-15",
                        phase: 4,
                        periodPrice: 1002.25,
                        repayplanStatus: "NORMAL_REPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-05-15",
                        phase: 5,
                        periodPrice: 1002.25,
                        repayplanStatus: "OVERDUE_REPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-06-15",
                        phase: 6,
                        periodPrice: 1002.25,
                        repayplanStatus: "OVERDUE_REDUCE_REPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-07-15",
                        phase: 7,
                        periodPrice: 1002.25,
                        repayplanStatus: "OVERDUE",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-08-15",
                        phase: 8,
                        periodPrice: 1002.25,
                        repayplanStatus: "UNREPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-08-15",
                        phase: 9,
                        periodPrice: 1002.25,
                        repayplanStatus: "NORMAL_REPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: true
                    },
                    {
                        dueDate: "2017-08-15",
                        phase: 10,
                        periodPrice: 1002.25,
                        repayplanStatus: "UNREPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-08-15",
                        phase: 11,
                        periodPrice: 1002.25,
                        repayplanStatus: "UNREPAID",
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    },
                    {
                        dueDate: "2017-08-15",
                        phase: 12,
                        periodPrice: 1002.25,
                        repayplanStatus: "NORMAL_REPAID", // UNREPAID
                        totalAmount: 8615.6,
                        factoringPrincipal: 8500.0,
                        phaseServiceFee: 57.8,
                        penaltyFee: 0,
                        overdueFee: 0,
                        finalPrepayRepayServiceFee: 57.8,
                        repayTotalAmount: 8615.6,
                        prepay: false
                    }
                ]
            },
            extraInfo: null
        });
    }
};