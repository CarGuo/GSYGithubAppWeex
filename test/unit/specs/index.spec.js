import Vue from 'vue'
import index from '@/index'

describe('index.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(index)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.greeting').textContent).to.equal('The environment is ready!')
  })
})
