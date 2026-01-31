// 法影剧场功能
const comicData = [
    {
        id: 1,
        title: '借钱不写欠条，怎么办？',
        category: 'contract',
        desc: '小王借给朋友5万元，没有写欠条，朋友不认账了...',
        emoji: '💰',
        views: 1234,
        likes: 89,
        points: 10
    },
    {
        id: 2,
        title: '被公司违法辞退',
        category: 'labor',
        desc: '小李突然收到公司辞退通知，没有任何补偿...',
        emoji: '💼',
        views: 2345,
        likes: 156,
        points: 10
    },
    {
        id: 3,
        title: '租房遇到黑中介',
        category: 'property',
        desc: '小张租的房子突然被要求搬走，押金也不退...',
        emoji: '🏠',
        views: 1890,
        likes: 134,
        points: 10
    },
    {
        id: 4,
        title: '网购商品有质量问题',
        category: 'consumer',
        desc: '小刘买的手机用了三天就坏了，商家拒绝退货...',
        emoji: '📱',
        views: 3456,
        likes: 234,
        points: 10
    },
    {
        id: 5,
        title: '女寝矛盾升级',
        category: 'property',
        desc: '大学宿舍里的矛盾如何通过法律途径解决...',
        emoji: '👭',
        views: 5678,
        likes: 456,
        points: 10
    },
    {
        id: 6,
        title: '遭遇暴力裁员',
        category: 'labor',
        desc: '公司以各种理由逼迫员工主动离职...',
        emoji: '⚡',
        views: 4321,
        likes: 345,
        points: 10
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderComics();
    
    // 筛选按钮事件
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderComics();
        });
    });
});

function renderComics() {
    const comicGrid = document.getElementById('comicGrid');
    if (!comicGrid) return;

    const filteredComics = currentFilter === 'all' 
        ? comicData 
        : comicData.filter(comic => comic.category === currentFilter);

    comicGrid.innerHTML = filteredComics.map(comic => `
        <div class="comic-card" data-id="${comic.id}">
            <div class="comic-image">
                ${comic.emoji}
                <span class="comic-badge">${getCategoryName(comic.category)}</span>
            </div>
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <p class="comic-desc">${comic.desc}</p>
                <div class="comic-meta">
                    <div class="comic-stats">
                        <span>👁️ ${comic.views}</span>
                        <span>❤️ ${comic.likes}</span>
                    </div>
                    <span class="points-badge">+${comic.points}法力值</span>
                </div>
            </div>
        </div>
    `).join('');

    // 添加点击事件
    comicGrid.querySelectorAll('.comic-card').forEach(card => {
        card.addEventListener('click', function() {
            const comicId = parseInt(this.getAttribute('data-id'));
            openComic(comicId);
        });
    });
}

function getCategoryName(category) {
    const names = {
        'contract': '合同纠纷',
        'labor': '劳动争议',
        'property': '财产纠纷',
        'consumer': '消费维权'
    };
    return names[category] || '其他';
}

function openComic(comicId) {
    const comic = comicData.find(c => c.id === comicId);
    if (!comic) return;

    // 增加阅读量
    comic.views++;
    
    // 奖励法力值
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + comic.points);
    updatePointsDisplay();

    // 记录已读漫画
    const comicsRead = parseInt(localStorage.getItem('comicsRead') || '0');
    localStorage.setItem('comicsRead', comicsRead + 1);
    updateProfileStats();

    // 显示漫画详情（这里可以扩展为完整的漫画阅读页面）
    alert(`正在打开：${comic.title}\n\n获得 ${comic.points} 法力值！\n\n（实际项目中这里会显示完整的漫画内容）`);
    
    // 重新渲染以更新阅读量
    renderComics();
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
}

function updateProfileStats() {
    const comicsReadElement = document.getElementById('comicsRead');
    if (comicsReadElement) {
        comicsReadElement.textContent = localStorage.getItem('comicsRead') || '0';
    }
}
