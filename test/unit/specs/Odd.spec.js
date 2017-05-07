import Vue from 'vue';
import Odd from '@/components/Odd';

describe('Odd.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Odd);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.Odd h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
