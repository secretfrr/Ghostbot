const schedule = require('node-schedule');

module.exports = (client) => {
  const Scheduler = () => {
    const _jobs = new Map();

    return {
      get jobs() {
        return _jobs;
      },

      scheduleJob(jobName, scheduleRule, jobFunction) {
        if (typeof jobFunction !== 'function') {
          throw new Error('The job method must be a function.');
        }

        const job = schedule.scheduleJob(scheduleRule, jobFunction);
        _jobs.set(jobName, job);
        return job;
      },

      addJob(jobName, job) {
        _jobs.set(jobName, job);
      },

      startJob(jobName) {
        const job = _jobs.get(jobName);
        if (job) job.start();
      },

      stopJob(jobName) {
        const job = _jobs.get(jobName);
        if (job) job.stop();
      },

      stopAllJobs() {
        _jobs.forEach(job => job.stop());
      },

      startAllJobs() {
        _jobs.forEach(job => job.start());
      }
    };
  };

  client.scheduler = Scheduler();
};
