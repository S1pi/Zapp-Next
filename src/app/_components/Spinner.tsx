export const Spinner = () => {
  return (
    <div className="flex justify-center items-center gap-6 h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-seperator-line border-t-seabed-green" />
      <span className="ml-2 text-seabed-green">Loading...</span>
    </div>
  );
};
