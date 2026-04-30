// 词库和音标数据 - 增加更多单词和句子

// 音标数据 - 元音（已包含示例单词用于发音）
const vowelPhonetics = [
    { symbol: 'i:', name: '长元音', example: ['sheep', 'sea', 'see'], image: '🐑' },
    { symbol: 'ɪ', name: '短元音', example: ['ship', 'sit', 'big'], image: '🚢' },
    { symbol: 'e', name: '短元音', example: ['bed', 'red', 'head'], image: '🛏️' },
    { symbol: 'æ', name: '短元音', example: ['cat', 'hat', 'man'], image: '🐱' },
    { symbol: 'ɑ:', name: '长元音', example: ['car', 'far', 'star'], image: '🚗' },
    { symbol: 'ɒ', name: '短元音', example: ['hot', 'dog', 'box'], image: '🔥' },
    { symbol: 'ɔ:', name: '长元音', example: ['door', 'more', 'four'], image: '🚪' },
    { symbol: 'ʊ', name: '短元音', example: ['book', 'look', 'good'], image: '📖' },
    { symbol: 'u:', name: '长元音', example: ['moon', 'food', 'blue'], image: '🌙' },
    { symbol: 'ʌ', name: '短元音', example: ['bus', 'cup', 'love'], image: '🚌' },
    { symbol: 'ɜ:', name: '长元音', example: ['bird', 'word', 'work'], image: '🐦' },
    { symbol: 'ə', name: '短元音', example: ['about', 'never', 'teacher'], image: '❓' },
    { symbol: 'eɪ', name: '双元音', example: ['day', 'say', 'play'], image: '☀️' },
    { symbol: 'aɪ', name: '双元音', example: ['eye', 'my', 'sky'], image: '👁️' },
    { symbol: 'ɔɪ', name: '双元音', example: ['boy', 'toy', 'oil'], image: '👦' },
    { symbol: 'aʊ', name: '双元音', example: ['now', 'cow', 'how'], image: '🐄' },
    { symbol: 'əʊ', name: '双元音', example: ['go', 'no', 'so'], image: '➡️' },
    { symbol: 'ɪə', name: '双元音', example: ['ear', 'hear', 'near'], image: '👂' },
    { symbol: 'eə', name: '双元音', example: ['air', 'hair', 'care'], image: '💨' },
    { symbol: 'ʊə', name: '双元音', example: ['tour', 'poor', 'sure'], image: '🎒' }
];

// 音标数据 - 辅音
const consonantPhonetics = [
    { symbol: 'p', name: '清辅音', example: ['pen', 'pie', 'top'], image: '✏️' },
    { symbol: 'b', name: '浊辅音', example: ['boy', 'bag', 'rib'], image: '👦' },
    { symbol: 't', name: '清辅音', example: ['tea', 'ten', 'cat'], image: '🍵' },
    { symbol: 'd', name: '浊辅音', example: ['day', 'dog', 'bed'], image: '🐕' },
    { symbol: 'k', name: '清辅音', example: ['key', 'cat', 'back'], image: '🔑' },
    { symbol: 'g', name: '浊辅音', example: ['go', 'bag', 'egg'], image: '⚽' },
    { symbol: 'f', name: '清辅音', example: ['fish', 'five', 'off'], image: '🐟' },
    { symbol: 'v', name: '浊辅音', example: ['voice', 'love', 'have'], image: '🎤' },
    { symbol: 'θ', name: '清辅音', example: ['think', 'three', 'bath'], image: '3️⃣' },
    { symbol: 'ð', name: '浊辅音', example: ['this', 'that', 'mother'], image: '👆' },
    { symbol: 's', name: '清辅音', example: ['sun', 'see', 'yes'], image: '☀️' },
    { symbol: 'z', name: '浊辅音', example: ['zoo', 'zebra', 'buzz'], image: '🦓' },
    { symbol: 'ʃ', name: '清辅音', example: ['she', 'fish', 'shop'], image: '👩' },
    { symbol: 'ʒ', name: '浊辅音', example: ['usually', 'pleasure', 'vision'], image: '😊' },
    { symbol: 'tʃ', name: '清辅音', example: ['chair', 'church', 'watch'], image: '🪑' },
    { symbol: 'dʒ', name: '浊辅音', example: ['jump', 'age', 'bridge'], image: '🦘' },
    { symbol: 'm', name: '浊辅音', example: ['man', 'home', 'mom'], image: '👨' },
    { symbol: 'n', name: '浊辅音', example: ['no', 'sun', 'ten'], image: '🚫' },
    { symbol: 'ŋ', name: '浊辅音', example: ['sing', 'song', 'long'], image: '🎵' },
    { symbol: 'l', name: '浊辅音', example: ['like', 'love', 'all'], image: '❤️' },
    { symbol: 'r', name: '浊辅音', example: ['red', 'run', 'car'], image: '🔴' },
    { symbol: 'w', name: '浊辅音', example: ['we', 'water', 'swim'], image: '💧' },
    { symbol: 'j', name: '浊辅音', example: ['yes', 'yellow', 'you'], image: '✅' },
    { symbol: 'h', name: '清辅音', example: ['he', 'hot', 'hello'], image: '👋' }
];

// 字母数据（增加图片emoji）
const alphabetData = [
    { letter: 'A', word: 'Apple', image: '🍎', phonetic: '/æ/', imageSrc: 'assets/images/letters/A.png' },
    { letter: 'B', word: 'Ball', image: '⚽', phonetic: '/b/', imageSrc: 'assets/images/letters/B.png' },
    { letter: 'C', word: 'Cat', image: '🐱', phonetic: '/k/', imageSrc: 'assets/images/letters/C.png' },
    { letter: 'D', word: 'Dog', image: '🐶', phonetic: '/d/', imageSrc: 'assets/images/letters/D.png' },
    { letter: 'E', word: 'Elephant', image: '🐘', phonetic: '/e/', imageSrc: 'assets/images/letters/E.png' },
    { letter: 'F', word: 'Fish', image: '🐟', phonetic: '/f/', imageSrc: 'assets/images/letters/F.png' },
    { letter: 'G', word: 'Guitar', image: '🎸', phonetic: '/g/', imageSrc: 'assets/images/letters/G.png' },
    { letter: 'H', word: 'House', image: '🏠', phonetic: '/h/', imageSrc: 'assets/images/letters/H.png' },
    { letter: 'I', word: 'Ice cream', image: '🍦', phonetic: '/aɪ/', imageSrc: 'assets/images/letters/I.png' },
    { letter: 'J', word: 'Jelly', image: '🍮', phonetic: '/dʒ/', imageSrc: 'assets/images/letters/J.png' },
    { letter: 'K', word: 'Key', image: '🔑', phonetic: '/k/', imageSrc: 'assets/images/letters/K.png' },
    { letter: 'L', word: 'Lion', image: '🦁', phonetic: '/l/', imageSrc: 'assets/images/letters/L.png' },
    { letter: 'M', word: 'Moon', image: '🌙', phonetic: '/m/', imageSrc: 'assets/images/letters/M.png' },
    { letter: 'N', word: 'Nest', image: '🪹', phonetic: '/n/', imageSrc: 'assets/images/letters/N.png' },
    { letter: 'O', word: 'Orange', image: '🍊', phonetic: '/ɒ/', imageSrc: 'assets/images/letters/O.png' },
    { letter: 'P', word: 'Pig', image: '🐷', phonetic: '/p/', imageSrc: 'assets/images/letters/P.png' },
    { letter: 'Q', word: 'Queen', image: '👸', phonetic: '/kw/', imageSrc: 'assets/images/letters/Q.png' },
    { letter: 'R', word: 'Rabbit', image: '🐰', phonetic: '/r/', imageSrc: 'assets/images/letters/R.png' },
    { letter: 'S', word: 'Sun', image: '☀️', phonetic: '/s/', imageSrc: 'assets/images/letters/S.png' },
    { letter: 'T', word: 'Tree', image: '🌳', phonetic: '/t/', imageSrc: 'assets/images/letters/T.png' },
    { letter: 'U', word: 'Umbrella', image: '☂️', phonetic: '/ʌ/', imageSrc: 'assets/images/letters/U.png' },
    { letter: 'V', word: 'Violin', image: '🎻', phonetic: '/v/', imageSrc: 'assets/images/letters/V.png' },
    { letter: 'W', word: 'Water', image: '💧', phonetic: '/w/', imageSrc: 'assets/images/letters/W.png' },
    { letter: 'X', word: 'Xylophone', image: '🎵', phonetic: '/ks/', imageSrc: 'assets/images/letters/X.png' },
    { letter: 'Y', word: 'Yellow', image: '💛', phonetic: '/j/', imageSrc: 'assets/images/letters/Y.png' },
    { letter: 'Z', word: 'Zoo', image: '🦁', phonetic: '/z/', imageSrc: 'assets/images/letters/Z.png' }
];

// 单词分类数据（增加更多单词，支持真实图片路径）
const wordCategories = {
    animals: {
        name: '动物',
        icon: '🐾',
        words: [
            { word: 'cat', chinese: '猫', image: '🐱', imageSrc: 'assets/images/animals/cat.png', phonetic: '/kæt/' },
            { word: 'dog', chinese: '狗', image: '🐶', imageSrc: 'assets/images/animals/dog.png', phonetic: '/dɒg/' },
            { word: 'elephant', chinese: '大象', image: '🐘', imageSrc: 'assets/images/animals/elephant.png', phonetic: '/ˈelɪfənt/' },
            { word: 'lion', chinese: '狮子', image: '🦁', imageSrc: 'assets/images/animals/lion.png', phonetic: '/ˈlaɪən/' },
            { word: 'bird', chinese: '鸟', image: '🐦', imageSrc: 'assets/images/animals/bird.png', phonetic: '/bɜ:d/' },
            { word: 'fish', chinese: '鱼', image: '🐟', imageSrc: 'assets/images/animals/fish.png', phonetic: '/fɪʃ/' },
            { word: 'rabbit', chinese: '兔子', image: '🐰', imageSrc: 'assets/images/animals/rabbit.png', phonetic: '/ˈræbɪt/' },
            { word: 'monkey', chinese: '猴子', image: '🐵', imageSrc: 'assets/images/animals/monkey.png', phonetic: '/ˈmʌŋki/' },
            { word: 'tiger', chinese: '老虎', image: '🐯', imageSrc: 'assets/images/animals/tiger.png', phonetic: '/ˈtaɪɡə/' },
            { word: 'bear', chinese: '熊', image: '🐻', imageSrc: 'assets/images/animals/bear.png', phonetic: '/beə/' },
            { word: 'duck', chinese: '鸭子', image: '🦆', imageSrc: 'assets/images/animals/duck.png', phonetic: '/dʌk/' },
            { word: 'pig', chinese: '猪', image: '🐷', imageSrc: 'assets/images/animals/pig.png', phonetic: '/pɪg/' },
            { word: 'horse', chinese: '马', image: '🐴', imageSrc: 'assets/images/animals/horse.png', phonetic: '/hɔ:s/' },
            { word: 'cow', chinese: '牛', image: '🐄', imageSrc: 'assets/images/animals/cow.png', phonetic: '/kaʊ/' },
            { word: 'sheep', chinese: '羊', image: '🐑', imageSrc: 'assets/images/animals/sheep.png', phonetic: '/ʃi:p/' }
        ]
    },
    food: {
        name: '食物',
        icon: '🍕',
        words: [
            { word: 'apple', chinese: '苹果', image: '🍎', imageSrc: 'assets/images/food/apple.png', phonetic: '/ˈæpl/' },
            { word: 'banana', chinese: '香蕉', image: '🍌', imageSrc: 'assets/images/food/banana.png', phonetic: '/bəˈnɑ:nə/' },
            { word: 'bread', chinese: '面包', image: '🍞', imageSrc: 'assets/images/food/bread.png', phonetic: '/bred/' },
            { word: 'milk', chinese: '牛奶', image: '🥛', imageSrc: 'assets/images/food/milk.png', phonetic: '/mɪlk/' },
            { word: 'egg', chinese: '鸡蛋', image: '🥚', imageSrc: 'assets/images/food/egg.png', phonetic: '/eg/' },
            { word: 'rice', chinese: '米饭', image: '🍚', imageSrc: 'assets/images/food/rice.png', phonetic: '/raɪs/' },
            { word: 'cake', chinese: '蛋糕', image: '🎂', imageSrc: 'assets/images/food/cake.png', phonetic: '/keɪk/' },
            { word: 'water', chinese: '水', image: '💧', imageSrc: 'assets/images/food/water.png', phonetic: '/ˈwɔ:tə/' },
            { word: 'orange', chinese: '橙子', image: '🍊', imageSrc: 'assets/images/food/orange.png', phonetic: '/ˈɒrɪndʒ/' },
            { word: 'grape', chinese: '葡萄', image: '🍇', imageSrc: 'assets/images/food/grape.png', phonetic: '/ɡreɪp/' }
        ]
    },
    colors: {
        name: '颜色',
        icon: '🎨',
        words: [
            { word: 'red', chinese: '红色', image: '🔴', imageSrc: 'assets/images/colors/red.png', phonetic: '/red/' },
            { word: 'blue', chinese: '蓝色', image: '🔵', imageSrc: 'assets/images/colors/blue.png', phonetic: '/blu:/' },
            { word: 'green', chinese: '绿色', image: '🟢', imageSrc: 'assets/images/colors/green.png', phonetic: '/gri:n/' },
            { word: 'yellow', chinese: '黄色', image: '🟡', imageSrc: 'assets/images/colors/yellow.png', phonetic: '/ˈjeləʊ/' },
            { word: 'black', chinese: '黑色', image: '⚫', imageSrc: 'assets/images/colors/black.png', phonetic: '/blæk/' },
            { word: 'white', chinese: '白色', image: '⚪', imageSrc: 'assets/images/colors/white.png', phonetic: '/waɪt/' },
            { word: 'orange', chinese: '橙色', image: '🟠', imageSrc: 'assets/images/colors/orange.png', phonetic: '/ˈɒrɪndʒ/' },
            { word: 'purple', chinese: '紫色', image: '🟣', imageSrc: 'assets/images/colors/purple.png', phonetic: '/ˈpɜːpl/' },
            { word: 'pink', chinese: '粉色', image: '🩷', imageSrc: 'assets/images/colors/pink.png', phonetic: '/pɪŋk/' },
            { word: 'brown', chinese: '棕色', image: '🟤', imageSrc: 'assets/images/colors/brown.png', phonetic: '/braʊn/' }
        ]
    },
    family: {
        name: '家庭',
        icon: '👨‍👩‍👧‍👦',
        words: [
            { word: 'father', chinese: '爸爸', image: '👨', phonetic: '/ˈfɑ:ðə/', imageSrc: 'assets/images/family/father.png' },
            { word: 'mother', chinese: '妈妈', image: '👩', phonetic: '/ˈmʌðə/', imageSrc: 'assets/images/family/mother.png' },
            { word: 'brother', chinese: '兄弟', image: '👦', phonetic: '/ˈbrʌðə/', imageSrc: 'assets/images/family/brother.png' },
            { word: 'sister', chinese: '姐妹', image: '👧', phonetic: '/ˈsɪstə/', imageSrc: 'assets/images/family/sister.png' },
            { word: 'baby', chinese: '宝宝', image: '👶', phonetic: '/ˈbeɪbi/', imageSrc: 'assets/images/family/baby.png' },
            { word: 'grandpa', chinese: '爷爷', image: '👴', phonetic: '/ˈɡrænpɑ:/', imageSrc: 'assets/images/family/grandpa.png' },
            { word: 'grandma', chinese: '奶奶', image: '👵', phonetic: '/ˈɡrænmɑ:/', imageSrc: 'assets/images/family/grandma.png' },
            { word: 'son', chinese: '儿子', image: '👦', phonetic: '/sʌn/', imageSrc: 'assets/images/family/son.png' },
            { word: 'daughter', chinese: '女儿', image: '👧', phonetic: '/ˈdɔ:tə/', imageSrc: 'assets/images/family/daughter.png' },
            { word: 'husband', chinese: '丈夫', image: '👨', phonetic: '/ˈhʌzbənd/', imageSrc: 'assets/images/family/husband.png' },
            { word: 'wife', chinese: '妻子', image: '👩', phonetic: '/waɪf/', imageSrc: 'assets/images/family/wife.png' }
        ]
    },
    body: {
        name: '身体',
        icon: '🧍',
        words: [
            { word: 'head', chinese: '头', image: '🗣️', phonetic: '/hed/', imageSrc: 'assets/images/body/head.png' },
            { word: 'eye', chinese: '眼睛', image: '👁️', phonetic: '/aɪ/', imageSrc: 'assets/images/body/eye.png' },
            { word: 'nose', chinese: '鼻子', image: '👃', phonetic: '/nəʊz/', imageSrc: 'assets/images/body/nose.png' },
            { word: 'mouth', chinese: '嘴巴', image: '👄', phonetic: '/maʊθ/', imageSrc: 'assets/images/body/mouth.png' },
            { word: 'hand', chinese: '手', image: '✋', phonetic: '/hænd/', imageSrc: 'assets/images/body/hand.png' },
            { word: 'foot', chinese: '脚', image: '🦶', phonetic: '/fʊt/', imageSrc: 'assets/images/body/foot.png' }
        ]
    },
    school: {
        name: '学校',
        icon: '🏫',
        words: [
            { word: 'book', chinese: '书', image: '📖', phonetic: '/bʊk/', imageSrc: 'assets/images/school/book.png' },
            { word: 'pen', chinese: '钢笔', image: '🖊', phonetic: '/pen/', imageSrc: 'assets/images/school/pen.png' },
            { word: 'teacher', chinese: '老师', image: '👩‍🏫', phonetic: '/ˈti:tʃə/', imageSrc: 'assets/images/school/teacher.png' },
            { word: 'student', chinese: '学生', image: '👨‍🎓', phonetic: '/ˈstju:dnt/', imageSrc: 'assets/images/school/student.png' },
            { word: 'classroom', chinese: '教室', image: '🏫', phonetic: '/ˈklɑ:sru:m/', imageSrc: 'assets/images/school/classroom.png' }
        ]
    }
};

// Be动词学习数据
const beVerbData = {
    title: 'Be动词学习',
    icon: '✨',
    description: '学习am, is, are的用法',
    口诀: '我用am你用are，is连着他她它；单数名词用is，复数名词全用are。',
    forms: [
        { form: 'am', subject: 'I', example: 'I am a boy.', chinese: '我是一个男孩。', image: '👦' },
        { form: 'is', subject: 'He/She/It', example: 'He is happy.', chinese: '他是开心的。', image: '😊' },
        { form: 'is', subject: '单数名词', example: 'The cat is cute.', chinese: '这只猫很可爱。', image: '🐱' },
        { form: 'are', subject: 'You/We/They', example: 'You are smart.', chinese: '你很聪明。', image: '🧠' },
        { form: 'are', subject: '复数名词', example: 'The dogs are big.', chinese: '这些狗很大。', image: '🐕' }
    ],
    exercises: [
        { question: 'I ___ a student.', answer: 'am', options: ['am', 'is', 'are'] },
        { question: 'She ___ my sister.', answer: 'is', options: ['am', 'is', 'are'] },
        { question: 'They ___ friends.', answer: 'are', options: ['am', 'is', 'are'] },
        { question: 'The book ___ on the table.', answer: 'is', options: ['am', 'is', 'are'] },
        { question: 'We ___ happy.', answer: 'are', options: ['am', 'is', 'are'] },
        { question: 'It ___ a cat.', answer: 'is', options: ['am', 'is', 'are'] },
        { question: 'You ___ tall.', answer: 'are', options: ['am', 'is', 'are'] }
    ]
};

// 时态学习数据
const tenseData = {
    presentSimple: {
        name: '一般现在时',
        icon: '⏰',
        description: '表示经常发生的动作或状态',
        structure: '主语 + 动词原形/三单 + 其他',
        examples: [
            { sentence: 'I play football.', chinese: '我踢足球。', image: '⚽' },
            { sentence: 'He plays piano.', chinese: '他弹钢琴。', image: '🎹' },
            { sentence: 'We go to school.', chinese: '我们去上学。', image: '🏫' }
        ]
    },
    presentContinuous: {
        name: '现在进行时',
        icon: '🏃',
        description: '表示正在进行的动作',
        structure: '主语 + am/is/are + 动词ing + 其他',
        examples: [
            { sentence: 'I am eating.', chinese: '我正在吃饭。', image: '🍽️' },
            { sentence: 'She is reading.', chinese: '她正在读书。', image: '📖' },
            { sentence: 'They are playing.', chinese: '他们正在玩耍。', image: '🎮' }
        ]
    },
    pastSimple: {
        name: '一般过去时',
        icon: '📅',
        description: '表示过去发生的动作',
        structure: '主语 + 动词过去式 + 其他',
        examples: [
            { sentence: 'I watched TV.', chinese: '我看了电视。', image: '📺' },
            { sentence: 'She went to park.', chinese: '她去了公园。', image: '🌳' },
            { sentence: 'We played games.', chinese: '我们玩了游戏。', image: '🎲' }
        ]
    },
    futureSimple: {
        name: '一般将来时',
        icon: '🔮',
        description: '表示将来要发生的动作',
        structure: '主语 + will + 动词原形 + 其他',
        examples: [
            { sentence: 'I will go to school.', chinese: '我将要去上学。', image: '🏫' },
            { sentence: 'He will be a doctor.', chinese: '他将成为一名医生。', image: '👨‍⚕️' },
            { sentence: 'They will play football.', chinese: '他们将踢足球。', image: '⚽' }
        ]
    }
};

// 句子练习数据（增加更多句子）
const sentenceData = {
    beginner: {
        name: '入门级',
        sentences: [
            { en: 'Hello!', zh: '你好！', image: '👋' },
            { en: 'I am happy.', zh: '我很开心。', image: '😊' },
            { en: 'This is a cat.', zh: '这是一只猫。', image: '🐱' },
            { en: 'I like apples.', zh: '我喜欢苹果。', image: '🍎' },
            { en: 'The sun is bright.', zh: '太阳很明亮。', image: '☀️' },
            { en: 'I can swim.', zh: '我会游泳。', image: '🏊' },
            { en: 'We are friends.', zh: '我们是朋友。', image: '👫' },
            { en: 'My name is Tom.', zh: '我的名字是汤姆。', image: '👦' }
        ]
    },
    intermediate: {
        name: '进阶级',
        sentences: [
            { en: 'I am playing football.', zh: '我正在踢足球。', image: '⚽' },
            { en: 'She went to school yesterday.', zh: '她昨天去上学了。', image: '🏫' },
            { en: 'We will go to the park.', zh: '我们将去公园。', image: '🌳' },
            { en: 'The cat is sleeping.', zh: '猫正在睡觉。', image: '😴' },
            { en: 'My mother is cooking.', zh: '我妈妈正在做饭。', image: '🍳' },
            { en: 'They are playing games.', zh: '他们正在玩游戏。', image: '🎮' },
            { en: 'I like reading books.', zh: '我喜欢读书。', image: '📚' },
            { en: 'The dog is running.', zh: '狗正在跑步。', image: '🐕' }
        ]
    }
};

// 每日一句
const dailySentences = [
    { en: "Hello! How are you?", zh: "你好！你好吗？" },
    { en: "I love my family.", zh: "我爱我的家人。" },
    { en: "The cat is cute.", zh: "这只猫很可爱。" },
    { en: "We go to school.", zh: "我们去上学。" },
    { en: "She likes apples.", zh: "她喜欢苹果。" },
    { en: "He is playing football.", zh: "他正在踢足球。" },
    { en: "They are happy.", zh: "他们很开心。" },
    { en: "I can swim.", zh: "我会游泳。" },
    { en: "The sun is bright.", zh: "太阳很明亮。" },
    { en: "We are friends.", zh: "我们是朋友。" }
];

// 导出数据
window.phoneticsData = {
    vowels: vowelPhonetics,
    consonants: consonantPhonetics,
    alphabet: alphabetData,
    categories: wordCategories,
    beVerb: beVerbData,
    tenses: tenseData,
    sentences: sentenceData,
    daily: dailySentences
};
