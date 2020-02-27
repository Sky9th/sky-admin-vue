<template>
  <div class="d2-badge">
    <p :key="groupIndex" align="center" v-for="(group, groupIndex) of badges">
      <a :href="badge.link" :key="badgeIndex" target="_blank" v-for="(badge, badgeIndex) of group">
        <img :src="badge.img"/>
      </a>
    </p>
  </div>
</template>

<script>
const linkSkyAdmin = 'https://github.com/sky9th/sky-admin-vue'
export default {
    data () {
        return {
            badges: [
                [
                    { img: 'https://img.shields.io/github/issues/Sky9th/sky-admin-vue', link: `${linkSkyAdmin}` },
                    { img: 'https://img.shields.io/github/forks/Sky9th/sky-admin-vue', link: `${linkSkyAdmin}` },
                    { img: 'https://img.shields.io/github/stars/Sky9th/sky-admin-vue', link: `${linkSkyAdmin}` },
                    { img: 'https://img.shields.io/github/license/Sky9th/sky-admin-vue', link: `${linkSkyAdmin}` }
                ]
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
  .d2-badge {
    margin-bottom: 20px;

    p {
      margin: 0px;
      margin-bottom: 2px;

      &:last-child {
        margin-bottom: 0px;
      }

      img {
        display: inline-block;
        margin: 0px 2px;
      }
    }
  }
</style>
