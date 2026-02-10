// 逻辑罗盘功能
// 法律专业名词词典
const legalGlossary = {
    '原告': { term: '原告', explanation: '在民事诉讼中，向法院提起诉讼，请求法院保护自己合法权益的一方当事人。' },
    '被告': { term: '被告', explanation: '在民事诉讼中，被原告起诉，需要应诉的一方当事人。' },
    '诉称': { term: '诉称', explanation: '原告在起诉状中陈述的事实和理由，说明自己的诉讼请求。' },
    '辩称': { term: '辩称', explanation: '被告针对原告的诉讼请求提出的答辩意见和反驳理由。' },
    '法院经审理认为': { term: '法院经审理认为', explanation: '法院在审查案件事实和证据后，对案件作出的法律判断和认定。' },
    '判决': { term: '判决', explanation: '法院对案件实体问题作出的具有法律效力的决定，解决当事人之间的争议。' },
    '借贷关系': { term: '借贷关系', explanation: '出借人将货币或其他种类物交付给借用人，借用人按约定归还同等数量货币或种类物的法律关系。' },
    '转账凭证': { term: '转账凭证', explanation: '银行或第三方支付平台出具的证明资金转移的书面文件，是证明借贷关系的重要证据。' },
    '聊天记录': { term: '聊天记录', explanation: '当事人之间通过微信、QQ等通讯工具交流的文字、语音、图片等记录，可作为证据使用。' },
    '证据': { term: '证据', explanation: '能够证明案件事实的材料，包括书证、物证、视听资料、电子数据、证人证言等。' },
    '利息': { term: '利息', explanation: '借款人因使用借款而向出借人支付的报酬，通常按约定利率计算。' },
    '劳动合同': { term: '劳动合同', explanation: '劳动者与用人单位确立劳动关系、明确双方权利义务的协议。' },
    '解除劳动合同': { term: '解除劳动合同', explanation: '劳动合同双方或一方提前终止劳动合同关系的行为，需符合法定条件。' },
    '经济补偿金': { term: '经济补偿金', explanation: '用人单位解除或终止劳动合同时，依法向劳动者支付的补偿费用。' },
    '违法解除劳动合同赔偿金': { term: '违法解除劳动合同赔偿金', explanation: '用人单位违法解除劳动合同时，应向劳动者支付的赔偿，标准为经济补偿金的二倍。' },
    '严重违纪行为': { term: '严重违纪行为', explanation: '劳动者严重违反用人单位规章制度或劳动纪律的行为，用人单位可据此解除合同。' },
    '解除合同程序': { term: '解除合同程序', explanation: '解除劳动合同需要履行的法定步骤，包括通知、说明理由、送达等。' },
    '资金周转': { term: '资金周转', explanation: '企业或个人因经营或生活需要，临时借用资金以解决资金短缺问题。' },
    '约定': { term: '约定', explanation: '当事人之间通过协商达成的协议或承诺，对双方具有约束力。' },
    '归还': { term: '归还', explanation: '将借用的财物返还给原所有人或出借人。' },
    '催要': { term: '催要', explanation: '债权人要求债务人履行债务的行为，如发送催收通知、电话催收等。' },
    '诉至法院': { term: '诉至法院', explanation: '当事人将争议提交法院，请求法院通过诉讼程序解决纠纷。' },
    '应诉': { term: '应诉', explanation: '被告针对原告的起诉，向法院提交答辩状并参加诉讼活动。' },
    '承担还款责任': { term: '承担还款责任', explanation: '债务人依法应当履行归还借款的义务。' },
    '有效证据': { term: '有效证据', explanation: '能够被法院采信，具有证明力的证据材料。' },
    '用人单位': { term: '用人单位', explanation: '依法招用劳动者并与之建立劳动关系的企业、个体经济组织、民办非企业单位等。' },
    '工作表现': { term: '工作表现', explanation: '劳动者在履行工作职责过程中的行为表现和业绩。' },
    '有权解除': { term: '有权解除', explanation: '根据法律规定或合同约定，当事人享有的解除合同的权利。' },
    '无需支付赔偿': { term: '无需支付赔偿', explanation: '在符合法定条件的情况下，解除合同的一方不需要向对方支付经济补偿或赔偿。' },
    '充分证据': { term: '充分证据', explanation: '能够完整、清晰地证明案件事实，达到法律要求的证明标准的证据。' },
    '程序不合法': { term: '程序不合法', explanation: '解除合同的过程不符合法律规定的程序要求，可能导致解除行为无效。' },
    '维权启示': { term: '维权启示', explanation: '从案例中总结出的，对当事人维护自身合法权益有指导意义的经验或建议。' },
    '借款协议': { term: '借款协议', explanation: '出借人与借款人之间就借款金额、期限、利率等事项达成的书面协议。' },
    '保证担保合同': { term: '保证担保合同', explanation: '保证人与债权人约定，当债务人不履行债务时，保证人按照约定履行债务或承担责任的合同。' },
    '连带责任保证': { term: '连带责任保证', explanation: '保证人与债务人对债务承担连带责任，债权人可以要求债务人履行债务，也可以要求保证人承担保证责任。' },
    '原告主体资格': { term: '原告主体资格', explanation: '当事人是否有权作为原告向法院提起诉讼的资格，需与案件有直接利害关系。' },
    '直接利害关系': { term: '直接利害关系', explanation: '当事人的权利义务直接受到案件裁判结果的影响，是确定原告主体资格的重要标准。' },
    '立案受理': { term: '立案受理', explanation: '法院对当事人的起诉进行审查，符合起诉条件的予以立案，进入诉讼程序。' },
    '实体审查': { term: '实体审查', explanation: '法院对案件的事实、证据、法律适用等实体问题进行审理，区别于程序性审查。' },
    '虚假诉讼': { term: '虚假诉讼', explanation: '当事人恶意串通，虚构事实、伪造证据，意图通过诉讼侵害他人合法权益或获取非法利益的行为。' },
    '债权凭证': { term: '债权凭证', explanation: '能够证明债权债务关系的书面文件，如借据、收据、欠条、借款合同等。' },
    '驳回起诉': { term: '驳回起诉', explanation: '法院认为原告的起诉不符合法定条件，裁定不予受理或驳回起诉，不进入实体审理。' },
    '出借人': { term: '出借人', explanation: '在借贷关系中，将货币或其他种类物交付给借用人，享有债权的一方。' },
    '借款人': { term: '借款人', explanation: '在借贷关系中，从出借人处取得货币或其他种类物，负有还款义务的一方。' },
    '保证人': { term: '保证人', explanation: '为债务人的债务提供担保，当债务人不履行债务时，按照约定履行债务或承担责任的人。' },
    '借款期限': { term: '借款期限', explanation: '借款合同中约定的借款人应当归还借款的时间期限。' },
    '借款利率': { term: '借款利率', explanation: '借款合同中约定的计算利息的比率，通常按月利率或年利率表示。' },
    '履行付款义务': { term: '履行付款义务', explanation: '出借人按照借款合同的约定，将借款交付给借款人的行为。' },
    '连带清偿责任': { term: '连带清偿责任', explanation: '多个债务人对同一债务承担连带责任，债权人可以要求任一债务人清偿全部债务。' },
    '再审': { term: '再审', explanation: '对已经发生法律效力的判决、裁定，发现确有错误，依法重新审理的程序。' },
    '提审': { term: '提审', explanation: '上级法院将下级法院审理的案件提至本院审理，或指令下级法院重新审理。' },
    '借据': { term: '借据', explanation: '借款人向出借人出具的，证明借款事实和借款金额的书面凭证。' },
    '收据': { term: '收据', explanation: '收款人向付款人出具的，证明收到款项的书面凭证。' },
    '欠条': { term: '欠条', explanation: '债务人向债权人出具的，证明欠款事实和欠款金额的书面凭证。' },
    '借贷真实性': { term: '借贷真实性', explanation: '借贷关系是否真实存在，是否实际发生了资金交付，是民间借贷案件的核心争议焦点。' },
    '举证责任': { term: '举证责任', explanation: '当事人对自己提出的诉讼请求所依据的事实，有责任提供证据加以证明。' },
    '交付凭证': { term: '交付凭证', explanation: '证明出借人已将借款实际交付给借款人的证据，如银行转账记录、现金收据等。' },
    '交易习惯': { term: '交易习惯', explanation: '在特定地区、行业或当事人之间长期形成的，为人们所普遍接受和遵循的交易方式和规则。' },
    '资金流向': { term: '资金流向', explanation: '资金从出借人账户流向借款人账户的路径和过程，是判断借贷真实性的重要依据。' },
    '虚假证言': { term: '虚假证言', explanation: '证人故意作虚假陈述，与事实不符的证言，不能作为认定案件事实的依据。' },
    '询问笔录': { term: '询问笔录', explanation: '司法机关在调查案件时，对当事人、证人等进行询问，记录其陈述内容的书面材料。' },
    '起诉意见书': { term: '起诉意见书', explanation: '公安机关在侦查终结后，认为犯罪事实清楚，证据确实充分，向检察机关提出的起诉建议书。' },
    '再审判决': { term: '再审判决', explanation: '法院对已经发生法律效力的判决、裁定，经再审程序重新审理后作出的判决。' },
    '撤销判决': { term: '撤销判决', explanation: '上级法院或再审法院认为原判决错误，依法撤销原判决，重新审理或改判。' },
    '驳回诉讼请求': { term: '驳回诉讼请求', explanation: '法院经审理认为原告的诉讼请求没有事实和法律依据，判决驳回其诉讼请求。' },
    '综合审查': { term: '综合审查', explanation: '法院对案件的所有证据进行综合分析、判断，从证据的关联性、真实性、合法性等方面进行全面审查。' },
    '夫妻关系存续期间': { term: '夫妻关系存续期间', explanation: '夫妻双方从结婚登记到离婚登记或法院判决离婚之间的时间段，在此期间产生的债务可能属于夫妻共同债务。' },
    '现金形式': { term: '现金形式', explanation: '以现金（纸币、硬币）方式交付借款，区别于银行转账、支票等非现金形式。' },
    '月利率': { term: '月利率', explanation: '按月计算的利率，通常以百分比表示，如月利率3%表示每月按借款本金的3%计算利息。' },
    '保证担保': { term: '保证担保', explanation: '保证人向债权人承诺，当债务人不履行债务时，由保证人按照约定履行债务或承担责任。' },
    '连带责任': { term: '连带责任', explanation: '多个债务人对同一债务承担连带责任，债权人可以要求任一债务人清偿全部债务。' }
};

const sampleDocuments = [
    {
        id: 1,
        title: '臧某望诉山东某花实业有限公司、唐某花等民间借贷纠纷案',
        caseNumber: '(2016)鲁11民初122号',
        content: `
            2013年10月20日，哈尔滨菊某生物科技有限公司（保证人）与臧某望（债权人）签订借款保证担保合同，约定菊某生物公司同意对山东某花实业有限公司和唐某花向臧某望自2013年10月20日至2016年10月19日、金额不超过2亿元的借款提供连带责任保证担保。
            
            2013年11月4日，臧某望作为出借人与借款人某花实业公司、唐某花签订借款协议，约定：借款金额人民币3000万元，借款期限自2013年11月4日至2013年12月3日，借款利率按月利率0.96%计息。同日，臧某望与山东圣某房地产开发有限公司签订借款保证担保合同，约定圣某房地产公司为上述借款提供连带责任保证担保。
            
            合同签订后，2013年11月4日，臧某望委托龙某国际文化传媒公司向借款协议载明的指定收款人某工贸公司汇款2000万元；次日，通过转账方式向某工贸公司分三次汇款共计1000万元，履行了付款义务。借款到期后，借款人仅偿还部分利息。
            
            臧某望遂向山东省日照市中级人民法院起诉，请求判令：某花实业公司、唐某花、圣某房地产公司偿还臧某望借款3000万元及利息，菊某生物公司承担连带保证责任。
            
            一审法院判决：山东某花实业有限公司、唐某花给付臧某望借款本金3000万元及利息，山东圣某房地产开发有限公司、哈尔滨菊某生物科技有限公司等对上述债务承担连带清偿责任。
            
            二审法院以本案存在虚假诉讼的犯罪嫌疑已由公安机关立案侦查为由，裁定撤销一审判决，驳回臧某望的起诉。后经最高人民法院再审，指令山东省高级人民法院对本案进行审理。
            
            最终，最高人民法院经审理认为：借款合同签订人依据借款合同提起诉讼的，与本案有直接利害关系，具备原告主体资格。人民法院在立案受理阶段衡量民间借贷纠纷原告是否"与本案有直接利害关系"时，只需审查原告是否提交了证明其与相对人存在借贷法律关系的证据，至于出借人的经济状况、款项来源、转款方式、是否真实履行了出借义务等事实，均属于实体审查的范畴。
        `,
        analysis: {
            cause: '2013年11月，臧某望与某花实业公司、唐某花签订借款协议，借款3000万元，借款到期后借款人仅偿还部分利息',
            dispute: '臧某望是否具备原告主体资格，是否与本案有直接利害关系',
            judgeFocus: '借款合同签订人依据借款合同提起诉讼是否具备原告主体资格；立案受理阶段与实体审查阶段的区别',
            result: '最高人民法院认定臧某望具备原告主体资格，指令山东省高级人民法院对本案进行实体审理',
            enlightenment: '借款合同签订人依据借款合同提起诉讼的，具备原告主体资格。立案阶段只需审查是否提交了证明借贷法律关系的证据，出借人经济状况、款项来源等属于实体审查范畴'
        }
    },
    {
        id: 2,
        title: '林某能诉林某川、刘某芳民间借贷纠纷案',
        caseNumber: '(2023)闽民再102号',
        content: `
            林某能诉称：林某川与刘某芳在夫妻关系存续期间，林某川以经营需要为由，于2014年8月20日以现金形式向林某能借款350万元，约定月利率3%，没有约定还款期限，并立下借据1份。后经林某能多次催讨，至今未还分文，请求判令林某川、刘某芳偿还350万元借款本息及其利息。
            
            林某川曾于2014年8月20日出具《借据》1份，载明：本人林某川，因经营需要，兹向出借人林某能借款并收到现金人民币叁佰伍拾万元(小写￥3500000元)，月利息3分，利息计算至还清所有借款为止。保证人泉州富某特石业有限公司（盖章)自愿为借款人的债务偿还提供保证担保，承担债务偿还的连带责任。双方约定，借款人未能偿还借款本息，出借人可向出借人户籍所在地法院提起诉讼。特立此据 借款人：林某川（签字盖指印）。法人代表：林某川（签字盖指印）2014年8月20日。保证人：富丽特公司（盖章）2014年8月20日。
            
            林某川与刘某芳原系夫妻关系，2015年4月15日，两人经人民法院调解离婚。
            
            福建省惠安县人民法院于2016年4月10日作出（2015）惠民初字第8688号民事判决：林某川、刘某芳应偿还林某能借款350万元，并按月利率2%计付自2014年8月20日起至还款之日止的利息。林某川、刘某芳不服，提起上诉。福建省泉州市中级人民法院于2016年11月11日作出（2016）闽05民终3884号民事判决，驳回上诉，维持原判。
            
            刘某芳不服该判决，向检察机关申诉，福建省高级人民法院于2022年10月28日作出（2022）闽民抗42号民事裁定，提审本案，并于2023年3月22日作出（2023）闽民再102民事判决：撤销一、二审判决，驳回林某能诉讼请求。
            
            法院生效裁判认为，虽然借贷双方对案涉借据形式上的真实性并无异议，但根据人民检察院分别对林某能、张某某所作的询问笔录以及公安机关的起诉意见书中关于林某能并未向林某川支付讼争借款，原审证人张某某系受李某某指使作虚假证言的内容，并结合林某能的答辩意见内容，足以证明林某能并未根据案涉借据的约定向林某川支付讼争借款，原审证人李某某、张某某关于林某能以现金形式向林某川支付350万元借款的证言与事实不符，故原审认定林某川收到讼争借款350万元并判决林某川、刘某芳共同予以偿还不当，应予纠正。据此，裁定撤销一、二审判决，驳回林某能诉讼请求。
            
            裁判要旨：在民间借贷案件审理中，对于存在借贷关系及借贷内容等事实，出借人应承担举证责任；对已经归还借款的事实，借款人应承担举证责任。对形式有瑕疵的"欠条"或"收条"等，应结合其他证据认定是否存在借贷关系。借款人对借贷的真实性有异议的,不能仅凭借据、收据、欠条等，认定借贷关系的发生以及借贷关系的内容,应从各证据与案件事实的关联程度、各证据之间的联系等方面进行综合审查,结合借款债务形成的具体经过、交付凭证、交易习惯、资金流向以及当事人陈述等因素综合判断是否存在真实的借贷关系。
        `,
        analysis: {
            cause: '2014年8月20日，林某川向林某能出具借据，载明借款350万元，月利率3%，但林某能是否实际支付了借款存在争议',
            dispute: '借贷关系是否真实存在，林某能是否实际向林某川支付了350万元借款',
            judgeFocus: '不能仅凭借据、收据等认定借贷关系，需要综合审查交付凭证、资金流向、当事人陈述等证据，判断是否存在真实的借贷关系',
            result: '再审法院认定林某能并未实际支付借款，撤销一、二审判决，驳回林某能的诉讼请求',
            enlightenment: '在民间借贷案件中，出借人应承担证明借贷关系真实存在的举证责任。不能仅凭借据、收据等认定借贷关系，需要综合审查交付凭证、交易习惯、资金流向等证据。借款人对借贷真实性有异议时，法院应从各证据的关联程度、证据之间的联系等方面进行综合审查判断'
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('documentSearch');
    const compassDemo = document.getElementById('compassDemo');
    const glossarySearchInput = document.getElementById('glossarySearch');

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

    // 法条通俗百科搜索
    if (glossarySearchInput) {
        glossarySearchInput.addEventListener('input', function() {
            filterGlossaryTerms(this.value.trim());
        });
    }

    // 初始化法条通俗百科
    initLegalGlossary();

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

    // 标记专业名词并提取
    const markedContent = markLegalTerms(doc.content);
    const markedCause = markLegalTerms(doc.analysis.cause);
    const markedDispute = markLegalTerms(doc.analysis.dispute);
    const markedJudgeFocus = markLegalTerms(doc.analysis.judgeFocus);
    const markedResult = markLegalTerms(doc.analysis.result);
    const markedEnlightenment = markLegalTerms(doc.analysis.enlightenment);

    // 提取本案中的专业名词
    const caseTerms = extractTermsFromText(doc.content + ' ' + doc.analysis.cause + ' ' + doc.analysis.dispute + ' ' + doc.analysis.judgeFocus + ' ' + doc.analysis.result + ' ' + doc.analysis.enlightenment);
    updateCaseGlossary(caseTerms);

    compassDemo.innerHTML = `
        <div class="compass-analysis">
            <div class="compass-document">
                <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">${doc.title}</h3>
                <p style="color: var(--gray-600); font-size: 0.9rem; margin-bottom: 1rem;">${doc.caseNumber}</p>
                <div class="document-content" style="line-height: 1.8; color: var(--gray-700);">
                    ${markedContent.split('\n').map(line => `<p style="margin-bottom: 0.5rem;">${line.trim()}</p>`).join('')}
                </div>
            </div>
            <div class="compass-visualization">
                <h3 style="color: var(--primary-blue); margin-bottom: 1.5rem;">五维拆解</h3>
                <div class="dimension-item">
                    <div class="dimension-title">1️⃣ 起因</div>
                    <div class="dimension-content">${markedCause}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">2️⃣ 争议焦点</div>
                    <div class="dimension-content">${markedDispute}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">3️⃣ 法官看点</div>
                    <div class="dimension-content">${markedJudgeFocus}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">4️⃣ 判决结果</div>
                    <div class="dimension-content">${markedResult}</div>
                </div>
                <div class="dimension-item">
                    <div class="dimension-title">5️⃣ 维权启示</div>
                    <div class="dimension-content">${markedEnlightenment}</div>
                </div>
            </div>
        </div>
        <div style="margin-top: 1.5rem; text-align: center;">
            <button class="btn-secondary" onclick="showSampleCases()">返回案例列表</button>
        </div>
    `;

    // 绑定tooltip事件
    attachTooltips();
}

// 标记专业名词（添加可悬停的标记）
function markLegalTerms(text) {
    let marked = text;
    const terms = Object.keys(legalGlossary).sort((a, b) => b.length - a.length);
    
    terms.forEach(term => {
        const regex = new RegExp(term, 'g');
        marked = marked.replace(regex, `<span class="legal-term" data-term="${term}">${term}</span>`);
    });
    
    return marked;
}

// 从文本中提取专业名词
function extractTermsFromText(text) {
    const foundTerms = [];
    const terms = Object.keys(legalGlossary);
    
    terms.forEach(term => {
        if (text.includes(term)) {
            foundTerms.push(term);
        }
    });
    
    return [...new Set(foundTerms)].sort();
}

// 更新本案中的专业名词列表
function updateCaseGlossary(terms) {
    const glossaryTermsList = document.getElementById('glossaryTermsList');
    if (!glossaryTermsList) return;

    if (terms.length === 0) {
        glossaryTermsList.innerHTML = '<p class="glossary-empty">本案中暂无专业名词</p>';
        return;
    }

    glossaryTermsList.innerHTML = terms.map(term => {
        const entry = legalGlossary[term];
        return `
            <div class="glossary-term-item" data-term="${term}">
                <span class="term-name">${entry.term}</span>
                <span class="term-explanation">${entry.explanation}</span>
            </div>
        `;
    }).join('');
}

// 初始化法条通俗百科（显示全部词条）
function initLegalGlossary() {
    const glossaryAllTermsList = document.getElementById('glossaryAllTermsList');
    if (!glossaryAllTermsList) return;

    const allTerms = Object.keys(legalGlossary).sort();
    glossaryAllTermsList.innerHTML = allTerms.map(term => {
        const entry = legalGlossary[term];
        return `
            <div class="glossary-term-item" data-term="${term}">
                <span class="term-name">${entry.term}</span>
                <span class="term-explanation">${entry.explanation}</span>
            </div>
        `;
    }).join('');
}

// 搜索过滤词条
function filterGlossaryTerms(keyword) {
    const glossaryAllTermsList = document.getElementById('glossaryAllTermsList');
    if (!glossaryAllTermsList) return;

    if (!keyword) {
        initLegalGlossary();
        return;
    }

    const filtered = Object.keys(legalGlossary).filter(term => 
        term.includes(keyword) || legalGlossary[term].explanation.includes(keyword)
    ).sort();

    glossaryAllTermsList.innerHTML = filtered.map(term => {
        const entry = legalGlossary[term];
        return `
            <div class="glossary-term-item" data-term="${term}">
                <span class="term-name">${entry.term}</span>
                <span class="term-explanation">${entry.explanation}</span>
            </div>
        `;
    }).join('');
}

// 绑定tooltip显示事件
function attachTooltips() {
    const legalTerms = document.querySelectorAll('.legal-term');
    legalTerms.forEach(term => {
        term.addEventListener('mouseenter', showTooltip);
        term.addEventListener('mouseleave', hideTooltip);
    });
}

// 显示tooltip
function showTooltip(e) {
    const term = e.target.getAttribute('data-term');
    const entry = legalGlossary[term];
    if (!entry) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'legal-tooltip';
    tooltip.id = 'legalTooltip';
    tooltip.innerHTML = `
        <div class="tooltip-term">${entry.term}</div>
        <div class="tooltip-explanation">${entry.explanation}</div>
    `;
    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

    // 如果tooltip超出视窗，调整位置
    setTimeout(() => {
        const tooltipRect = tooltip.getBoundingClientRect();
        if (tooltipRect.left < 0) tooltip.style.left = '10px';
        if (tooltipRect.right > window.innerWidth) tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
        if (tooltipRect.top < 0) tooltip.style.top = rect.bottom + 8 + 'px';
    }, 0);
}

// 隐藏tooltip
function hideTooltip() {
    const tooltip = document.getElementById('legalTooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// 将函数暴露到全局，以便HTML中调用
window.showSampleCases = showSampleCases;
