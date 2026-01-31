// 志愿者页面功能
document.addEventListener('DOMContentLoaded', function() {
    const certificationForm = document.getElementById('certificationForm');
    const unverifiedContent = document.getElementById('unverifiedContent');
    const verifiedContent = document.getElementById('verifiedContent');
    
    // 检查认证状态
    checkCertificationStatus();
    
    // 表单提交
    if (certificationForm) {
        certificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCertificationSubmit();
        });
    }
    
    // 下载证书
    const downloadCertBtn = document.getElementById('downloadCertBtn');
    if (downloadCertBtn) {
        downloadCertBtn.addEventListener('click', function() {
            downloadCertificate();
        });
    }
});

function checkCertificationStatus() {
    const volunteerData = JSON.parse(localStorage.getItem('volunteerData') || 'null');
    
    if (volunteerData && volunteerData.certified) {
        showVerifiedContent(volunteerData);
    } else {
        showUnverifiedContent();
    }
}

function showUnverifiedContent() {
    const unverifiedContent = document.getElementById('unverifiedContent');
    const verifiedContent = document.getElementById('verifiedContent');
    
    if (unverifiedContent) unverifiedContent.style.display = 'block';
    if (verifiedContent) verifiedContent.style.display = 'none';
}

function showVerifiedContent(volunteerData) {
    const unverifiedContent = document.getElementById('unverifiedContent');
    const verifiedContent = document.getElementById('verifiedContent');
    
    if (unverifiedContent) unverifiedContent.style.display = 'none';
    if (verifiedContent) verifiedContent.style.display = 'block';
    
    // 更新志愿者信息
    const volunteerName = document.getElementById('volunteerName');
    if (volunteerName && volunteerData.name) {
        volunteerName.textContent = volunteerData.name;
    }
    
    // 更新统计数据
    updateVolunteerStats(volunteerData);
    
    // 加载任务列表
    loadTasks();
}

function handleCertificationSubmit() {
    const form = document.getElementById('certificationForm');
    const formData = new FormData(form);
    
    // 验证表单
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // 收集表单数据
    const volunteerData = {
        name: formData.get('name'),
        school: formData.get('school'),
        major: formData.get('major'),
        grade: formData.get('grade'),
        studentId: formData.get('studentId'),
        idCard: formData.get('idCard'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        certified: true,
        certifiedDate: new Date().toISOString(),
        tasksCompleted: 0,
        serviceHours: 0,
        rating: 0
    };
    
    // 保存到本地存储
    localStorage.setItem('volunteerData', JSON.stringify(volunteerData));
    
    // 显示成功消息
    alert('认证申请已提交！审核通过后，您将可以开始接受任务。\n\n（演示版本：已自动通过认证）');
    
    // 切换到已认证界面
    showVerifiedContent(volunteerData);
}

function updateVolunteerStats(volunteerData) {
    const tasksCompleted = document.getElementById('tasksCompleted');
    const serviceHours = document.getElementById('serviceHours');
    const rating = document.getElementById('rating');
    
    if (tasksCompleted) {
        tasksCompleted.textContent = volunteerData.tasksCompleted || 0;
    }
    if (serviceHours) {
        serviceHours.textContent = (volunteerData.serviceHours || 0).toFixed(1);
    }
    if (rating) {
        rating.textContent = volunteerData.rating ? volunteerData.rating.toFixed(1) : '0.0';
    }
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    // 模拟任务数据
    const tasks = [
        {
            id: 1,
            type: '文书审核',
            title: '审核起诉状：民间借贷纠纷',
            description: '需要审核用户提交的起诉状，检查格式和内容是否符合要求',
            points: 50,
            deadline: '2025-01-28'
        },
        {
            id: 2,
            type: '证据整理',
            title: '整理证据清单：劳动争议',
            description: '帮助用户整理和分类证据材料，制作证据清单',
            points: 30,
            deadline: '2025-01-29'
        },
        {
            id: 3,
            type: '法律咨询',
            title: '提供法律建议：合同纠纷',
            description: '为用户提供合同纠纷相关的法律建议和解决方案',
            points: 40,
            deadline: '2025-01-30'
        }
    ];
    
    taskList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-header">
                <span class="task-type">${task.type}</span>
                <span class="task-points">+${task.points}积分</span>
            </div>
            <h4 class="task-title">${task.title}</h4>
            <p class="task-desc">${task.description}</p>
            <div class="task-footer">
                <span class="task-deadline">截止日期：${task.deadline}</span>
                <button class="btn-primary btn-sm" onclick="acceptTask(${task.id})">接受任务</button>
            </div>
        </div>
    `).join('');
}

function acceptTask(taskId) {
    alert(`任务 #${taskId} 已接受！\n\n（演示版本：任务功能待完善）`);
    // 实际项目中这里会更新任务状态
}

function downloadCertificate() {
    const volunteerData = JSON.parse(localStorage.getItem('volunteerData') || 'null');
    
    if (!volunteerData || !volunteerData.certified) {
        alert('您尚未完成认证，无法下载证书');
        return;
    }
    
    alert(`正在生成证书...\n\n志愿者：${volunteerData.name}\n服务时长：${volunteerData.serviceHours || 0}小时\n\n（演示版本：证书下载功能待完善）`);
}

// 暴露函数到全局
window.acceptTask = acceptTask;
