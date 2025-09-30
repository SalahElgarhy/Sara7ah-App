# Sarah App

## الوصف
تطبيق ويب متكامل مبني باستخدام Node.js وExpress وMongoDB. يتميز بهيكل تنظيمي احترافي، نظام مصادقة آمن مع تفعيل البريد الإلكتروني، إدارة للمستخدمين، ونظام مراسلة متكامل.

## الهيكل التنظيمي للمشروع

```
src/
├── DB/                         # إعدادات وموديلات قاعدة البيانات
│   ├── connection.js          # إعداد الاتصال بقاعدة البيانات
│   └── modules/              # نماذج Mongoose
│       ├── user.model.js     # نموذج المستخدم
│       └── message.model.js  # نموذج الرسائل
│
├── middleware/                 # الوسائط البرمجية
│   ├── auth.middleware.js    # التحقق من JWT
│   ├── validation.middleware.js # التحقق من صحة المدخلات
│   └── authorization.middleware.js # التحقق من الصلاحيات
│
├── modules/                    # وحدات التطبيق
│   ├── auth/                 # وحدة المصادقة
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   └── auth.validation.js
│   ├── user/                 # وحدة المستخدم
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   └── user.validation.js
│   └── messages/             # وحدة الرسائل
│       ├── messages.controller.js
│       ├── messages.service.js
│       └── messages.validation.js
│
└── utils/                     # أدوات مساعدة
    ├── errorHandler/         # معالجة الأخطاء
    ├── emails/              # معالجة البريد الإلكتروني
    ├── encryption/          # التشفير
    ├── hashing/            # تشفير كلمات المرور
    └── token/              # معالجة JWT

```

## الميزات المتقدمة

### 1. البنية النمطية (Modular Architecture)
- هيكل MVC (Model-View-Controller) معدل
- فصل واضح بين المسؤوليات
- كود قابل للصيانة والتوسع
- استخدام ES Modules

### 2. معالجة الأخطاء (Error Handling)
```javascript
// مثال على معالج الأخطاء العام
const globalErrorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({ message });
};

// معالج الأخطاء غير المتزامنة
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
```

### 3. تفعيل الحساب عبر البريد
- إرسال رابط تفعيل عند التسجيل
- استخدام Event Emitter للمعالجة غير المتزامنة
- قالب HTML جذاب للبريد الإلكتروني
- التحقق من صحة الرابط قبل التفعيل

## المتطلبات
- Node.js (الإصدار 22.17.1 أو أحدث)
- MongoDB

## التثبيت

1. قم بنسخ المستودع
```bash
git clone [رابط-المستودع]
cd sarah-app
```

2. تثبيت الاعتماديات
```bash
npm install
```

3. إنشاء ملف البيئة
قم بإنشاء ملف `.env` في المجلد الرئيسي وأضف المتغيرات التالية:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
BCRYPT_SALT_ROUNDS=10
email_user=your_email@gmail.com
email_pass=your_email_app_password
```

4. تشغيل التطبيق
```bash
# وضع التطوير
npm run dev

# وضع الإنتاج
npm start
```

## واجهات البرمجة (API Endpoints)

### المصادقة (Authentication) `/auth`
| الطريقة | المسار | الوصف | المدخلات المطلوبة |
|---------|--------|--------|------------------|
| POST | `/auth/register` | تسجيل مستخدم جديد | `name`, `email`, `password`, `confirmPassword`, `phone`, `genders` |
| POST | `/auth/login` | تسجيل الدخول | `email`, `password` |
| GET | `/auth/activate_account/:token` | تفعيل حساب المستخدم | `token` في URL |

### المستخدم (User) `/user`
| الطريقة | المسار | الوصف | المتطلبات |
|---------|--------|--------|------------|
| GET | `/user/profile` | عرض الملف الشخصي | JWT Token |
| PATCH | `/user/profile` | تحديث الملف الشخصي | JWT Token, `email?`, `name?`, `phone?`, `gender?` |
| PATCH | `/user/change-password` | تغيير كلمة المرور | JWT Token, `oldPassword`, `newPassword`, `confirmPassword` |
| DELETE | `/user/delete-account` | حذف الحساب | JWT Token |

### الرسائل (Messages) `/messages`
| الطريقة | المسار | الوصف | المتطلبات |
|---------|--------|--------|------------|
| POST | `/messages` | إرسال رسالة | JWT Token, `content`, `recipientId` |
| GET | `/messages/:messageId` | عرض رسالة محددة | JWT Token |
| GET | `/messages?flag=inbox/sent` | عرض كل الرسائل | JWT Token, `flag` (inbox/sent) |
| PATCH | `/messages/:messageId` | تحديث رسالة | JWT Token |
| DELETE | `/messages/:messageId` | حذف رسالة | JWT Token (Admin only) |

## المميزات الأمنية والتقنية المتقدمة

### 1. التحقق من المدخلات (Validation)
```javascript
// مثال على مخطط التحقق
export const register = Joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    name: generalFields.name.required(),
    phone: generalFields.phone,
    genders: generalFields.genders.required()
}).required();
```

### 2. الأمان (Security)
- تشفير كلمات المرور باستخدام bcrypt
- تشفير أرقام الهواتف باستخدام AES
- استخدام JWT للمصادقة
- CORS مفعّل
- حماية من هجمات XSS وCSRF
- التحقق من الصلاحيات متعدد المستويات

### 3. المصادقة والتفويض (Authentication & Authorization)
- نظام تسجيل دخول آمن
- تفعيل الحساب إلزامي عبر البريد
- إدارة الجلسات باستخدام JWT
- صلاحيات مختلفة (مستخدم/مشرف)
- التحقق من الصلاحيات في كل طلب

### 4. معالجة الأخطاء والسجلات
- معالجة مركزية للأخطاء
- تسجيل الأحداث (Logging)
- رسائل خطأ مخصصة
- تتبع الأخطاء في التطوير

### 5. البريد الإلكتروني
```javascript
// مثال على إرسال البريد
const emailSent = await sendEmail({ 
    to: user.email, 
    subject: subjects.register,
    html: signup(link, user.name) 
});
```

## الأدوار (Roles)
- **مستخدم (user)**: يمكنه إدارة حسابه وإرسال/استقبال الرسائل
- **مشرف (admin)**: له صلاحيات إضافية مثل حذف الرسائل

## التراخيص
ISC

## ملاحظات أمنية مهمة
- تأكد من إضافة `.env` إلى `.gitignore`
- لا تقم أبداً برفع معلومات حساسة مثل مفاتيح API أو كلمات المرور
- استخدم متغيرات بيئية للمعلومات الحساسة
- قم بتغيير المفاتيح السرية في الإنتاج