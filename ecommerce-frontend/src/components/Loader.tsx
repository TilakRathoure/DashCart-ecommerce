const Loader = () => {
  return (
    <section className="w-full h-[85vh] flex justify-center items-center">
      <div className="w-[10rem] h-[10rem] rounded-full border-t-[1rem] border-l-[1rem] border-r-[1rem] border-b-[1rem] border-t-gray-800 border-l-gray-800 border-r-white border-b-white animate-spin">
      </div>
    </section>
  );
};


export default Loader;

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeletions = Array.from({ length }, (_, idx) => (
    <div key={idx} className="h-[30px] w-full bg-gray-300 mb-2 rounded-md animate-pulse"></div>
  ));

  return (
    <div className="flex flex-col" style={{ width }}>
      {skeletions}
    </div>
  );
};
