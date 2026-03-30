"auto";

//基础配置
var appName = "com.lynkco.customer";
var waitTime = 5000;
//启动APP
launch(appName);
toast("正在启动LynkCo...");
//等待APP启动
sleep(waitTime);

//============签到功能===================
//查找我的控件
var myTab = id("ly_tab_my").findOne(waitTime);
if (myTab) {
    //点击我的
    myTab.click();
    toast("正在进入我的页面...");
    sleep(waitTime);
} else {
    toast("未找到我的控件");
    exit();
}
// 点击自动签到
var checkinTab = textContains("签到").findOne(waitTime);
if (checkinTab) {
    var txt = checkinTab.text(); // 获取按钮文字
    // log("当前按钮文本：" + txt);
    if (txt.includes("已签到")) {
        toast("✅ 今日已签到");
    } else if (txt.includes("签到")) {
        toast("🎁 未签到，准备点击");
        sleep(waitTime);
        //点击我的
        checkinTab.click();
        toast("正在执行签到...");
        sleep(waitTime);
        toast("✅ 已执行签到");
        back();
    } else {
        toast("⚠️ 未识别状态：" + txt);
        exit();
    }
} else {
    toast("❌ 未找到签到按钮");
    exit();
}

//============分享功能===================
//查找探索控件
var exploreTab = id("ly_tab_explore").findOne(waitTime);
if (exploreTab) {
    //点击探索
    exploreTab.click();
    toast("正在进入探索页面...");
    sleep(waitTime);
}
var contentTab = id("tv_content").findOne(waitTime);
if (!contentTab) {
    toast("未找到文章标题控件");
    exit();
} else {
    var b = contentTab.bounds();
    click(b.centerX(), b.centerY());
    toast("✅ 坐标点击成功");
    sleep(waitTime);
}

var x = device.width * 0.88; // 959 / 1080 ≈ 0.88
var y = device.height * 0.92; // 2173 / 2340 ≈ 0.92
click(x, y);
toast("📤 点击分享按钮");
sleep(waitTime);

var wechatTab = className("android.view.View").desc("微信好友").findOne(5000);

function findWechatTab() {
    if (wechatTab) {
        toast("✅ 找到微信好友按钮");
        var b = wechatTab.bounds();
        click(b.centerX(), b.centerY());
        toast("✅ 微信好友按钮点击成功");
        sleep(waitTime);
    } else {
        if (id("praise_close").findOne(waitTime)) {
            id("praise_close").findOne(waitTime).click();
            toast("⚠️ 关闭点赞弹窗");
            sleep(waitTime);
            findWechatTab(); // 递归调用继续寻找微信好友按钮
        }
    }
}
findWechatTab();
var shareYes = id("share_permission_yes").findOne(5000);
if (shareYes) {
    toast("✅ 找到允许按钮");
    shareYes.click();
    toast("✅ 点击允许分享");
    sleep(waitTime);
}

var x = device.width * 0.30; // 322 / 1080 ≈ 0.30
var y = device.height * 0.43; // 1040 / 2400 ≈ 0.43

click(x, y);

log("✅ 点击微信好友（比例）");
sleep(3000);

function share() {
    var x = device.width * 0.66; // 709 / 1080 ≈ 0.66
    var y = device.height * 0.86; // 2057 / 2400 ≈ 0.86

    click(x, y);

    log("📤 点击发送（比例坐标）");
    sleep(2000);
}
share();
home();
exit();