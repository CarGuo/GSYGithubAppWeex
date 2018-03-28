export default {
    methods: {
        jump(to) {
            if (this.$router) {
                this.$router.push(to)
            }
        },
        jumpWithParams(to, params) {
            if (this.$router) {
                this.$router.push({name: to, params: params})
            }
        },
        reset(to) {
            if (this.$router) {
                this.$router.replace(to)
            }
        },
        getUserInfo() {
            return this.$store.state.user.userInfo
        }
    }
}
