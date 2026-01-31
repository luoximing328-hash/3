// 正义模拟器功能
const scenarios = [
    {
        id: 1,
        title: '女寝矛盾',
        desc: '室友长期占用公共空间，影响生活',
        icon: '👭',
        questions: [
            {
                question: '您是否有相关的聊天记录或照片证据？',
                options: [
                    { text: '有聊天记录', points: 20, correct: true },
                    { text: '有照片', points: 15, correct: true },
                    { text: '都没有', points: 0, correct: false }
                ]
            },
            {
                question: '您是否尝试过与室友协商解决？',
                options: [
                    { text: '多次协商无果', points: 20, correct: true },
                    { text: '协商过一次', points: 10, correct: false },
                    { text: '没有协商', points: 0, correct: false }
                ]
            }
        ]
    },
    {
        id: 2,
        title: '租房纠纷',
        desc: '房东突然要求提前解约，不退押金',
        icon: '🏠',
        questions: [
            {
                question: '您是否有租房合同？',
                options: [
                    { text: '有正式合同', points: 25, correct: true },
                    { text: '有口头协议', points: 10, correct: false },
                    { text: '没有合同', points: 0, correct: false }
                ]
            },
            {
                question: '您是否有押金转账记录？',
                options: [
                    { text: '有银行转账记录', points: 20, correct: true },
                    { text: '有微信/支付宝记录', points: 15, correct: true },
                    { text: '现金支付', points: 5, correct: false }
                ]
            }
        ]
    },
    {
        id: 3,
        title: '劳动仲裁',
        desc: '公司违法辞退，要求赔偿',
        icon: '💼',
        questions: [
            {
                question: '您是否有劳动合同？',
                options: [
                    { text: '有正式合同', points: 25, correct: true },
                    { text: '合同在公司', points: 15, correct: false },
                    { text: '没有合同', points: 0, correct: false }
                ]
            },
            {
                question: '您是否有工资条或银行流水？',
                options: [
                    { text: '都有', points: 25, correct: true },
                    { text: '只有一种', points: 15, correct: true },
                    { text: '都没有', points: 0, correct: false }
                ]
            }
        ]
    }
];

const cardQuestions = [
    {
        question: '遭遇暴力裁员，正确的维权步骤是？',
        options: [
            { text: '直接到法院起诉', correct: false },
            { text: '忍气吞声，自认倒霉', correct: false },
            { text: '收集证据 → 向劳动监察投诉/申请劳动仲裁 → 必要时起诉', correct: true },
            { text: '只在网上发帖曝光', correct: false }
        ],
        explanation: '应先收集证据（劳动合同、工资条、聊天记录、辞退通知等），向劳动监察部门投诉或申请劳动仲裁；对仲裁结果不服的，可在法定期限内向法院起诉。',
        points: 5
    },
    {
        question: '借钱没写欠条，只有聊天记录和转账记录，在法律上有效吗？',
        options: [
            { text: '无效，必须要有书面欠条', correct: false },
            { text: '有效，聊天记录、转账凭证等可作为证据', correct: true },
            { text: '只有转账记录有效', correct: false },
            { text: '必须公证才有效', correct: false }
        ],
        explanation: '口头借贷在法律上有效。根据《民法典》，当事人可以书面、口头或其他形式订立合同。聊天记录、转账凭证、证人等均可作为证据，建议尽量保留完整记录以保障权益。',
        points: 5
    },
    {
        question: '网购商品有质量问题，消费者有权在多少日内退货？',
        options: [
            { text: '3 日', correct: false },
            { text: '7 日', correct: true },
            { text: '15 日', correct: false },
            { text: '30 日', correct: false }
        ],
        explanation: '根据《消费者权益保护法》，经营者采用网络等方式销售商品，消费者有权自收到商品之日起七日内退货，且无需说明理由（法律另有规定或约定除外）。有质量问题的，更应保障退换货权利。',
        points: 5
    },
    {
        question: '房东无理由克扣押金不退，正确的做法是？',
        options: [
            { text: '与房东吵架或强行换锁', correct: false },
            { text: '先协商 → 协商不成可投诉或收集证据起诉', correct: true },
            { text: '押金不多就算了', correct: false },
            { text: '在网上曝光即可，不必走法律程序', correct: false }
        ],
        explanation: '建议先与房东协商并保留沟通记录；协商不成可向当地住建部门、12345 或消费者协会投诉；同时保留合同、转账记录、房屋交接证据等，必要时通过诉讼维护权益。',
        points: 5
    }
];

let currentScenario = null;
let currentQuestionIndex = 0;
let totalScore = 0;
let currentMode = null;

document.addEventListener('DOMContentLoaded', function() {
    // 所有模式卡片点击事件
    const modeCards = document.querySelectorAll('[data-mode]');
    modeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮，不阻止事件冒泡，让按钮处理
            if (e.target.tagName === 'BUTTON') {
                return;
            }
            const mode = this.getAttribute('data-mode');
            openSimulator(mode);
        });
    });

    // 所有按钮点击事件
    const modeBtns = document.querySelectorAll('.btn-primary-compact, .btn-mode-compact');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('[data-mode]');
            if (card) {
                const mode = card.getAttribute('data-mode');
                openSimulator(mode);
            }
        });
    });
});

function openSimulator(mode) {
    currentMode = mode;
    const simulatorModal = document.getElementById('simulatorModal');
    const simulatorContent = document.getElementById('simulatorContent');
    
    if (!simulatorModal || !simulatorContent) return;

    if (mode === 'scenario') {
        renderScenarioSelector();
    } else if (mode === 'card') {
        renderCardGame();
    } else if (mode === 'personality') {
        startPersonalityTest();
    }

    simulatorModal.style.display = 'block';
}

function renderScenarioSelector() {
    const simulatorContent = document.getElementById('simulatorContent');
    simulatorContent.innerHTML = `
        <h2>选择场景</h2>
        <div class="scenario-selector">
            ${scenarios.map(scenario => `
                <div class="scenario-card" data-id="${scenario.id}">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${scenario.icon}</div>
                    <h3>${scenario.title}</h3>
                    <p>${scenario.desc}</p>
                </div>
            `).join('')}
        </div>
        <div class="game-interface" id="gameInterface"></div>
    `;

    // 场景选择事件
    simulatorContent.querySelectorAll('.scenario-card').forEach(card => {
        card.addEventListener('click', function() {
            const scenarioId = parseInt(this.getAttribute('data-id'));
            startScenario(scenarioId);
        });
    });
}

function startScenario(scenarioId) {
    currentScenario = scenarios.find(s => s.id === scenarioId);
    currentQuestionIndex = 0;
    totalScore = 0;
    
    const selector = document.querySelector('.scenario-selector');
    const gameInterface = document.getElementById('gameInterface');
    
    if (selector) selector.style.display = 'none';
    if (gameInterface) {
        gameInterface.classList.add('active');
        renderQuestion();
    }
}

function renderQuestion() {
    if (!currentScenario) return;
    
    const gameInterface = document.getElementById('gameInterface');
    if (!gameInterface) return;

    if (currentQuestionIndex >= currentScenario.questions.length) {
        showScenarioResult();
        return;
    }

    const question = currentScenario.questions[currentQuestionIndex];
    
    gameInterface.innerHTML = `
        <div class="game-question">
            <h3>问题 ${currentQuestionIndex + 1}/${currentScenario.questions.length}</h3>
            <p style="font-size: 1.2rem; margin-top: 1rem;">${question.question}</p>
        </div>
        <div class="game-options">
            ${question.options.map((option, index) => `
                <div class="game-option" data-index="${index}" data-points="${option.points}">
                    ${option.text}
                </div>
            `).join('')}
        </div>
        <div class="game-result" id="gameResult"></div>
    `;

    // 选项点击事件
    gameInterface.querySelectorAll('.game-option').forEach(option => {
        option.addEventListener('click', function() {
            const points = parseInt(this.getAttribute('data-points'));
            totalScore += points;
            
            // 显示结果
            const resultDiv = document.getElementById('gameResult');
            if (resultDiv) {
                resultDiv.classList.add('show');
                resultDiv.innerHTML = `
                    <p style="color: var(--accent-orange); font-weight: bold;">
                        获得 ${points} 分！${points > 0 ? '✓' : '✗'}
                    </p>
                `;
            }

            // 下一题
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion();
            }, 1500);
        });
    });
}

function showScenarioResult() {
    const gameInterface = document.getElementById('gameInterface');
    if (!gameInterface) return;

    const maxScore = currentScenario.questions.reduce((sum, q) => 
        sum + Math.max(...q.options.map(o => o.points)), 0);
    const winRate = Math.round((totalScore / maxScore) * 100);
    
    // 奖励法力值
    const pointsEarned = Math.floor(totalScore / 10);
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', userPoints + pointsEarned);
    updatePointsDisplay();

    // 记录完成模拟
    const simulationsDone = parseInt(localStorage.getItem('simulationsDone') || '0');
    localStorage.setItem('simulationsDone', simulationsDone + 1);
    updateProfileStats();

    gameInterface.innerHTML = `
        <div class="game-result show" style="text-align: center;">
            <h2 style="color: var(--accent-orange); margin-bottom: 1rem;">模拟完成！</h2>
            <div style="font-size: 1.5rem; margin-bottom: 1rem;">
                <p>总得分：${totalScore} / ${maxScore}</p>
                <p style="color: var(--primary-blue); font-weight: bold; margin-top: 0.5rem;">
                    胜诉率预测：${winRate}%
                </p>
            </div>
            <p style="color: var(--gray-600); margin-top: 1rem;">
                获得 ${pointsEarned} 法力值！
            </p>
            <button class="btn-primary" style="margin-top: 1rem;" onclick="location.reload()">
                重新开始
            </button>
        </div>
    `;
}

function renderCardGame() {
    const simulatorContent = document.getElementById('simulatorContent');
    let currentCardIndex = 0;
    let cardsAnswered = 0;
    let totalPointsEarned = 0;

    function showCard() {
        if (currentCardIndex >= cardQuestions.length) {
            showCardResult(cardsAnswered, totalPointsEarned);
            return;
        }

        const card = cardQuestions[currentCardIndex];
        const optionsHtml = card.options.map(function(opt, idx) {
            return '<div class="card-option" data-correct="' + opt.correct + '">' + opt.text + '</div>';
        }).join('');

        simulatorContent.innerHTML = `
            <h2>卡牌答题</h2>
            <p class="card-game-progress">第 ${currentCardIndex + 1} / ${cardQuestions.length} 题</p>
            <div class="card-game-container">
                <div class="card-flip-wrapper">
                    <div class="card-inner" id="cardInner">
                        <div class="card-face card-front">
                            <h3 class="card-question-text">${card.question}</h3>
                            <div class="card-options" id="cardOptions">${optionsHtml}</div>
                        </div>
                        <div class="card-face card-back" id="cardBack">
                            <div class="card-result-badge" id="resultBadge"></div>
                            <h4 class="card-explanation-title">详细解释</h4>
                            <p class="card-explanation-text" id="explanationText"></p>
                            <p class="card-points-earned" id="pointsEarned"></p>
                            <button class="btn-primary card-next-btn" id="nextCard" style="display: none;">下一题</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cardInner = document.getElementById('cardInner');
        const cardOptions = document.getElementById('cardOptions');
        const resultBadge = document.getElementById('resultBadge');
        const explanationText = document.getElementById('explanationText');
        const pointsEarnedEl = document.getElementById('pointsEarned');
        const nextBtn = document.getElementById('nextCard');

        if (!cardOptions) return;

        cardOptions.querySelectorAll('.card-option').forEach(function(optEl, idx) {
            optEl.addEventListener('click', function() {
                if (cardInner.classList.contains('card-flipped')) return;
                var chosenCorrect = this.getAttribute('data-correct') === 'true';
                var points = chosenCorrect ? card.points : 0;
                totalPointsEarned += points;
                cardsAnswered++;

                cardOptions.querySelectorAll('.card-option').forEach(function(o) {
                    o.classList.add('card-option-disabled');
                    if (o.getAttribute('data-correct') === 'true') o.classList.add('card-option-correct');
                });
                this.classList.add(chosenCorrect ? 'card-option-correct' : 'card-option-wrong');

                if (chosenCorrect) {
                    var userPoints = parseInt(localStorage.getItem('userPoints') || '0');
                    localStorage.setItem('userPoints', userPoints + card.points);
                    updatePointsDisplay();
                }

                resultBadge.textContent = chosenCorrect ? '回答正确 ✓' : '回答错误';
                resultBadge.className = 'card-result-badge ' + (chosenCorrect ? 'correct' : 'wrong');
                explanationText.textContent = card.explanation;
                pointsEarnedEl.textContent = chosenCorrect ? '+ ' + card.points + ' 法力值' : '本题未获得法力值';
                pointsEarnedEl.style.display = 'block';
                nextBtn.style.display = 'inline-block';

                cardInner.classList.add('card-flipped');
            });
        });

        nextBtn.addEventListener('click', function() {
            currentCardIndex++;
            showCard();
        });
    }

    showCard();
}

function showCardResult(cardsAnswered, totalPointsEarned) {
    const simulatorContent = document.getElementById('simulatorContent');
    simulatorContent.innerHTML = `
        <div class="card-result-summary">
            <h2 class="card-result-title">答题完成！</h2>
            <p class="card-result-desc">您完成了 ${cardsAnswered} 道题目</p>
            <p class="card-result-points">获得 ${totalPointsEarned || 0} 法力值</p>
            <button class="btn-primary" style="margin-top: 1rem;" onclick="location.reload()">重新开始</button>
        </div>
    `;
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = localStorage.getItem('userPoints') || '0';
    }
}

function updateProfileStats() {
    const simulationsDoneElement = document.getElementById('simulationsDone');
    if (simulationsDoneElement) {
        simulationsDoneElement.textContent = localStorage.getItem('simulationsDone') || '0';
    }
}
