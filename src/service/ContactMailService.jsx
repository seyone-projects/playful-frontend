import axios from 'axios';
import config from '../Config';

const SendContactForm = async (name, email, mobile, description) => {
    try {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('mobile', mobile);
        data.append('description', description);

        const token = localStorage.getItem("oojwt");
        const response = await axios.post(config.apiUrl + 'contacts/send-contact-form/', data, {
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

export { SendContactForm };
