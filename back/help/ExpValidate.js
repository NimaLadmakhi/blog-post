const { body } = require('express-validator');


exports.CreatePostValidation = () => [
    body('title').notEmpty().withMessage('موضوع پست خود را باید وارد کنید'),
    body('body').notEmpty().withMessage('توضحیات پست رو وارد کنید'),
];

exports.UpdatePostValidation = () => [
    body('title').optional().notEmpty().withMessage('موضوع پست خود را باید وارد کنید'),
    body('body').optional().notEmpty().withMessage('توضحیات پست رو وارد کنید')
]

exports.SignupValidation = () => [
    body('userName').notEmpty().withMessage("نام کاربری شما نباید خالی باشد"),
    body('password').isLength({ min: 8 }).withMessage('تعداد کاراکترهای گذرواژه شما باید 8 عدد باشد'),
    body('email').isEmail().withMessage('ایمیل شما صحیح نمیباشد'),
];

exports.LoginValidation = () => [
    body('email').isEmail().withMessage('ایمیل شما صحیح نمیباشد'),
    body('password').isLength({ min: 8 }).withMessage('تعداد کاراکترهای گذرواژه شما باید 8 عدد باشد'),
]

exports.UpdateProfileValidation = () => [
    body('userName').optional(),
    body('email').optional().isEmail().withMessage('آدرس ایمیل وارد شده نادرست میباشد'),
    body('password').optional().isLength({ min: 8 }).withMessage('پسورد وارد شده نادرست میباشد'),
    body('imageUrl').optional()
]