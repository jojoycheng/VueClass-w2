import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.js'

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'ejmusic',
            products: [],
            temp: {}
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${this.apiUrl}/api/user/check`)
                .then(() => {
                    this.getProducts()
                })
                .catch(err => {
                    // 跳出錯誤訊息
                    alert(err.data.message)
                    // 跳轉到登入畫面
                    window.location = './index.html'
                })
        },
        getProducts() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then(res => {
                    // 將遠端資料帶入 products
                    this.products = res.data.products
                })
                .catch(err => {
                    alert(err.data.message)
                })
        }
    },
    mounted() {
        // 取出 token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jojoyToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
        // 預設帶入 headers 驗證
        axios.defaults.headers.common.Authorization = token

        this.checkLogin()
    }
}).mount('#app')