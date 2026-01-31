// 逻辑罗盘功能
const sampleDocuments = [
    {
        id: 1,
        title: '民间借贷纠纷案',
        caseNumber: '(2023)京0101民初1234号',
        content: `
            原告张三诉称：2022年1月，被告李四因资金周转需要，向原告借款10万元，
            约定2022年6月归还，但到期后被告拒不归还。原告多次催要无果，故诉至法院。
            
            被告李四辩称：确实收到10万元，但已通过其他方式归还，不应再承担还款责任。
            
            法院经审理认为：原告提供了转账凭证、聊天记录等证据，能够证明借贷关系成立。
            被告虽辩称已归还，但未能提供有效证据。故判决被告归还原告借款10万元及利息。
        `,
        analysis: {
            cause: '被告因资金周转需要向原告借款10万元',
            dispute: '被告是否已归还借款',
            judgeFocus: '借贷关系是否成立，是否有还款证据',
            result: '判决被告归还原告借款10万元及利息',
            enlightenment: '借贷应保留转账凭证和聊天记录，还款时也应保留证据'
        }
    },
    {
        id: 2,
        title: '劳动争议案',
        caseNumber: '(2023)京0101民初5678号',
        content: `
            原告王五诉称：2021年3月入职被告公司，2023年1月公司突然通知解除劳动合同，
            未支付经济补偿金。原告要求公司支付违法解除劳动合同赔偿金。
            
            被告公司辩称：原告工作表现不佳，公司有权解除合同，无需支付赔偿。
            
            法院经审理认为：公司未能提供充分证据证明原告存在严重违纪行为，
            解除合同程序不合法。判决公司支付违法解除劳动合同赔偿金8万元。
        `,
        analysis: {
            cause: '公司突然解除劳动合同，未支付经济补偿',
            dispute: '解除合同是否合法，是否需要支付赔偿',
            judgeFocus: '解除合同的理由是否充分，程序是否合法',
            result: '判决公司支付违法解除劳动合同赔偿金8万元',
            enlightenment: '用人单位解除合同需有充分理由和合法程序，否则需支付赔偿'
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('documentSearch');
    const compassDemo = document.getElementById('compassDemo');

    // 搜索功能
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // 显示示例案例
    showSampleCases();
});

function performSearch() {
    const searchInput = document.getElementById('documentSearch');
    const compassDemo = document.getElementById('compassDemo');
    
    if (!searchInput || !compassDemo) return;

    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        alert('请输入搜索关键词');
        return;
    }

    // 模拟搜索（实际项目中应该调用后端API）
    const foundDoc = sampleDocuments.find(doc => 
        doc.title.includes(keyword) || 
        doc.caseNumber.includes(keyword) ||
        doc.content.includes(keyword)
    );

    if (foundDoc) {
        renderDocumentAnalysis(foundDoc);
    } else {
        compassDemo.innerHTML = `
            <div class="demo-placeholder">
                <p>🔍 未找到相关案例</p>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--gray-500);">
                    请尝试搜索：民间借贷、劳动争议、租房纠纷等关键词
                </p>
            </div>
        `;
    }
}

function showSampleCases() {
    const compassDemo = document.getElementById('compassDemo');
    if (!compassDemo) return;

    compassDemo.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="margin-bottom: 1.5rem; color: var(--primary-blue);">示例案例</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                ${sampleDocuments.map(doc => `
                    <div class="sample-case-card" style="padding: 1.5rem; background: var(--white); border-radius: var(--radius-md); box-shadow: var(--shadow-md); cursor: pointer; transition: transform 0.3s;" data-id="${doc.id}">
                        <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">${doc.title}</h4>
                        <p style="font-size: 0.85rem; color: var(--gray-600);">${doc.caseNumber}</p>
                        <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--gray-700);">
                            ${doc.content.substring(0, 50)}...
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 添加点击事件
    compassDemo.querySelectorAll('.sample-case-card').forEach(card => {
        card.addEventListener('click', function() {
            const docId = parseInt(this.getAttribute('data-id'));
            const doc = sampleDocuments.find(d => d.id === docId);
            if (doc) {
                renderDocumentAnalysis(doc);
            }
        });
    });
}

function renderDocumentAnalysis(doc) {
    const compassDemo = document.getElementById('compassDemo');
    if (!compassDemo) return;

    compassDemo.innerHTML = `
        <div class="compass-analysis">
            <div class="compass-document">
                <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">${doc.title}</h3>
                <p style="color: var(--gray-600); font-size: 0.9rem; margin-bottom: 1rem;">${doc.caseNumber}</p>
                <div style="line-height: 1.8; color: var(--gray-700);">
                    ${doc.content.split('\n').map(line => `<p style="margin-bottom: 0.5rem;">${line.trim()}</p>`).join('')}
                </div>
            </div>
            <div class="compass-visualization">
                <h3 style="color: var(--primary-blue); margin-bottom: 1.5rem;">五维拆解</h3>
                <div class="dimension-item">
                    <div class="dimension-title">1️⃣ 起因</div>
                    <div class="dimension-content">${doc.analysis.cause}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">2️⃣ 争执点</div>
                    <div class="dimension-content">${doc.analysis.dispute}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">3️⃣ 法官看点</div>
                    <div class="dimension-content">${doc.analysis.judgeFocus}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">4️⃣ 判决结果</div>
                    <div class="dimension-content">${doc.analysis.result}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">5️⃣ 维权启示</div>
                    <div class="dimension-content">${doc.analysis.enlightenment}</div>
                </div>
            </div>
        </div>
        <div style="margin-top: 1.5rem; text-align: center;">
            <button class="btn-secondary" onclick="showSampleCases()">返回案例列表</button>
        </div>
    `;
}

// 将函数暴露到全局，以便HTML中调用
window.showSampleCases = showSampleCases;
