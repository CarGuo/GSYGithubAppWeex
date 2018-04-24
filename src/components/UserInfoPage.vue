<template>
    <div class="wrapper" :style="mainStyle">
        <person-page :needTitle="true" :userType="userType" :jumpSetting="false"
                     :isMe="false" :userName="getUserName"></person-page>
    </div>
</template>


<style lang="scss" >
    @import '../config/styles.scss';
    .wrapper {
        background-color: $--container-color
    }
</style>
<style scoped>
</style>
<script>
    import PersonPage from './PersonPage.vue'
    import {getEntryPageStyle} from "../config/Config"
    import {Utils} from "weex-ui"

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
            this.mainStyle = getEntryPageStyle(Utils)
        }

    }
</script>