import stringifyDate, { capitalizeFirstLetter } from "@/lib/helpers";
import { UserWithoutPassword } from "@/types/user";

type UserListProps = {
  users: UserWithoutPassword[];
  setSelectedUser?: (user: UserWithoutPassword) => void;
  setShowUser?: (show: boolean) => void;
};

export const UserList = ({
  users,
  setSelectedUser,
  setShowUser,
}: UserListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b border-secondary">
              <td className="py-6 px-2 text-black-zapp">
                {user.firstname} {user.lastname}
              </td>
              {/* <td>
                  <span className="text-secondary text-sm font-light">
                    {user.postnumber} {user.address}
                  </span>
                </td> */}
              <td className="py-6 px-2 text-black-zapp">
                {capitalizeFirstLetter(user.role)}
              </td>
              <td className="py-6 px-2 text-black-zapp">{user.phone_number}</td>
              <td className="py-6 px-2 text-black-zapp">{user.email}</td>
              <td className="py-6 px-2 text-black-zapp">
                {stringifyDate(user.created_at as Date)}
              </td>
              <td>
                <button
                  onClick={() => {
                    if (setSelectedUser) {
                      setSelectedUser(user);
                      if (setShowUser) {
                        setShowUser(true);
                      }
                    }
                  }}
                  className="py-2 px-4 text-seabed-green text-lg cursor-pointer"
                >
                  <span className="text-secondary text-mid font-light cursor-pointer">
                    View
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
