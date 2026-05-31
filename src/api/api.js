import axios from 'axios';

const defaultApiBaseUrl = (() => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    const host = window.location.hostname || 'localhost';
    return `http://${host}:5000`;
})();

const API = axios.create({
    // 💡 ຖ້າມີ VITE_API_URL ມັນຈະໃຊ້ຄ່ານັ້ນ (ເຊັ່ນ URL ຂອງ Render ທີ່ຕ້ອງລົງທ້າຍດ້ວຍ /api)
    baseURL: import.meta.env.VITE_API_URL || defaultApiBaseUrl,
    timeout: 15000, // ⏱️ ເພີ່ມເປັນ 15 ວິນາທີ ເພາະ Render Free tier ຕອນຕື່ນນອນຈະໃຊ້ເວລາໜ້ອຍໜຶ່ງ
    withCredentials: true,
});

const getAdminKey = () => localStorage.getItem('portfolio-admin-key') || '';

export const getProjects = async () => {
    try {
        const response = await API.get('/projects');
        return response.data?.projects ?? [];
    } catch (error) {
        console.error("Error fetching projects:", error);
        return []; // ສົ່ງ Array ວ່າງກັບໄປ ປ້ອງກັນ UI ພັງ
    }
};

export const getSkills = async () => {
    try {
        const response = await API.get('/skills');
        return response.data?.skills ?? [];
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
};

export const createProject = async (payload) => {
    try {
        const response = await API.post('/projects', payload, {
            headers: { 'x-admin-key': getAdminKey() },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error; // throw ອອກໄປໃຫ້ໜ้า UI ຝັ່ງ Admin ສະແດງ Alert ບອກ User
    }
};

export const createSkill = async (payload) => {
    try {
        const response = await API.post('/skills', payload, {
            headers: { 'x-admin-key': getAdminKey() },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating skill:", error);
        throw error;
    }
};