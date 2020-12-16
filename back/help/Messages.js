exports.Messages = {
    posts: {
        notFound: 'پست مورد نظر با این آیدی یافت نشد',
        successDelete: 'پست مورد نظر با موفقیت حذف شد',
        permissionDelete: 'تنها ارسال کننده این پست قادر به حذف این پست میباشد',
        successUpdate: 'پست مورد نظر با موفقیت آپدیت شد',
        permissionUpdate: 'پست مورد نظر باید توسط خود ارسال کننده ویرایش شود',
        failedImageSelect: 'عکس پست مورد نظر را انتخاب نمایید',
    },
    user: {
        unAuth: 'شما نیازمند احراز هویت میباشید',
        notFound: 'هیچ فردی با آیدی زیر یافت نشد',
        signSuccess: 'با موفقیت ثبت نام کردید',
        failedSuccess: 'عملیات ثبت نام شما شکست خورد',
        updateSucess: 'کاربر با موفقیت آپدیت شد',
        notMatchInput: 'آدرس ایمیل وارد شده با پسورد همخانی ندارد',
        loginSuccess: 'با موفقیت وارد حساب کاربری خود شدید',
        loginFailed: 'عملیات ورود شما شکست خورد'
    },
    InvalidInput: 'خطا در ارسال وروردی',
    routeNotFound: 'آدرس مورد نظر یافت نشد',
    portRunning: `The Server is Running on ${process.env.PORT || 4000}`,
    databaseRunning: 'start database on server'
};


exports.StatusContext = {
    created: 201,
    notFound: 404,
    ok: 200,
    internalError: 500,
    unAuthorized: 401
};