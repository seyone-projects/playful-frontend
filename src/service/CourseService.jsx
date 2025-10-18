import axios from 'axios';
import config from '../Config';

const GetAll = async (page, limit, keyword) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(`${config.apiUrl}courses?page=${page}&limit=${limit}&keyword=${keyword}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        if (response.status === 200) {
            return {
                status: 200,
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 401,
            message: error.response.data.message
        };

    }
}

const GetById = async (id) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(config.apiUrl + 'courses/cId/' + id,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        console.log("sdsd", response.data);
        if (response.status === 200) {
            return {
                status: 200,
                course: response.data.course
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: error.response.data.message
        };

    }
}

//create a function to send the name and image to axios post to save the course
const Add = async (categoryId, subCategoryIds, name, image, description) => {
    try {
        const data = new FormData();
        data.append("categoryId", categoryId);

        // Append each subCategoryId separately
        subCategoryIds.forEach(id => {
            data.append("subCategoryIds", id);
        });

        data.append("name", name);
        data.append("image", image);
        data.append("description", description);

        console.log("Image in service : " + image);

        const token = localStorage.getItem("oojwt");
        const response = await axios.post(config.apiUrl + 'courses/add/', data,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(response.data);
        if (response.status === 200) {
            return {
                status: 200,
                message: response.data.message,
                course: response.data.course
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: error.response.data.message
        };

    }
}

const Update = async (id, categoryId, subCategoryIds, name, image, status, description) => {
    try {
        const data = new FormData();
        data.append("id", id);
        data.append("categoryId", categoryId);
        // Append each subCategoryId individually
        subCategoryIds.forEach(id => {
            data.append("subCategoryIds", id);
        });
        data.append("name", name);
        data.append("image", image);
        data.append("status", status);
        data.append("description", description);

        console.log("Image in service : " + image);

        const token = localStorage.getItem("oojwt");
        const response = await axios.post(config.apiUrl + 'courses/update/' + id, data,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            });

        console.log(response.data);
        if (response.status === 200) {
            return {
                status: 200,
                message: response.data.message,
                course: response.data.course
            };
        }
    } catch (error) {
        return {
            status: error.response.status,
            message: error.response.data.message
        };
    }
}

//get courses by category id
const GetByCategoryId = async (categoryId) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(config.apiUrl + 'courses/categoryId/' + categoryId,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        console.log(response.data);
        if (response.status === 200) {
            return {
                status: 200,
                courses: response.data.courses,
                totalItems: response.data.totalItems
            };
        }
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            return {
                status: 401,
                message: error.response.data.message
            };
        }
    }
}

//get cousres by subcategory id with pagination
const GetBySubCategoryId = async (subCategoryId, page, limit) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(`${config.apiUrl}courses/subcategoryId/${subCategoryId}?page=${page}&limit=${limit}`,
            {
                headers: {
                    'Authorization':
                        'Bearer ' + token
                }
            });
        console.log("cours", response.data);
        if (response.status === 200) {
            return {
                status: 200,
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 401,
            message: error.response.data.message
        };
    }
}

const GetByIdCourseDetails = async (id) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(config.apiUrl + 'courses/cId/details/' + id,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        if (response.status === 200) {
            return {
                status: 200,
                course: response.data.course
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: error.response.data.message
        };

    }
}

//get latest 5 courses with pagination
const GetLatestCourses = async (page, limit) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(`${config.apiUrl}courses/latest?page=${page}&limit=${limit}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        console.log(response.data);
        if (response.status === 200) {
            return {
                status: 200,
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 401,
            message: error.response.data.message
        };
    }
}

//get trending 5 courses with pagination
const GetTrendingCourses = async (page, limit) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(`${config.apiUrl}courses/trending?page=${page}&limit=${limit}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        console.log(response.data);
        if (response.status === 200) {
            return {
                status: 200,
                courses: response.data.courses,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 401,
            message: error.response.data.message
        };
    }
}


//get latest batche by course id
const GetLatestBatchByCourseId = async (courseId) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(`${config.apiUrl}courses/latest-batch/${courseId}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log("batch", response.data);
        if (response.status === 200) {
            return {
                status: 200,
                latestBatchId: response.data.latestBatchId
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 401,
            message: error.response.data.message
        };
    }
}

export { Add, Update, GetById, GetAll, GetByCategoryId, GetBySubCategoryId, GetByIdCourseDetails, GetLatestCourses, GetTrendingCourses, GetLatestBatchByCourseId };
