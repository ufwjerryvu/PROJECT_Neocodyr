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

        const response = await api.post("/courses/authors/me/", formData);

        return response.data;
    },

}