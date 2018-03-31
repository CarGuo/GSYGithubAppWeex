<template>
    <div class="wrapper" style="background-color: #f2f3f4">
        <person-page :needTitle="true" :userType="userType"
                     :isMe="false" :userName="getUserName"></person-page>
    </div>
</template>
<style scoped>

</style>
<script>
    import PersonPage from './PersonPage'
    export default {
        props: {
            userType: {type: Number, default: 1},
        },
        components: {PersonPage},
        computed: {
            getUserName() {
                return this.$route.params.userName
            }
        },

    }
</script>