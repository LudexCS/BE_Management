import cron from 'node-cron';
import AppDataSource from "../config/mysql.config";

cron.schedule('0 * * * *', async () => {
    console.log('[Scheduler] Checking for expired records...');
    await AppDataSource.query(`
    DELETE FROM discount
    WHERE ends_at < (NOW() + INTERVAL 9 HOUR)
  `);
});