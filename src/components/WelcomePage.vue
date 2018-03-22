<template>
    <div class="wrapper">
        <image src="../static/img/welcome.png" class="logo" resize="contain"></image>
    </div>
</template>
<style scoped>
    .wrapper {
        align-items: center;
        justify-content: center;
    }
    .logo {
          width: 750px;
          height:750px;
          align-items: center;
          justify-content: center;
      }
</style>
<script>
    export default {
        components: {},
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {

        },
        created: function () {
            this.$store.dispatch('initUserInfo', (res)=>{
                if (res && res.result) {
                    this.reset("/login")
                } else {
                    this.reset("/login")
                }
            })
        },
    }
</script>