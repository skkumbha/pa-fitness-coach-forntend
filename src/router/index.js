import { createRouter, createWebHistory } from 'vue-router';
import SignUpForm from '@/components/SignUpForm.vue';
import WelcomePage from '@/components/WelcomePage.vue';


const routes = [
    { path: '/', name: 'SignUp', component: SignUpForm },
    { path: '/welcome', name: 'Welcome', component: WelcomePage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;