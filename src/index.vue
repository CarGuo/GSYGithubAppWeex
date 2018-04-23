<template>
    <div class="wrapper" :style="{height: realHeight}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" @androidback="function() {$router.back()}">
            <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
          </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive" @androidback="function() {$router.back()}">
          <!-- 这里是不被缓存的视图组件，比如 page3 -->
        </router-view>
    </div>
</template>

<script>
    import {Utils} from 'weex-ui';
    import {navigatorbBarHeight, getRealScreenHeight} from './config/Config';
    export default {
        name: 'App',
        data() {
            return {
                realHeight: getRealScreenHeight(Utils)
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        width: 750px;
        justify-content: center;
        align-items: center;
    }
</style>
