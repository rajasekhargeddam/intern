import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FailedView from "../../components/common/FailedView";

import { api_status } from "../../constants";
import type { User } from "../../types/auth";
import ProfileShimmer from "../../shimmer/ProfileShimmer";
import UserProfileUi from "../../components/profile/UserProfileUi";
import { fetchAdminUserById } from "../../services/admin";

const UserProfile = () => {
  const { userId } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      setApiStatus(api_status.loading);

      try {
        const userData = await fetchAdminUserById(userId);

        setUser(userData);
        setApiStatus(api_status.success);
      } catch (error) {
        console.error(error);
        setApiStatus(api_status.failed);
      }
    };

    fetchUser();
  }, [userId]);

  const renderContent = () => {
    switch (apiStatus) {
      case api_status.loading:
        return <ProfileShimmer />;

      case api_status.success:
        return user ? (
          <UserProfileUi user={user} mode="admin" onUpdateUser={setUser} />
        ) : null;

      case api_status.failed:
        return <FailedView />;

      default:
        return null;
    }
  };

  return <section>{renderContent()}</section>;
};

export default UserProfile;
