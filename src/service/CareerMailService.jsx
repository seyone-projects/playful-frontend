import axios from 'axios';
import config from '../Config';

const SendCareerForm = async (name, email, mobile, whatsappNo, gender, city, education) => {
    try {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('mobile', mobile);
        data.append('whatsappNo', whatsappNo);
        data.append('gender', gender);
        data.append('city', city);
        data.append('education', education);

        const token = localStorage.getItem("oojwt");
        const response = await axios.post(config.apiUrl + 'careers/send-career-form/', data, {
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
                data: response.data.data  // <- updated from 'batch' to 'data'
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: error.response.data.message || "Something went wrong"
        };
    }
}

export { SendCareerForm };
