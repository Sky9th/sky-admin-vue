<template>
    <div class="d2-page-cover">
        <img alt="logo" src="./image/logo@120x120@single.png" />
        <p class="d2-page-cover__title">SkyAdmin {{$version}}</p>
        <p class="d2-page-cover__sub-title">助力敏捷开发</p>
        <p class="d2-page-cover__build-time">FINAL BUILD TIME {{$buildTime}}</p>
        <slot name="footer"/>
        <a href="https://github.com/sky9th/sky-admin-vue" target="blank">
            <img alt="Fork me on GitHub" src="./image/darkblue@2x.png" style="position: absolute; top: 0; right: 0; border: 0; width: 150px;">
        </a>
    </div>
</template>

<style lang="scss" scoped>
    .d2-page-cover {
        @extend %full;
        @extend %unable-select;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        .d2-page-cover__logo {
            img {
                width: 200px;
            }
        }

        .d2-page-cover__title {
            margin: 0px;
            margin-bottom: 20px;
            font-weight: bold;
            color: $color-text-main;
        }

        .d2-page-cover__sub-title {
            margin: 0px;
            margin-bottom: 5px;
            color: $color-text-normal;
        }

        .d2-page-cover__build-time {
            margin: 0px;
            margin-bottom: 10px;
            font-size: 12px;
            color: $color-text-placehoder;
        }
    }
</style>
