// 用户相关功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化用户数据
    initializeUserData();
    
    // 更新显示
    updateAllDisplays();
    
    // 每日签到
    const checkInBtn = document.getElementById('checkInBtn');
    if (checkInBtn) {
        checkInBtn.addEventListener('click', handleCheckIn);
    }

    // 志愿者认证按钮
    const volunteerBtn = document.getElementById('volunteerBtn');
    if (volunteerBtn) {
        volunteerBtn.addEventListener('click', function() {
            const volunteerModal = document.getElementById('volunteerModal');
            if (volunteerModal) {
                volunteerModal.style.display = 'block';
            }
        });
    }

    // 志愿者认证表单
    const certificationForm = document.getElementById('certificationForm');
    if (certificationForm) {
        certificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCertificationSubmit();
        });
    }

    // 检查志愿者认证状态
    checkVolunteerStatus();

    // 积分兑换按钮
    const openExchangeBtn = document.getElementById('openExchangeBtn');
    if (openExchangeBtn) {
        openExchangeBtn.addEventListener('click', openPointsExchangeModal);
    }

    // 创建积分兑换弹窗（若不存在）
    ensureExchangeModal();
});

function initializeUserData() {
    // 初始化本地存储数据
    if (!localStorage.getItem('userPoints')) {
        localStorage.setItem('userPoints', '0');
    }
    if (!localStorage.getItem('comicsRead')) {
        localStorage.setItem('comicsRead', '0');
    }
    if (!localStorage.getItem('simulationsDone')) {
        localStorage.setItem('simulationsDone', '0');
    }
    if (!localStorage.getItem('lastCheckIn')) {
        localStorage.setItem('lastCheckIn', '');
    }
    if (!localStorage.getItem('hasUsedFreeQA')) {
        localStorage.setItem('hasUsedFreeQA', 'false');
    }
    if (!localStorage.getItem('discountCoupons')) {
        localStorage.setItem('discountCoupons', JSON.stringify({ discount80: 0, discount70: 0 }));
    }
}

function updateAllDisplays() {
    updatePointsDisplay();
    updateProfileStats();
    checkVolunteerStatus();
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
}

function updateProfileStats() {
    const totalPointsElement = document.getElementById('totalPoints');
    const comicsReadElement = document.getElementById('comicsRead');
    const simulationsDoneElement = document.getElementById('simulationsDone');
    
    if (totalPointsElement) {
        totalPointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
    if (comicsReadElement) {
        comicsReadElement.textContent = localStorage.getItem('comicsRead') || '0';
    }
    if (simulationsDoneElement) {
        simulationsDoneElement.textContent = localStorage.getItem('simulationsDone') || '0';
    }
}

function handleCheckIn() {
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    
    if (lastCheckIn === today) {
        alert('您今天已经签到过了！');
        return;
    }
    
    // 签到奖励
    const checkInPoints = 15;
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + checkInPoints);
    localStorage.setItem('lastCheckIn', today);
    
    updateAllDisplays();
    alert(`签到成功！获得 ${checkInPoints} 法力值！`);
}

function checkVolunteerStatus() {
    const volunteerData = JSON.parse(localStorage.getItem('volunteerData') || 'null');
    const volunteerStatus = document.getElementById('volunteerStatus');
    const volunteerBtn = document.getElementById('volunteerBtn');
    
    if (volunteerData && volunteerData.certified) {
        if (volunteerStatus) {
            volunteerStatus.innerHTML = `
                <div class="volunteer-badge">
                    <span class="badge-icon">✅</span>
                    <span>已认证志愿者</span>
                </div>
                <div class="volunteer-info">
                    <p><strong>姓名：</strong>${volunteerData.name}</p>
                    <p><strong>学校：</strong>${volunteerData.school}</p>
                    <p><strong>已完成任务：</strong>${volunteerData.tasksCompleted || 0} 个</p>
                    <p><strong>服务时长：</strong>${volunteerData.serviceHours || 0} 小时</p>
                </div>
            `;
        }
        if (volunteerBtn) {
            volunteerBtn.textContent = '查看志愿者工作台';
            volunteerBtn.onclick = function() {
                showVolunteerDashboard(volunteerData);
            };
        }
    } else {
        if (volunteerStatus) {
            volunteerStatus.innerHTML = '<p style="color: var(--gray-600);">尚未认证志愿者</p>';
        }
        if (volunteerBtn) {
            volunteerBtn.textContent = '申请志愿者认证';
        }
    }
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
    
    // 关闭模态框
    const volunteerModal = document.getElementById('volunteerModal');
    if (volunteerModal) {
        volunteerModal.style.display = 'none';
    }
    form.reset();
    
    // 更新显示
    updateAllDisplays();
    
    // 显示成功消息
    alert('认证申请已提交！审核通过后，您将可以开始接受任务。\n\n（演示版本：已自动通过认证）');
}

function showVolunteerDashboard(volunteerData) {
    const modal = document.getElementById('volunteerModal');
    const content = document.getElementById('volunteerModalContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <h2>志愿者工作台</h2>
        <div class="volunteer-dashboard">
            <div class="volunteer-stats">
                <div class="stat-card">
                    <div class="stat-value">${volunteerData.tasksCompleted || 0}</div>
                    <div class="stat-label">已完成任务</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${(volunteerData.serviceHours || 0).toFixed(1)}</div>
                    <div class="stat-label">服务时长（小时）</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${volunteerData.rating ? volunteerData.rating.toFixed(1) : '0.0'}</div>
                    <div class="stat-label">平均评分</div>
                </div>
            </div>
            <div class="task-list">
                <h3>待处理任务</h3>
                <div class="tasks-container">
                    <div class="task-item">
                        <div class="task-header">
                            <span class="task-type">文书审核</span>
                            <span class="task-points">+50积分</span>
                        </div>
                        <h4 class="task-title">审核起诉状：民间借贷纠纷</h4>
                        <p class="task-desc">需要审核用户提交的起诉状，检查格式和内容是否符合要求</p>
                        <div class="task-footer">
                            <span class="task-deadline">截止日期：2025-01-28</span>
                            <button class="btn-primary btn-sm">接受任务</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="certificate-download">
                <h3>证书下载</h3>
                <p>您可以下载志愿服务时长证书</p>
                <button class="btn-primary" onclick="downloadCertificate()">下载证书</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function downloadCertificate() {
    const volunteerData = JSON.parse(localStorage.getItem('volunteerData') || 'null');
    
    if (!volunteerData || !volunteerData.certified) {
        alert('您尚未完成认证，无法下载证书');
        return;
    }
    
    alert(`正在生成证书...\n\n志愿者：${volunteerData.name}\n服务时长：${volunteerData.serviceHours || 0}小时\n\n（演示版本：证书下载功能待完善）`);
}

// ---------- 积分兑换 ----------
var EXCHANGE_FREE_QA_COST = 0;
var EXCHANGE_80_COST = 500;
var EXCHANGE_70_COST = 800;

function ensureExchangeModal() {
    if (document.getElementById('pointsExchangeModal')) return;
    var modal = document.createElement('div');
    modal.id = 'pointsExchangeModal';
    modal.className = 'modal';
    modal.innerHTML = [
        '<div class="modal-content points-exchange-content">',
        '  <span class="modal-close" data-close="exchange">&times;</span>',
        '  <h2>积分兑换 / 折扣券</h2>',
        '  <p class="exchange-current-points">当前法力值：<strong id="exchangePointsDisplay">0</strong></p>',
        '  <div class="exchange-section">',
        '    <h3>首次兑换</h3>',
        '    <div class="exchange-item exchange-free-qa" id="exchangeFreeQA">',
        '      <div class="exchange-info">',
        '        <span class="exchange-name">免费问答 1 次</span>',
        '        <span class="exchange-desc">仅限首次兑换，无需消耗法力值</span>',
        '      </div>',
        '      <button type="button" class="btn-primary btn-exchange" data-exchange="freeQA" id="btnExchangeFreeQA">立即兑换</button>',
        '      <p class="exchange-used" id="freeQAUsed" style="display:none;">您已使用首次免费问答</p>',
        '    </div>',
        '  </div>',
        '  <div class="exchange-section">',
        '    <h3>再次兑换（折扣券）</h3>',
        '    <p class="exchange-desc-block">首次之后仅可兑换折扣券</p>',
        '    <div class="exchange-item">',
        '      <div class="exchange-info">',
        '        <span class="exchange-name">8 折券</span>',
        '        <span class="exchange-cost">' + EXCHANGE_80_COST + ' 法力值</span>',
        '      </div>',
        '      <button type="button" class="btn-secondary btn-exchange" data-exchange="80" data-cost="' + EXCHANGE_80_COST + '">兑换</button>',
        '    </div>',
        '    <div class="exchange-item">',
        '      <div class="exchange-info">',
        '        <span class="exchange-name">7 折券</span>',
        '        <span class="exchange-cost">' + EXCHANGE_70_COST + ' 法力值</span>',
        '      </div>',
        '      <button type="button" class="btn-secondary btn-exchange" data-exchange="70" data-cost="' + EXCHANGE_70_COST + '">兑换</button>',
        '    </div>',
        '    <p class="exchange-coupons-summary" id="exchangeCouponsSummary"></p>',
        '  </div>',
        '</div>'
    ].join('');
    document.body.appendChild(modal);

    modal.querySelector('[data-close="exchange"]').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.style.display = 'none';
    });

    modal.querySelectorAll('.btn-exchange').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var type = this.getAttribute('data-exchange');
            var cost = parseInt(this.getAttribute('data-cost') || '0', 10);
            handleExchange(type, cost);
            renderExchangeModal();
            updateAllDisplays();
        });
    });
}

function openPointsExchangeModal() {
    var modal = document.getElementById('pointsExchangeModal');
    if (modal) {
        renderExchangeModal();
        modal.style.display = 'block';
    }
}

function renderExchangeModal() {
    var points = parseInt(localStorage.getItem('userPoints') || '0', 10);
    var hasUsedFreeQA = localStorage.getItem('hasUsedFreeQA') === 'true';
    var coupons = JSON.parse(localStorage.getItem('discountCoupons') || '{"discount80":0,"discount70":0}');

    var pointsEl = document.getElementById('exchangePointsDisplay');
    if (pointsEl) pointsEl.textContent = points;

    var freeQABlock = document.getElementById('exchangeFreeQA');
    var btnFreeQA = document.getElementById('btnExchangeFreeQA');
    var freeQAUsed = document.getElementById('freeQAUsed');
    if (freeQABlock && btnFreeQA && freeQAUsed) {
        if (hasUsedFreeQA) {
            btnFreeQA.style.display = 'none';
            freeQAUsed.style.display = 'block';
        } else {
            btnFreeQA.style.display = 'inline-block';
            freeQAUsed.style.display = 'none';
        }
    }

    var summary = document.getElementById('exchangeCouponsSummary');
    if (summary) {
        var parts = [];
        if (coupons.discount80 > 0) parts.push('8折券 x ' + coupons.discount80);
        if (coupons.discount70 > 0) parts.push('7折券 x ' + coupons.discount70);
        summary.textContent = parts.length ? '已拥有：' + parts.join('，') : '';
    }
}

function handleExchange(type, cost) {
    var points = parseInt(localStorage.getItem('userPoints') || '0', 10);
    var hasUsedFreeQA = localStorage.getItem('hasUsedFreeQA') === 'true';

    if (type === 'freeQA') {
        if (hasUsedFreeQA) {
            alert('您已使用过首次免费问答');
            return;
        }
        localStorage.setItem('hasUsedFreeQA', 'true');
        alert('兑换成功！您已获得 1 次免费问答服务，可在维权工具箱中使用。');
        return;
    }

    if (type === '80' || type === '70') {
        if (points < cost) {
            alert('法力值不足，当前需要 ' + cost + ' 法力值');
            return;
        }
        var coupons = JSON.parse(localStorage.getItem('discountCoupons') || '{"discount80":0,"discount70":0}');
        if (type === '80') {
            coupons.discount80 = (coupons.discount80 || 0) + 1;
        } else {
            coupons.discount70 = (coupons.discount70 || 0) + 1;
        }
        localStorage.setItem('discountCoupons', JSON.stringify(coupons));
        localStorage.setItem('userPoints', String(points - cost));
        alert('兑换成功！您已获得 ' + (type === '80' ? '8' : '7') + ' 折券 x 1');
    }
}

// 导出函数供其他脚本使用
window.updatePointsDisplay = updatePointsDisplay;
window.updateProfileStats = updateProfileStats;
window.openPointsExchangeModal = openPointsExchangeModal;
