const { faker } = require('@faker-js/faker');

const generateDriverInserts = () => {
  const driverInserts = [];
  for (let i = 1; i <= 500; i++) {
    const driver = {
      driver_code: `${faker.string.alpha(2)}${i.toString()}`,
      driver_name: faker.person.fullName().replace(/\'/g, ''),
      driver_license_number: `${i.toString().padStart(5, '0')}`,
      driver_phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
      driver_email: faker.internet.email(),
      driver_status: faker.helpers.arrayElement(['busy', 'off', 'available', 'idle']),
      vehicle_type: faker.helpers.arrayElement(['Sedan', 'SUV', 'Truck', 'Motorcycle', 'Bicycle', 'Scooter']),
    };
    const driverInsert = `INSERT INTO driver (driver_code, driver_name, driver_license_number, driver_phone, driver_email, driver_status, vehicle_type) VALUES ('${driver.driver_code}', '${driver.driver_name}', '${driver.driver_license_number}', '${driver.driver_phone}', '${driver.driver_email}', '${driver.driver_status}', '${driver.vehicle_type}');`;
    driverInserts.push(driverInsert);
  }
  return driverInserts.join('\n');
};

const generateJobInserts = () => {
  const jobInserts = [];
  for (let i = 1; i <= 1000; i++) {
    const job = {
      driver_id: '(SELECT driver_id FROM driver ORDER BY RANDOM() LIMIT 1)',
      driver_code: faker.string.alphanumeric(5),
      street_address: faker.location.street().replace(/\'/g, ''),
      town: faker.location.city().replace(/\'/g, ''),
      postcode: faker.location.zipCode().replace(/\'/g, ''),
      package_size: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
      job_description: faker.lorem.sentence(5).replace(/\'/g, ''),
      job_status: faker.helpers.arrayElement(['allocated', 'completed', 'pending', 'in progress', 'started']),
      pickup_address: faker.location.street().replace(/\'/g, ''),
      pickup_datetime: faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' }),
      delivery_datetime: faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z' }),
      special_instructions: faker.lorem.sentence(5),
      vehicle_type: faker.helpers.arrayElement(['Sedan', 'SUV', 'Truck']),
    };
    const jobInsert = `INSERT INTO job (driver_id, street_address, town, postcode, package_size, job_description, job_status, pickup_address, pickup_datetime, delivery_datetime, special_instructions, vehicle_type) VALUES (${job.driver_id}, '${job.street_address}', '${job.town}', '${job.postcode}', '${job.package_size}', '${job.job_description}', '${job.job_status}', '${job.pickup_address}', '${job.pickup_datetime.toISOString()}', '${job.delivery_datetime.toISOString()}', '${job.special_instructions}', '${job.vehicle_type}');`;
    jobInserts.push(jobInsert);
  }
  return jobInserts.join('\n');
};

// console.log(generateDriverInserts());
console.log(generateJobInserts());
