// 确定文献数量和每次下载的文献数量
const total = 1136;
const perBatch = 200;

// 计算需要循环的次数
const loops = Math.ceil(total / perBatch);

// 当前的循环计数
let currentLoop = 0;

// 定义核心循环函数
function runLoop() {
    // 当前循环计数大于等于总循环次数时，清除定时器
    if(currentLoop >= loops) {
        clearInterval(timer);
        return;
    }

    // 记录开始等待的时间
    const startTime = new Date().getTime();

    // 计算当前循环的文献范围并设置到input.cmRecords中
    const start = currentLoop * perBatch + 1;
    const end = Math.min((currentLoop + 1) * perBatch, total);
    document.querySelector('input.cmRecords').value = `${start}-${end}`;
    
    // 单击'input.action-export'，进行导出操作
    document.querySelector('input.action-export').click();

    // 等待5秒后单击'button.wk-button.export-button.wk-button-icon-left'
    setTimeout(() => {
        document.querySelector('button.wk-button.export-button.wk-button-icon-left').click();
    }, 5000); // 5秒后执行

    // 设置一个定时器来定时检测header.wk-smoke-break-header的状态
    const downloadCheckTimer = setInterval(() => {
        const smokeBreakHeader = document.querySelector('header.wk-smoke-break-header');
        
        // 如果smokeBreakHeader不存在或者不可见，表示下载已完成，清除定时器
        if (!smokeBreakHeader || window.getComputedStyle(smokeBreakHeader).display === 'none') {
            clearInterval(downloadCheckTimer);

            // 记录等待时间
            const waitTime = new Date().getTime() - startTime;
            console.log(`等待时间：${waitTime} 毫秒，${start}-${end}`);

            // 计数加一，准备下一轮操作
            currentLoop++;

            // 递归调用runLoop函数，启动下一轮循环
            runLoop();
        }
    }, 500); // 每半秒检查一次
}

// 在初始时启动第一轮循环
runLoop();
