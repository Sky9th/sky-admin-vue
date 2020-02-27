<template>
    <d2-container class="page">
        <sky-page-cover>
            <d2-icon-svg class="logo" name="d2-admin"/>
            <template slot="footer">
                <div class="btn-group">
                    <span @click="$open('https://www.sky9th.cn')" class="btn-group__btn">Sky9th.cn 官网</span>
                </div>
                <sky-badge></sky-badge>
            </template>
        </sky-page-cover>
    </d2-container>
</template>

<script>
import SkyBadge from './components/sky-badge'
import SkyPageCover from './components/sky-page-cover'

export default {
    components: {
        SkyBadge,
        SkyPageCover
    },
    data () {
        return {
            filename: __filename
        }
    }
}
</script>

<style lang="scss" scoped>
    .page {
        .logo {
            width: 120px;
        }

        .btn-group {
            color: $color-text-placehoder;
            font-size: 12px;
            line-height: 12px;
            margin-top: 0px;
            margin-bottom: 20px;

            .btn-group__btn {
                color: $color-text-sub;

                &:hover {
                    color: $color-text-main;
                }

                &.btn-group__btn--link {
                    color: $color-primary;
                }
            }
        }
    }
</style>
