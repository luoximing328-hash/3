// 法庭直通车功能
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
        question: '合同成立的要件包括哪些？',
        options: [
            { text: '只需要双方签字即可', correct: false },
            { text: '当事人具有相应民事行为能力、意思表示真实、标的合法确定', correct: true },
            { text: '必须有书面形式', correct: false },
            { text: '只需要支付定金', correct: false }
        ],
        explanation: '合同成立的要件包括：①当事人具有相应的民事行为能力；②意思表示真实；③标的（合同内容）合法、确定、可能。书面形式并非所有合同的成立要件，口头合同、电子合同等也可成立。',
        points: 5
    },
    {
        question: '一般侵权责任的构成要件有哪些？',
        options: [
            { text: '只需要有损害结果', correct: false },
            { text: '违法行为、损害事实、因果关系、主观过错', correct: true },
            { text: '只需要有违法行为', correct: false },
            { text: '只需要有因果关系', correct: false }
        ],
        explanation: '一般侵权责任的构成要件包括：①违法行为（加害行为）；②损害事实（财产或人身损害）；③因果关系（违法行为与损害结果之间有因果关系）；④主观过错（故意或过失）。四个要件缺一不可。',
        points: 5
    },
    {
        question: '民间借贷合同有效的要件是什么？',
        options: [
            { text: '必须签订书面合同', correct: false },
            { text: '出借人与借款人意思表示一致、借款已实际交付', correct: true },
            { text: '必须有担保人', correct: false },
            { text: '必须约定利息', correct: false }
        ],
        explanation: '民间借贷合同有效的要件：①双方意思表示真实一致；②借款已实际交付（实践性合同，仅有借条但未实际交付的，合同未成立）；③不违反法律、行政法规的强制性规定。书面形式、担保、利息约定等并非合同有效的必备要件。',
        points: 5
    },
    {
        question: '劳动合同成立的要件包括哪些？',
        options: [
            { text: '只需要口头约定即可', correct: false },
            { text: '用人单位与劳动者意思表示一致、主体适格、内容合法', correct: true },
            { text: '必须经过劳动部门审批', correct: false },
            { text: '只需要支付工资', correct: false }
        ],
        explanation: '劳动合同成立的要件：①用人单位与劳动者双方意思表示一致；②主体适格（用人单位具有用工主体资格，劳动者具有劳动能力）；③合同内容合法（不违反法律、行政法规强制性规定）。劳动合同应采用书面形式，但未采用书面形式不影响合同成立（事实劳动关系）。',
        points: 5
    },
    {
        question: '违约责任的构成要件是什么？',
        options: [
            { text: '只需要合同无效', correct: false },
            { text: '合同有效、存在违约行为、无免责事由', correct: true },
            { text: '只需要有损害结果', correct: false },
            { text: '只需要有主观过错', correct: false }
        ],
        explanation: '违约责任的构成要件：①合同有效成立；②存在违约行为（不履行、迟延履行、不完全履行等）；③无免责事由（如不可抗力、约定免责等）。违约责任适用严格责任原则，一般不需要证明违约方有主观过错（除非法律另有规定）。',
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
            <h2>法理要件速记</h2>
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
