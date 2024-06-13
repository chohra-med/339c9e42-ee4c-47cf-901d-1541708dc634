const LoadingAnswerComponent = () => {
  return (
    <div className="mb-4 flex justify-start">
      <img
        src="https://www.teamsmart.ai/next-assets/team/ai.jpg"
        className="size-9 rounded-full"
        alt="avatar"
      />
      <div className="loader relative ml-2 flex items-center justify-between space-x-1.5 rounded-full bg-gray-200 p-2.5 px-4 dark:bg-gray-800">
        <span className="block size-3 rounded-full" />
        <span className="block size-3 rounded-full" />
        <span className="block size-3 rounded-full" />
      </div>
    </div>
  );
};
export default LoadingAnswerComponent;
