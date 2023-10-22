import { gql } from 'apollo-angular';

export const lastUpdateJobs = gql`
  subscription LastUpdatedJobs {
    job(limit: 1, order_by: { updated_at: desc }) {
      job_id
      updated_at
      delivery_datetime
      driver_id
      job_description
      town
      special_instructions
      street_address
      postcode
      pickup_datetime
      pickup_address
      package_size
      job_status
      vehicle_type
    }
  }
`;
