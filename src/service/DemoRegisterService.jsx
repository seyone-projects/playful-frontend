import axios from 'axios';
import config from '../Config';

//get all demo registrations with pagination
const GetAll = async (page, count) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(config.apiUrl + 'demoRegisters?page=' + page + '&count=' + count,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response.data);
        if(response.status === 200) {
            return {
                status: 200,
                registrations: response.data.registrations,
                totalPages: response.data.totalPages,
                currentPage: response.data.currentPage
            };
        }
    } catch (error) {
        console.log(error);
        if(error.response.status === 401) {
            return {
                status: 401,
                message: error.response.data.message
            };
        }
        return {
            status: 500,
            message: "Error fetching demo registrations"
        };
    }
}

//get demo registration by id
const GetById = async (id) => {
    try {
        const token = localStorage.getItem("oojwt");
        const response = await axios.get(config.apiUrl + 'demoRegisters/drId/' + id,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response.data);
        if(response.status === 200) {
            return {
                status: 200,
                registration: response.data.registration
            };
        }
    } catch (error) {
        console.log(error);
        if(error.response.status === 401) {
            return {
                status: 401,
                message: error.response.data.message
            };
        }
        return {
            status: 500,
            message: "Error fetching demo registration"
        };
    }
}

//add a new demo registration
const Add = async (stateId, sectionId, categoryId, subCategoryId, courseId, userId, name, mobile, email, whatAppNumber, standard, board, currentPosition, timeZone, demoDate, demoTime) => {
    try {
        const data = {
            stateId: stateId,
            sectionId: sectionId,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            courseId: courseId,
            userId: userId,
            name: name,
            mobile: mobile,
            email: email,
            whatAppNumber: whatAppNumber,
            standard: standard,
            board: board,
            currentPosition: currentPosition,
            timeZone: timeZone,
            demoDate: demoDate,
            demoTime: demoTime            
        };

        const token = localStorage.getItem("oojwt");
        const response = await axios.post(config.apiUrl + 'demoRegisters/add/', data,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response.data);
        if(response.status === 200) {
            return {
                status: 200,
                message: response.data.message,
                registration: response.data.registration
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Error adding demo registration"
        };
    }
}

export {Add,  GetById, GetAll};    

