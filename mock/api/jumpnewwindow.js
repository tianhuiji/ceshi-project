module.exports = {
    api: "/bestbuy-app-server-cloud-server/api/jumpnewwindow",
    response: function(req, res) {
        res.json({
            code: "00000",
            message: "操作成功",
            value: {
                "dealStatus": 1,
                "resultUrl": "http://www.baidu.com"
            },
            extraInfo: null
        });
    }
};