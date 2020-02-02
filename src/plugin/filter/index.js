import Vue from 'vue'
import util from '@/libs/util'

Vue.filter('date', function (value, format = 'Y-m-d H:i:s') {
    return util.format.date(format, value)
})

Vue.filter('empty', function (value, empty = '') {
    return value || empty
})

Vue.filter('ceil', function (value) {
    return Math.ceil(value)
})

Vue.filter('stripTags', function (value) {
    return util.format.stripTags(value)
})

Vue.filter('formatPhone', function (value) {
    return value ? util.format.formatPhone(value) : ''
})
