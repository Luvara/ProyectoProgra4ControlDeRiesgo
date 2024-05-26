const ONE_DAY_IN_MS = 10;

function runDailyJob() {
  setInterval(async () => {
    try {
      const response = await fetch("/api/sent", {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Cron job result:', data);
    } catch (error) {
      console.error('Error running cron job:', error);
    }
  }, ONE_DAY_IN_MS);
}

export default runDailyJob;