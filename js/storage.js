// 本地存储管理
class StorageManager {
    constructor() {
        this.storageKey = 'kidsEnglishData';
        this.data = this.load();
    }

    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : this.getDefaultData();
        } catch (e) {
            console.error('Failed to load data:', e);
            return this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            stars: 0,
            completedLetters: [],
            completedPhonetics: [],
            learnedWords: [],
            badges: [],
            gamesPlayed: {},
            dailyGoal: 50,
            lastVisit: null,
            streak: 0,
            history: [],
            lastCheckIn: null,
            dailyChallengeDate: null,
            dailyChallengeScore: null
        };
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (e) {
            console.error('Failed to save data:', e);
        }
    }

    // 添加星星
    addStars(count) {
        this.data.stars += count;
        this.save();
        return this.data.stars;
    }

    // 标记字母已学习
    completeLetter(letter) {
        if (!this.data.completedLetters.includes(letter)) {
            this.data.completedLetters.push(letter);
            this.addStars(5);
            this.save();
            return true;
        }
        return false;
    }

    // 标记音标已学习
    completePhonetic(symbol) {
        if (!this.data.completedPhonetics.includes(symbol)) {
            this.data.completedPhonetics.push(symbol);
            this.addStars(10);
            this.save();
            return true;
        }
        return false;
    }

    // 添加学习单词
    addLearnedWord(word) {
        if (!this.data.learnedWords.includes(word)) {
            this.data.learnedWords.push(word);
            this.addStars(2);
            this.save();
            return true;
        }
        return false;
    }

    // 记录游戏
    recordGame(gameName, score) {
        if (!this.data.gamesPlayed[gameName]) {
            this.data.gamesPlayed[gameName] = [];
        }
        this.data.gamesPlayed[gameName].push({
            score,
            date: new Date().toISOString()
        });
        this.addStars(Math.floor(score / 10));
        this.save();
    }

    // 检查每日连续
    checkStreak() {
        const today = new Date().toDateString();
        const lastVisit = this.data.lastVisit ? new Date(this.data.lastVisit).toDateString() : null;

        if (lastVisit === today) {
            return this.data.streak;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastVisit === yesterdayStr) {
            this.data.streak++;
        } else {
            this.data.streak = 1;
        }

        this.data.lastVisit = new Date().toISOString();
        this.save();
        return this.data.streak;
    }

    // 获取统计数据
    getStats() {
        return {
            stars: this.data.stars,
            lettersLearned: this.data.completedLetters.length,
            phoneticsLearned: this.data.completedPhonetics.length,
            wordsLearned: this.data.learnedWords.length,
            streak: this.data.streak,
            totalGames: Object.values(this.data.gamesPlayed).flat().length
        };
    }

    // 添加徽章
    addBadge(badgeId) {
        if (!this.data.badges.includes(badgeId)) {
            this.data.badges.push(badgeId);
            this.save();
            return true;
        }
        return false;
    }

    // 重置所有数据
    reset() {
        this.data = this.getDefaultData();
        this.save();
    }

    dailyCheckIn() {
        var today = new Date().toDateString();
        if (this.data.lastCheckIn === today) return { alreadyCheckedIn: true, streak: this.data.streak };
        this.checkStreak();
        this.data.lastCheckIn = today;
        var reward = Math.min(5 + this.data.streak * 2, 50);
        this.addStars(reward);
        this.save();
        return { alreadyCheckedIn: false, streak: this.data.streak, reward: reward };
    }

    isCheckedInToday() {
        return this.data.lastCheckIn === new Date().toDateString();
    }

    isDailyChallengeCompleted() {
        return this.data.dailyChallengeDate === new Date().toDateString();
    }

    completeDailyChallenge(score) {
        this.data.dailyChallengeDate = new Date().toDateString();
        this.data.dailyChallengeScore = score;
        this.addStars(score);
        this.save();
    }
}

// 全局存储管理器
window.storage = new StorageManager();
