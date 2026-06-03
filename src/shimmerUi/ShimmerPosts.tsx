import ShimmerCard from "./ShimmerCard";

type ShimmerPostsProps = {
  count?: number;
};

const ShimmerPosts = ({ count = 12 }: ShimmerPostsProps) => {
  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 py-8 mx-auto max-w-6xl list-none">
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </ul>
  );
};

export default ShimmerPosts;