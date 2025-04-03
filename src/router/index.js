import { createRouter, createWebHistory } from 'vue-router';
import SignUpForm from '@/components/SignUpForm.vue';
import WelcomePage from '@/components/WelcomePage.vue';
import PersonalDetails from '@/components/PersonalDetails.vue';
import ChatPage from '@/components/ChatPage.vue';



const routes = [
    { path: '/', name: 'SignUp', component: SignUpForm },
    { path: '/welcome', name: 'Welcome', component: WelcomePage},
    {path: '/personal-details', name: 'PersonalDetails', component: PersonalDetails},
    {
        path: '/chat',
        name: 'ChatPage',
        component: ChatPage,
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;