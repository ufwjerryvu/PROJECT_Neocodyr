import { api } from "../utils/interceptor";

interface CourseCreateInput {
    title: string,
    description: string,
    thumbnail: File | null,
    is_public: boolean
}

export const courseService = {
    createCourse: async (data: CourseCreateInput) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }
        formData.append("is_public", data.is_public.toString());

        const response = await api.post("/courses/authors/me/", formData);
        return response.data;
    },
    
    getCourse: async (id: number) => {
        const response = await api.get(`/courses/${id}/`);
        return response.data;
    },

    updateCourse: async (id: number, formData: FormData) => {
        const response = await api.patch(`/courses/${id}/`, formData);
        return response.data;
    },

    deleteThumbnail: async (id: number) => {
        const response = await api.delete(`/courses/${id}/thumbnail/`);
        return response.data;
    },

    createLesson: async (id: number, formData: FormData) => {
        const response = await api.post(`/courses/${id}/lessons/`, formData);
        return response.data;
    },

    getCourseLessons: async (id: number) => {
        const response = await api.get(`/courses/${id}/lessons/`);
        return response.data;
    },

    updateLesson: async (lessonId: number, data: { title: string }) => {
    const response = await api.patch(`/courses/lessons/${lessonId}/`, data);
    return response.data;
}
}