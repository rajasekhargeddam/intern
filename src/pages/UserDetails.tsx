import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import UserProfileUi from "../components/profile/UserProfileUi";
import { getUserDetails } from "../services/profile";
import ProfileShimmer from "../shimmer/ProfileShimmer";
import FailedView from "../components/common/FailedView";
import UserPosts from "./UserPosts";

const UserDetails = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserDetails(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return <ProfileShimmer />;
  }

  if (isError) {
    return <FailedView />;
  }

  return (
    <>
      <UserProfileUi user={data} mode="user" />
      <UserPosts id={data._id} />
    </>
  );
};

export default UserDetails;
