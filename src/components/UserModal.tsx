import stringifyDate from "@/lib/helpers";
import { UserWithoutPassword } from "@/types/user";

type UserModalProps = {
  user: UserWithoutPassword | null;
  setShowUser: (show: boolean) => void;
};

export const UserModal = ({ user, setShowUser }: UserModalProps) => {
  if (!user) return null; // Return null if no user is selected

  const validatedUser = user.is_validated ? "Yes" : "No"; // Check if the user is validated

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-zapp/50">
      <div className="bg-primary p-6 rounded shadow-lg w-1/3 h-3/4 border-2 border-black-zapp flex flex-col justify-evenly items-center relative">
        <h1 className="font-bold mb-4 text-seabed-green">User Details</h1>
        {/* User details go here */}
        <div className="mb-4 text-secondary w-full">
          <p className="mb-2 ">
            <strong>Name:</strong> {user?.firstname} {user?.lastname}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {user?.phone_number}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {user?.address}, {user?.postnumber}
          </p>
          <p className="mb-2">
            <strong>Valid driving license:</strong> {validatedUser}
          </p>
          <p className="mb-2">
            <strong>Role:</strong> {user?.role}
          </p>
          <p className="mb-2">
            <strong>Member since:</strong>{" "}
            {stringifyDate(user?.created_at as Date)}
          </p>
        </div>

        {/* Container for drivinglicense validation */}
        {!user.is_validated && (
          <>
            <div className="mb-2 text-secondary">
              <h4 className="text-xl">Driving license:</h4>
              <div className="flex items-center justify-evenly mb-2 gap-8">
                <div>
                  <p>Frontside:</p>
                  <img
                    src="/api/securefiles?fileurl=/secure_uploads/licenses/license_back-1744329556546.jpg"
                    alt=""
                    className="w-70 h-50"
                  />
                </div>
                <div>
                  <p>Backside:</p>
                  <img
                    src="/uploads/cars/car_showcase-1744299718165.jpg"
                    alt=""
                    className="w-70 h-50"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-10 mt-4 items-center w-1/2 justify-center">
              <button className="bg-secondary text-white rounded-2xl p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer w-full">
                Accept
              </button>
              <button className="bg-red-400 text-white rounded-2xl p-2 hover:bg-red-500 transition duration-300 ease-in-out cursor-pointer w-full">
                Reject
              </button>
            </div>
          </>
        )}

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded absolute left-4 top-4 cursor-pointer"
          onClick={() => setShowUser(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
