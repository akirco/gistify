export const PostSkeleton = () => {
  return (
    <div className=" flex flex-col gap-5">
      <div className="animate-pulse bg-background-secondry shadow-lg rounded-lg md:w-[80%] lg:w-[45%] p-6 flex flex-col gap-3 m-auto">
        <div className="h-10 w-48  bg-background-primary rounded"></div>
        <div className="h-8 w-60  bg-background-primary rounded"></div>
        <div className="h-64  bg-background-primary rounded"></div>
        <div className="flex justify-between">
          <div className="h-8 w-16  bg-background-primary rounded"></div>
          <div className="h-8 w-16  bg-background-primary rounded"></div>
        </div>
      </div>
      <div className="animate-pulse bg-background-secondry shadow-lg rounded-lg md:w-[80%] lg:w-[45%] p-6 flex flex-col gap-3 m-auto">
        <div className="h-10 w-48  bg-background-primary rounded"></div>
        <div className="h-8 w-60  bg-background-primary rounded"></div>
        <div className="h-64  bg-background-primary rounded"></div>
        <div className="flex justify-between">
          <div className="h-8 w-16  bg-background-primary rounded"></div>
          <div className="h-8 w-16  bg-background-primary rounded"></div>
        </div>
      </div>
    </div>
  );
};
