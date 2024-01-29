import ScForm from './components/ScForm.vue';
import ScTable from './components/ScTable.vue';
import ScTemplate from './components/ScTemplate.vue';

const components = [
  ScForm,
  ScTable,
  ScTemplate,
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ScForm,
  ScTable,
  ScTemplate,
};
