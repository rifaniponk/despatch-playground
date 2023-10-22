/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { type } = data;
  if (type !== 'job-update-subscription') {
    return;
  }

  console.log('response', type);
  // postMessage();
});
