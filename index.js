import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.js'

createApp({
    data() {
        return {
            // 資料建置
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 資料傳送
        login() {
            const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
            axios.post(url, this.user)
                .then(res => {
                    // 解構物件內容，形成變數
                    const {token, expired} = res.data
                    console.log(token, expired)
                    // 將 token 帶入 cookie
                    document.cookie = `jojoyToken=${token}; expires=${new Date(expired)}`
                    // 跳轉頁面
                    window.location = './products.html'

                })
                .catch(err => {
                    alert(err.data.message)
                })
        }
    }
}).mount('#app')



