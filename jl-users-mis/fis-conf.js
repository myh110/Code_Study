var deployConfig = {
    qa: 'fe-test-qa'
}


// 服务器接收文件配置
var RECEIVER = 'http://115.182.215.159/receiver.php'
// const TARGET_PATH = '/home/work/spw/app/fence/'
///home/work/spw/app/solitaire-up/fe-test-qa/webroot
const TARGET_PATH = '/home/work/spw/app/solitaire-up/'
const FILE_NAME = "";
/********************************** 目录规范及发布配置 **********************************/

// 调试配置
for (var i in deployConfig) {
    let pushConfig = {
        receiver: RECEIVER,
        to: TARGET_PATH + deployConfig[i] + '/webroot'
    };

    fis.media(i)
        .match('/dist/(**).(**)', {
            useHash: false,
            isMod: false,
            release: `/$1`,
            deploy: [
                fis.plugin('http-push', pushConfig)
            ]
        })
}


// fis.match('/dist/(**).(**)', {
//     useHash: false,
//     isMod: false,
//     release: `/$1`,
//     deploy: fis.plugin('http-push', {
//         receiver: 'http://59.110.221.150/receiver',
//         to: '/data/ma/test_fis3' // 注意这个是指的是测试机器的路径，而非本地机器
//     })
// })
