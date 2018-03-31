<template>
    <div>
        <!--<keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            &lt;!&ndash; 这里是会被缓存的视图组件，比如 page1,page2 &ndash;&gt;
          </router-view>
        </keep-alive>-->

        <!--<router-view v-if="!$route.meta.keepAlive">
          &lt;!&ndash; 这里是不被缓存的视图组件，比如 page3 &ndash;&gt;
        </router-view>-->
        <router-view @androidback="function() {$router.back()}"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        justify-content: center;
        align-items: center;
    }
</style>
