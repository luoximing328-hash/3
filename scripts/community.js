// 法影社区功能
const samplePosts = [
    {
        id: 1,
        title: '劳动仲裁成功追回8万赔偿金，分享我的完整流程',
        category: 'labor',
        author: '张女士',
        content: `我在一家公司工作了3年，突然被公司以"工作表现不佳"为由辞退，没有支付任何补偿。经过法影随行平台的帮助，我成功追回了8万元赔偿金。

**我的维权流程：**

1. **收集证据**
   - 劳动合同、工资条、银行流水
   - 工作期间的聊天记录、邮件
   - 公司辞退通知的书面文件

2. **咨询平台**
   - 在法影随行平台咨询，获得了专业的法律建议
   - 平台帮我生成了劳动仲裁申请书

3. **申请仲裁**
   - 向当地劳动仲裁委员会提交申请
   - 等待开庭通知

4. **庭审过程**
   - 公司无法提供充分证据证明我"工作表现不佳"
   - 仲裁委认定公司违法解除合同

5. **获得赔偿**
   - 最终获得8万元赔偿金

**经验总结：**
- 一定要保留所有工作相关证据
- 遇到问题及时咨询专业平台
- 不要害怕走法律程序，要勇敢维权`,
        tags: ['劳动仲裁', '违法辞退', '证据收集', '胜诉经验'],
        views: 1234,
        likes: 89,
        comments: 23,
        featured: true,
        publishDate: '2025-01-20'
    },
    {
        id: 2,
        title: '民间借贷不写欠条也能胜诉？我的证据收集经验',
        category: 'contract',
        author: '李先生',
        content: `借给朋友10万元，没有写欠条，朋友不认账怎么办？我通过收集电子证据成功胜诉。

**关键证据：**
1. 微信聊天记录（提到借款和还款）
2. 银行转账凭证
3. 电话录音（确认借款事实）

**经验：**
即使没有书面欠条，电子证据同样有效！`,
        tags: ['民间借贷', '证据收集', '电子证据'],
        views: 856,
        likes: 67,
        comments: 15,
        featured: true,
        publishDate: '2025-01-18'
    },
    {
        id: 3,
        title: '网购商品质量问题，7天无理由退货成功案例',
        category: 'consumer',
        author: '王同学',
        content: `买的手机用了3天就坏了，商家拒绝退货。通过12315投诉和平台帮助，成功退货退款。

**流程：**
1. 保留购买凭证和商品照片
2. 向12315投诉
3. 商家最终同意退货

**提醒：**
网购一定要保留好凭证！`,
        tags: ['消费维权', '网购', '退货'],
        views: 567,
        likes: 45,
        comments: 12,
        featured: false,
        publishDate: '2025-01-15'
    },
    {
        id: 4,
        title: '租房押金被扣，如何通过法律途径要回',
        category: 'property',
        author: '刘先生',
        content: `租房到期，房东以各种理由扣留押金5000元。通过起诉成功要回。

**关键点：**
- 保留租房合同和押金转账记录
- 房屋交接时的照片和视频
- 通过法院起诉，最终胜诉`,
        tags: ['租房纠纷', '押金', '起诉'],
        views: 432,
        likes: 34,
        comments: 8,
        featured: false,
        publishDate: '2025-01-12'
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedPosts();
    renderAllPosts();
    
    // 发帖按钮
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostModal = document.getElementById('createPostModal');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const postForm = document.getElementById('postForm');
    
    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            if (createPostModal) {
                createPostModal.style.display = 'block';
            }
        });
    }
    
    if (cancelPostBtn) {
        cancelPostBtn.addEventListener('click', function() {
            if (createPostModal) {
                createPostModal.style.display = 'none';
                postForm.reset();
            }
        });
    }
    
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePostSubmit();
        });
    }
    
    // 筛选按钮
    const filterBtns = document.querySelectorAll('.posts-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderAllPosts();
        });
    });
});

function renderFeaturedPosts() {
    const featuredPosts = samplePosts.filter(post => post.featured);
    const container = document.getElementById('featuredPosts');
    if (!container) return;
    
    container.innerHTML = featuredPosts.map(post => `
        <div class="featured-post-card" data-id="${post.id}">
            <div class="featured-badge">⭐ 精选</div>
            <h4 class="post-title">${post.title}</h4>
            <div class="post-meta">
                <span class="post-author">👤 ${post.author}</span>
                <span class="post-date">📅 ${post.publishDate}</span>
            </div>
            <p class="post-excerpt">${post.content.substring(0, 150)}...</p>
            <div class="post-stats">
                <span>👁️ ${post.views}</span>
                <span>❤️ ${post.likes}</span>
                <span>💬 ${post.comments}</span>
            </div>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // 添加点击事件
    container.querySelectorAll('.featured-post-card').forEach(card => {
        card.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-id'));
            showPostDetail(postId);
        });
    });
}

function renderAllPosts() {
    const filteredPosts = currentFilter === 'all' 
        ? samplePosts.filter(p => !p.featured)
        : samplePosts.filter(p => !p.featured && p.category === currentFilter);
    
    const container = document.getElementById('postsList');
    if (!container) return;
    
    if (filteredPosts.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>暂无帖子</p></div>';
        return;
    }
    
    container.innerHTML = filteredPosts.map(post => `
        <div class="post-item" data-id="${post.id}">
            <div class="post-header">
                <h4 class="post-title">${post.title}</h4>
                <span class="post-category">${getCategoryName(post.category)}</span>
            </div>
            <div class="post-meta">
                <span class="post-author">👤 ${post.author}</span>
                <span class="post-date">📅 ${post.publishDate}</span>
            </div>
            <p class="post-excerpt">${post.content.substring(0, 200)}...</p>
            <div class="post-footer">
                <div class="post-stats">
                    <span>👁️ ${post.views}</span>
                    <span>❤️ ${post.likes}</span>
                    <span>💬 ${post.comments}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // 添加点击事件
    container.querySelectorAll('.post-item').forEach(item => {
        item.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-id'));
            showPostDetail(postId);
        });
    });
}

function getCategoryName(category) {
    const names = {
        'labor': '劳动争议',
        'contract': '合同纠纷',
        'consumer': '消费维权',
        'property': '财产纠纷',
        'other': '其他'
    };
    return names[category] || '其他';
}

function showPostDetail(postId) {
    const post = samplePosts.find(p => p.id === postId);
    if (!post) return;
    
    const modal = document.getElementById('postDetailModal');
    const content = document.getElementById('postDetailContent');
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="post-detail">
            <div class="post-detail-header">
                <h2>${post.title}</h2>
                <div class="post-detail-meta">
                    <span class="post-author">👤 ${post.author}</span>
                    <span class="post-date">📅 ${post.publishDate}</span>
                    <span class="post-category">${getCategoryName(post.category)}</span>
                </div>
            </div>
            <div class="post-detail-content">
                ${post.content.split('\n').map(line => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                        return `<h3>${line.replace(/\*\*/g, '')}</h3>`;
                    }
                    if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
                        return `<p style="margin-left: 1.5rem; margin-bottom: 0.5rem;">${line}</p>`;
                    }
                    return `<p>${line}</p>`;
                }).join('')}
            </div>
            <div class="post-detail-footer">
                <div class="post-stats">
                    <span>👁️ ${post.views}</span>
                    <span>❤️ ${post.likes}</span>
                    <span>💬 ${post.comments}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function handlePostSubmit() {
    const form = document.getElementById('postForm');
    const formData = new FormData(form);
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const newPost = {
        id: samplePosts.length + 1,
        title: formData.get('title'),
        category: formData.get('category'),
        author: '我',
        content: formData.get('content'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [],
        views: 0,
        likes: 0,
        comments: 0,
        featured: false,
        publishDate: new Date().toISOString().split('T')[0]
    };
    
    // 保存到本地存储（实际项目中应该保存到后端）
    samplePosts.unshift(newPost);
    
    // 关闭模态框
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.style.display = 'none';
    }
    form.reset();
    
    // 重新渲染
    renderAllPosts();
    
    // 奖励法力值
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + 20);
    updatePointsDisplay();
    
    alert('帖子发布成功！获得 20 法力值！');
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
}
