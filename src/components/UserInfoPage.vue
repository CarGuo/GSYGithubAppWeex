<template>
    <div class="wrapper" :style="mainStyle">
        <person-page :needTitle="true" :userType="userType"
                     :isMe="false" :userName="getUserName"></person-page>
    </div>
</template>
<style scoped>

</style>
<script>
    import PersonPage from './PersonPage.vue'
    export default {
        props: {
            userType: {type: Number, default: 1},
        },
        data: () => ({
            mainStyle: {}
        }),
        components: {PersonPage},
        computed: {
            getUserName() {
                return this.getQuery().userName
            }
        },
        created() {
            let mainMarginTop = (WXEnvironment.platform.toLowerCase() === 'ios') ? '32px' : '0px'
            this.mainStyle = {marginTop: mainMarginTop, backgroundColor: '#f2f3f4'}
        }

    }
</script>