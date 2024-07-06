const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const SkeletonLoader = ({
  width = "unset",
  length = 3,
}: SkeletonProps) => {
  const skeletons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeletonShape"></div>
  ));

  return (
    <div className="skeletonLoader" style={{ width }}>
      {skeletons}
    </div>
  );
};
