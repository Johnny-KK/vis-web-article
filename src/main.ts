import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/** element */
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

/** style */
import './styles/index.scss';

// md
import VueMarkdownEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VueMarkdownEditor.use(vuepressTheme);

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'small' })
  .use(VueMarkdownEditor)
  .mount('#app');
