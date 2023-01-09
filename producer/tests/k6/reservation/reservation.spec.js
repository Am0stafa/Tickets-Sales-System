import http from 'k6/http';
import { check, sleep } from 'k6';

// Configure our test to run 50 virtual users continuously for one minute. 
// Because of the sleep added, this will result in just below 50 iterations per second
// resulting in a total of about 2900 iterations.
export const options = {
  duration: '10s',
  vus: 50,
};

export default function () {
  const res = http.get('http://localhost:3000/api/v1/health');
  // assertions
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}