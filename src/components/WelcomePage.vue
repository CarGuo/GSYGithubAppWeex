<template>
    <div class="wrapper" ref="container" :style="{height:mainHeight}">
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
    import {Utils} from 'weex-ui'
    const animation = weex.requireModule('animation');

    export default {
        components: {},
        data() {
            return {
                imagePath: '',
                mainHeight: 0
            }
        },
        methods: {},
        created: function () {
            this.imagePath = getImagePath('welcome', '.png');
            this.mainHeight = Utils.env.getScreenHeight();
            setTimeout(() => {
                this.$store.dispatch('initUserInfo', (res) => {
                    let containerEl = this.$refs[`container`];
                    animation.transition(containerEl, {
                        styles: {
                            transform: `translateY(${Utils.env.getPageHeight()}px)`
                        },
                        duration: 1000,
                        'cubic-bezier': (0.25, 0.46, 0.45, 0.94),
                        delay: 0
                    }, () => {
                        if (res && res.result) {
                            this.reset("/main")
                        } else {
                            this.reset("/login")
                        }
                    });
                })
            }, 2000)
        },
    }
</script>