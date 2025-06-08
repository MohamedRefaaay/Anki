// Main application logic for Anki Card Generator

class AnkiCardGenerator {
    constructor() {
        this.cards = [];
        this.currentDeck = null;
        this.isArabic = true;
        this.initializeEventListeners();
        this.setupRTL();
        this.loadSavedProgress();
        this.setupDemoContent();
    }

    setupRTL() {
        // Set RTL direction for the entire application
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    }

    setupDemoContent() {
        this.demoContent = {
            medical: {
                text: "القلب هو عضو عضلي يضخ الدم في الجسم. يتكون من أربع حجرات: الأذين الأيمن، البطين الأيمن، الأذين الأيسر، والبطين الأيسر. يبدأ مسار الدم في الأذين الأيمن، ثم ينتقل إلى البطين الأيمن، ومنه إلى الرئتين للحصول على الأكسجين، ثم يعود إلى الأذين الأيسر، وأخيراً إلى البطين الأيسر الذي يضخه إلى باقي أجزاء الجسم.",
                cards: [
                    {
                        front: "ما هو القلب وما هي وظيفته؟",
                        back: "القلب هو عضو عضلي يضخ الدم في الجسم",
                        tags: ["تشريح", "قلب", "وظائف"]
                    },
                    {
                        front: "ما هي حجرات القلب الأربع؟",
                        back: "الأذين الأيمن، البطين الأيمن، الأذين الأيسر، والبطين الأيسر",
                        tags: ["تشريح", "قلب", "حجرات"]
                    },
                    {
                        front: "ما هو مسار الدم في القلب؟",
                        back: "الأذين الأيمن → البطين الأيمن → الرئتين → الأذين الأيسر → البطين الأيسر → باقي الجسم",
                        tags: ["فسيولوجيا", "دوران", "قلب"]
                    }
                ]
            },
            language: {
                text: "كلمة 'computer' تعني حاسوب. إنها اسم مفرد ويستخدم معها أداة التعريف 'the'. يمكن استخدامها كاسم وفعل.",
                cards: [
                    {
                        front: "ما معنى كلمة 'computer'؟",
                        back: "حاسوب",
                        tags: ["إنجليزية", "مفردات", "تقنية"]
                    },
                    {
                        front: "ما هي أداة التعريف المستخدمة مع كلمة 'computer'؟",
                        back: "the",
                        tags: ["إنجليزية", "قواعد", "أدوات تعريف"]
                    },
                    {
                        front: "ما هي أجزاء الكلام التي يمكن أن تكونها كلمة 'computer'؟",
                        back: "اسم وفعل",
                        tags: ["إنجليزية", "قواعد", "أجزاء الكلام"]
                    }
                ]
            },
            programming: {
                text: "Git هو نظام تحكم بالإصدارات. يتضمن سير العمل الأساسي: 1) git add لتجهيز التغييرات، 2) git commit لحفظ التغييرات، 3) git push لرفع التغييرات إلى المستودع البعيد.",
                cards: [
                    {
                        front: "ما هو Git وما هي وظيفته؟",
                        back: "نظام تحكم بالإصدارات",
                        tags: ["برمجة", "git", "تحكم بالإصدارات"]
                    },
                    {
                        front: "ما هي الخطوات الثلاث الرئيسية في سير العمل الأساسي لـ Git؟",
                        back: "1. git add (تجهيز التغييرات)\n2. git commit (حفظ التغييرات)\n3. git push (رفع إلى المستودع البعيد)",
                        tags: ["git", "سير العمل", "أوامر"]
                    },
                    {
                        front: "ما هو الأمر المستخدم لتجهيز التغييرات في Git؟",
                        back: "git add",
                        tags: ["git", "أوامر", "تجهيز"]
                    }
                ]
            }
        };
    }

    initializeEventListeners() {
        // Demo button
        const demoButton = document.getElementById('demoButton');
        const demoContent = document.getElementById('demoContent');
        if (demoButton && demoContent) {
            demoButton.addEventListener('click', () => {
                demoContent.classList.toggle('hidden');
            });
        }

        // Demo options
        document.querySelectorAll('.demo-option').forEach(option => {
            option.addEventListener('click', () => {
                const type = option.dataset.type;
                this.loadDemoContent(type);
                demoContent.classList.add('hidden');
            });
        });

        // Language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Search functionality
        const searchInput = document.querySelector('input[placeholder="بحث في البطاقات..."]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterCards(e.target.value));
        }

        // Tag filter
        const tagFilter = document.querySelector('select');
        if (tagFilter) {
            tagFilter.addEventListener('change', (e) => this.filterByTag(e.target.value));
        }

        // Save progress button
        const saveButton = document.querySelector('button:contains("حفظ التقدم")');
        if (saveButton) {
            saveButton.addEventListener('click', () => this.saveProgress());
        }

        // Drag and drop handling
        const dropZone = document.querySelector('.drop-zone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                this.handleFileDrop(e.dataTransfer.files);
            });

            dropZone.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.onchange = (e) => this.handleFileDrop(e.target.files);
                input.click();
            });
        }

        // Button event listeners
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e));
        });
    }

    toggleLanguage() {
        this.isArabic = !this.isArabic;
        const languageToggle = document.getElementById('languageToggle');
        if (this.isArabic) {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
            languageToggle.textContent = 'English';
            this.updateUIText('ar');
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
            languageToggle.textContent = 'العربية';
            this.updateUIText('en');
        }
    }

    updateUIText(lang) {
        const translations = {
            ar: {
                title: 'مساعد إنشاء بطاقات أنكي',
                newDeck: 'مجموعة جديدة',
                saveProgress: 'حفظ التقدم',
                contentInput: 'إدخال المحتوى',
                dragDrop: 'اسحب وأفلت المحتوى هنا، أو انقر للتصفح',
                textInput: 'إدخال نصي',
                urlImport: 'استيراد من رابط',
                preview: 'معاينة البطاقة',
                previewPlaceholder: 'ستظهر المعاينة هنا',
                edit: 'تعديل',
                export: 'تصدير',
                generatedCards: 'البطاقات المنشأة',
                searchPlaceholder: 'بحث في البطاقات...',
                allTags: 'جميع العلامات'
            },
            en: {
                title: 'Anki Card Generator Assistant',
                newDeck: 'New Deck',
                saveProgress: 'Save Progress',
                contentInput: 'Content Input',
                dragDrop: 'Drag and drop your content here, or click to browse',
                textInput: 'Text Input',
                urlImport: 'URL Import',
                preview: 'Card Preview',
                previewPlaceholder: 'Preview will appear here',
                edit: 'Edit',
                export: 'Export',
                generatedCards: 'Generated Cards',
                searchPlaceholder: 'Search cards...',
                allTags: 'All Tags'
            }
        };

        // Update all text elements
        Object.entries(translations[lang]).forEach(([key, value]) => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = value;
            });
        });
    }

    filterCards(searchTerm) {
        const filteredCards = this.cards.filter(card => 
            card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.back.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        this.updateCardList(filteredCards);
    }

    filterByTag(tag) {
        if (!tag) {
            this.updateCardList(this.cards);
            return;
        }
        const filteredCards = this.cards.filter(card => 
            card.tags.includes(tag)
        );
        this.updateCardList(filteredCards);
    }

    saveProgress() {
        const progress = {
            cards: this.cards,
            currentDeck: this.currentDeck,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('ankiGeneratorProgress', JSON.stringify(progress));
        this.showToast(this.isArabic ? 'تم حفظ التقدم' : 'Progress saved');
    }

    loadSavedProgress() {
        const savedProgress = localStorage.getItem('ankiGeneratorProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            this.cards = progress.cards;
            this.currentDeck = progress.currentDeck;
            this.updateCardList();
        }
    }

    async handleFileDrop(files) {
        for (const file of files) {
            try {
                const content = await this.readFile(file);
                await this.processContent(content, file.type);
            } catch (error) {
                this.showToast(this.isArabic ? 
                    'خطأ في معالجة الملف: ' + error.message :
                    'Error processing file: ' + error.message
                );
            }
        }
    }

    async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error(this.isArabic ? 'فشل في قراءة الملف' : 'File reading failed'));
            
            if (file.type.includes('text')) {
                reader.readAsText(file);
            } else if (file.type.includes('image')) {
                reader.readAsDataURL(file);
            } else {
                reject(new Error(this.isArabic ? 'نوع الملف غير مدعوم' : 'Unsupported file type'));
            }
        });
    }

    async processContent(content, contentType) {
        // AI processing logic would go here
        const cards = await this.generateCards(content, contentType);
        this.addCards(cards);
    }

    async generateCards(content, contentType) {
        // This would integrate with an AI service
        // For now, return mock data
        return [
            {
                front: this.isArabic ? 'سؤال تجريبي' : 'Sample Question',
                back: this.isArabic ? 'إجابة تجريبية' : 'Sample Answer',
                tags: this.isArabic ? ['تجريبي', 'اختبار'] : ['sample', 'test'],
                type: 'basic'
            }
        ];
    }

    addCards(cards) {
        this.cards.push(...cards);
        this.updateCardList();
    }

    updateCardList(cardsToShow = this.cards) {
        const cardList = document.querySelector('.divide-y');
        if (!cardList) return;

        cardList.innerHTML = cardsToShow.map(card => this.createCardElement(card)).join('');
    }

    createCardElement(card) {
        return `
            <div class="card-item p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-medium arabic-text">${card.front}</h3>
                        <p class="text-gray-600 mt-1 arabic-text">${card.back}</p>
                        <div class="mt-2">
                            ${card.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="btn bg-gray-100 p-2 rounded" onclick="editCard(${this.cards.indexOf(card)})">
                            ${this.isArabic ? 'تعديل' : 'Edit'}
                        </button>
                        <button class="btn bg-red-100 text-red-600 p-2 rounded" onclick="deleteCard(${this.cards.indexOf(card)})">
                            ${this.isArabic ? 'حذف' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    async exportToAnki() {
        // Convert cards to Anki format
        const ankiFormat = this.cards.map(card => ({
            front: card.front,
            back: card.back,
            tags: card.tags.join(' ')
        }));

        // Create and download .apkg file
        // This would require integration with Anki's export API
        this.showToast(this.isArabic ? 
            'سيتم إضافة وظيفة التصدير قريباً!' :
            'Export functionality coming soon!'
        );
    }

    loadDemoContent(type) {
        if (this.demoContent[type]) {
            this.cards = this.demoContent[type].cards;
            this.updateCardList();
            this.showToast(this.isArabic ? 
                'تم تحميل المحتوى التجريبي' : 
                'Demo content loaded'
            );
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.ankiGenerator = new AnkiCardGenerator();
}); 