import Samsung from "./components/UI/Brands/Samsung/Samsung"
import Xiaomi from "./components/UI/Brands/Xiaomi/Xiaomi"

const config = {
    sourceFolder: "",
    colors: {
        'white': 'سفید',
        'black': 'مشکی',
        'green': 'سبز',
        'grey': 'خاکستری',
        'blue': 'آبی',
        'red': 'قرمز',
        'pink': 'صورتی',
        'darkgreen': 'سبز تیره',
        'lightblue': 'آبی روشن',
        'lightgreen': 'سبزآبی روشن',
        'purple': 'بنفش',
        'darkred': 'قرمز تیره',
        'yellow': 'زرد',
        'silver': 'نقره‌ای',
        'mediumorchid': 'بنفش روشن',
        '#070047': 'سرمه‌ای',
        '#040024': 'سرمه‌ای تیره',
        '#211d3f': 'آبی تیره',
        'beige': 'بژ',
        'bisque': 'کرم',
        'darkslategrey': 'مشکی مات',
        '#151716': 'ذغالی',
        'goldenrod': 'طلابی',
        '#cd7f32': 'برنزی',
        '#888888': 'طوسی'
    },
    brands: {
        'mobile': { fa: 'موبایل' },
        'laptop': { fa: 'لپتاپ' },
        'watch': { fa: 'ساعت' },
        'sound': { fa: 'هدفون، هدست و میکروفون' },
        'apple': { fa: 'اپل', icon: <i className="brand-icon icon-background blue-grad fa-brands fa-apple"></i> },
        'samsung': { fa: 'سامسونگ', icon: <Samsung /> },
        'xiaomi': { fa: 'شیائومی', icon: <Xiaomi /> },
        'asus': { fa: 'ایسوس', icon: '' },
        'lenovo': { fa: 'لنووو', icon: '' },
        'hp': { fa: 'اچ پی', icon: '' },
        'huawei': { fa: 'هواوی', icon: '' },
        'HW16': { fa: 'HW16', icon: '' },
        'mibro': { fa: 'میبرو', icon: '' },
        'modio': { fa: 'مودیو', icon: '' },
        'leitu': { fa: 'لیتو', icon: '' },
        'wuw': { fa: 'دبلیو یو دبلیو', icon: '' },
        'proone': { fa: 'پرو وان', icon: '' },
        'bth': { fa: 'BTH', icon: '' },
        'roman': { fa: 'رومن', icon: '' },
        'crown': { fa: 'کرون', icon: <i className="brand-icon icon-background orange-grad fa-solid fa-crown"></i> }
    },
    orderState: {
        'pending': 'بررسی سفارش',
        'sending': 'ارسال سفارش',
        'recieved': 'تحویل شده',
        'returned': 'مرجوع شده',
        'canceled': 'لغو شده'
    },
    errors: {
        'length-10': 'مقدار وارد شده باید ده رقمی باشد',
        'length-11': 'مقدار وارد شده باید یازده رقمی باشد',
        'number': 'مقدار باید بصورت عدد وارد شود',
        'empty': 'این فیلد نباید خالی بماند',
        'postcode-duplicate': 'آدرسی با کد پستی وارد شده ثبت شده است'
    }
}

export default config