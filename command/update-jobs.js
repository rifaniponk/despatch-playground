const axios = require('axios');
const { faker } = require('@faker-js/faker');


// Define the data and headers for the request
const getRandomData = () => {
    return {
        jobStatus: faker.helpers.arrayElement(['allocated', 'completed', 'pending', 'in progress', 'started']),
        jobDescription: faker.lorem.sentence(5).replace(/\'/g, ''),
        streetAddress: faker.location.street().replace(/\'/g, ''),
        town: faker.location.city().replace(/\'/g, ''),
        jobId: faker.number.int({ min: 105, max: 1104 })
    }
};

const headers = {
    'Content-Type': 'text/plain',
    'x-hasura-admin-secret': 'QG5eK8heNXvKxrqx6nsMFRxMBTMp3Q60inTO9XJO2sr885wwE0Ojq2jjIxXV81Hd'
};

// Define the function to be executed once per second
function performRequest() {
    axios.put('https://fresh-barnacle-51.hasura.app/api/rest/job', getRandomData(), { headers })
        .then(response => {
            console.log('Success:', JSON.stringify(response.data));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Schedule the function to be executed once per second
setInterval(performRequest, 1000);
