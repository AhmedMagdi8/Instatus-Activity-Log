import cron from 'node-cron';
import InstaLog from '../library/InstaLog';

const startCronJob = () => {
  const instaLog = new InstaLog('mysecret');
  const task = async () => {
    await instaLog.createEvent(); // Empty parameter means use seed function to store dummy data
    console.log('cron job task every 1 minutes');
  };

  // Schedule the task to run every 1 minutes
  cron.schedule('*/1 * * * *', task);
};

export default startCronJob;
