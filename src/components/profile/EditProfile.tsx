import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import {
  useState,
  useContext,
  type ChangeEvent,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from "../../context/UserContext";
import type { User } from "../../types/auth";
import { updateAdminUser } from "../../services/admin";
import { updateProfile } from "../../services/updateProfile";
import { notifySuccess } from "../../utils/toast";

type Gender = "Male" | "Female" | "Other";

type EditProfileProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  user: User;
  mode: "self" | "admin";
  onUpdateUser?: Dispatch<SetStateAction<User | null>> | undefined;
};

const EditProfile = ({
  open,
  onOpenChange,
  user,
  mode,
  onUpdateUser,
}: EditProfileProps) => {
  const { login } = useContext(UserContext);

  const [firstname, setFirstname] = useState(() => user?.firstname || "");
  const [lastname, setLastname] = useState(() => user?.lastname || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [gender, setGender] = useState<Gender>(
    (user?.gender as Gender) || "Male",
  );

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(user?.profilePicture || "");
  const [removeProfileImage, setRemoveProfileImage] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
    setRemoveProfileImage(false);
  };

  const handleRemoveImage = () => {
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setProfileImage(null);
    setPreview("");
    setRemoveProfileImage(true);
  };

  const normalizeName = (value: string) => value.trim().toLowerCase();

  const handleSubmit = async () => {
    if (!user) return;

    const formData = new FormData();
    const normalizedFirstName = normalizeName(firstname);
    const normalizedLastName = normalizeName(lastname);

    if (normalizedFirstName !== (user.firstname || "")) {
      formData.append("firstname", normalizedFirstName);
    }

    if (normalizedLastName !== (user.lastname || "")) {
      formData.append("lastname", normalizedLastName);
    }

    if (bio !== (user.bio || "")) {
      formData.append("bio", bio);
    }

    if (gender !== (user.gender || "Male")) {
      formData.append("gender", gender);
    }

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    if (removeProfileImage) {
      formData.append("removeProfileImage", "true");
    }

    if ([...formData.entries()].length === 0) {
      setErrorMessage("No changes were made.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      let updatedUser;

      if (mode === "self") {
        const data = await updateProfile(formData);
        updatedUser = data;
      } else {
        if (!user._id) {
          throw new Error("User ID is missing.");
        }

        const data = await updateAdminUser(user._id, formData);
        updatedUser = data.user;
      }

      if (mode === "self") {
        login({
          ...user,
          ...updatedUser,
        });
      } else {
        if (onUpdateUser !== undefined) {
          onUpdateUser(updatedUser);
        }
      }

      notifySuccess("Profile updated successfully");
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger asChild>
        <button
          type="button"
          className="rounded-lg bg-gray-100 px-4 py-1.5 transition hover:bg-gray-200"
        >
          Edit Profile
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

        <Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <Title className="text-2xl font-semibold">Edit Profile</Title>

            <Close asChild>
              <button type="button">
                <RxCross2 size={24} />
              </button>
            </Close>
          </div>

          <div className="flex flex-col items-center gap-4">
            <img
              src={
                preview ||
                "https://static.vecteezy.com/system/resources/thumbnails/067/451/114/small/avatar-default-user-profile-icon-gender-neutral-silhouette-simple-flat-profile-picture-symbol-user-account-dp-sign-best-for-social-media-icons-web-and-app-design-illustration-vector.jpg"
              }
              alt="profile"
              className="h-32 w-32 rounded-full border object-cover"
            />

            <div className="flex gap-4">
              <label className="cursor-pointer rounded-lg border px-4 py-2 hover:bg-gray-100">
                Change Photo
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <button
                type="button"
                onClick={handleRemoveImage}
                className="cursor-pointer rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                <MdDeleteOutline size={20} />
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
          )}

          <div className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="font-medium">First Name</label>

                <input
                  className="mt-2 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div>
                <label className="font-medium">Last Name</label>

                <input
                  className="mt-2 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Gender</label>

              <select
                className="mt-2 w-full rounded-lg border px-4 py-2"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Bio</label>

              <textarea
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Close asChild>
              <button
                type="button"
                className="rounded-lg border px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
            </Close>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default EditProfile;
