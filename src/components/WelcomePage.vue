<template>
    <div class="wrapper">
        <image :src="imagePath" class="logo"></image>
    </div>
</template>
<style scoped>

    .wrapper {
        height: 1334px;
        width: 750px;
        align-items: center;
        justify-content: center;
    }
    .logo {
        height: 1334px;
        width: 750px;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    import {getImagePath} from '../config/IconConfig'
    export default {
        components: {},
        data() {
            return {
                imagePath:''
            }
        },
        methods: {
        },
        created: function () {
            this.imagePath = getImagePath('welcome');
            console.log("fffffffffffffffff",  this.imagePath)
            setTimeout(() => {
                this.$store.dispatch('initUserInfo', (res) => {
                    if (res && res.result) {
                        this.reset("/main")
                    } else {
                        this.reset("/login")
                    }
                })
            }, 2000)
        },
    }
</script>