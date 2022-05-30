exports.handler = async (event, context) => {
const request = require('request')
const md5 = require('js-md5')
const appKey = '47E099053CA34317ADBFD2E5878DE894';
const appSecret = '8DD7D163E3CE4EA4AE30240A3C3C5371';
const courseId="rZoa63umLAu6fDOZfZV";
const timestamp = Date.now();
let param = {
    timestamp:timestamp,
    path:'/veln-auth/server/auth/customerLogin',
    version:'1.0.0',
    courseId:courseId,
    userId:'000',
    loginName:'grt',
    corp:'grt.com',
}
//排序
let newObj =  {};
Object.keys(param).sort().map(key=> {
    newObj[key]  =  param[key]
})
//拼接签名
const signStr = Object.keys(newObj).reduce(function(prev,cur){
        return `${prev}${cur}${newObj[cur]}`
},'')
//签名加密
const sign = md5(`${signStr}${appSecret}`).toUpperCase()
//发起请求
let res = await new Promise((resolve,reject)=>{
    request({
        url: 'https://kty.kttx.cn/open/veln-auth/server/auth/customerLogin',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
            'timestamp':timestamp,
            "appKey":appKey,
            "sign":sign,
            "version":"1.0.0"
        },
        body: {
            userId:'000',
            courseId:courseId,
            loginName:'grt',
            corp:'grt.com',
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body) 
        }else{
            reject()
        }
    });
})
//返回认证token
return res;
}