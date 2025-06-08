# Anki Card Generator | مولد بطاقات Anki

A professional tool for creating educational flashcards with support for Arabic and English languages.

أداة احترافية لإنشاء بطاقات تعليمية مع دعم اللغتين العربية والإنجليزية.

## Features | المميزات

- Create flashcards from text, PDF, and images
- Support for Arabic and English languages
- Drag and drop interface
- Tag-based organization
- Export to Anki format
- Progress saving
- Search and filter functionality

- إنشاء بطاقات من النصوص وملفات PDF والصور
- دعم اللغتين العربية والإنجليزية
- واجهة سحب وإفلات
- تنظيم باستخدام الوسوم
- تصدير بصيغة Anki
- حفظ التقدم
- وظائف البحث والتصفية

## Installation | التثبيت

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anki-card-generator.git
cd anki-card-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage | الاستخدام

1. **Create Cards | إنشاء البطاقات**
   - Paste text or drag files into the input area
   - Click "Process Content" to generate cards
   - Review and edit the generated cards

   - الصق النص أو اسحب الملفات إلى منطقة الإدخال
   - انقر على "معالجة المحتوى" لإنشاء البطاقات
   - راجع وعدل البطاقات المنشأة

2. **Organize Cards | تنظيم البطاقات**
   - Add tags to categorize cards
   - Use search to find specific cards
   - Filter cards by tags

   - أضف وسوماً لتصنيف البطاقات
   - استخدم البحث للعثور على بطاقات محددة
   - صف البطاقات حسب الوسوم

3. **Export | التصدير**
   - Click "Export to Anki" to generate an Anki-compatible file
   - Import the file into Anki

   - انقر على "تصدير إلى Anki" لإنشاء ملف متوافق مع Anki
   - استورد الملف في Anki

## Contributing | المساهمة

Contributions are welcome! Please feel free to submit a Pull Request.

نرحب بالمساهمات! لا تتردد في تقديم طلب سحب.

## License | الترخيص

This project is licensed under the MIT License - see the LICENSE file for details.

هذا المشروع مرخص تحت رخصة MIT - راجع ملف LICENSE للتفاصيل.

## Technical Details

### Architecture

- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Styling: Tailwind CSS
- AI Integration: OpenAI GPT API
- File Processing: PDF.js, Tesseract.js

### File Structure

```
anki-card-generator/
├── index.html          # Main application HTML
├── styles.css          # Custom styles
├── app.js             # Main application logic
├── components/        # UI components
├── services/          # API and processing services
└── utils/            # Helper functions
```

## Acknowledgments

- Anki for the flashcard format and API
- OpenAI for AI capabilities
- All contributors and users

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Roadmap

- [ ] AI-powered question generation
- [ ] Multi-language support
- [ ] Advanced card templates
- [ ] Progress tracking
- [ ] Mobile app version
- [ ] Collaborative features 