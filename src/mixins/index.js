export default {
    methods: {
        jump(to) {
            if (this.$router) {
                this.$router.push(to)
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
