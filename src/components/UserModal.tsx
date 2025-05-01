import {
  drivingLicenseValidation,
  getDrivingLicenseByUserId,
} from "@/actions/dashboardActions";
import stringifyDate from "@/lib/helpers";
import { UserWithoutPassword } from "@/types/user";
import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";
import { Form } from "./ui/Form";
import { Input } from "./ui/Input";
import { DrivingLicenseValidationSchema } from "@/lib/schemas/expiryDateSchema";
import { redirect } from "next/navigation";

type UserModalProps = {
  user: UserWithoutPassword | null;
  setShowUser: (show: boolean) => void;
  onSuccess: () => void;
};

export const UserModal = ({ user, setShowUser, onSuccess }: UserModalProps) => {
  const [backUrl, setBackUrl] = useState<string | null>(null); // State to hold the back URL
  const [frontUrl, setFrontUrl] = useState<string | null>(null); // State to hold the front URL
  const [drivingLicenseId, setDrivingLicenseId] = useState<number>(0); // State to hold the driving license ID
  // const [pending, startTransition] = useTransition(); // Transition state for pending actions];
  const [isLoading, setIsLoading] = useState(false); // State to control loading spinner
  const [validationStatus, setValidationStatus] = useState<
    "validated" | "denied" | null
  >(null); // State to hold the validation status
  // const router = useRouter();

  const handleSuccess = async (data: any) => {
    console.log("Form submitted successfully:", data); // Log the successful form submission

    setShowUser(false); // Close the modal after successful submission
    setValidationStatus(null); // Reset the validation status
    setBackUrl(null); // Reset the back URL
    setFrontUrl(null); // Reset the front URL
    setDrivingLicenseId(0); // Reset the driving license ID

    onSuccess();
  };

  useEffect(() => {
    const fetchDrivingLicense = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        if (!user) return null; // Return null if no user is selected

        const response = await getDrivingLicenseByUserId(user.id);
        setBackUrl(response.back_license_url); // Set the back URL
        setFrontUrl(response.front_license_url); // Set the front URL
        setDrivingLicenseId(response.id); // Set the driving license ID
        console.log("Driving license ID:", response.id); // Log the driving license ID
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        if (
          (error as Error).message !== "No driving license found for this user"
        ) {
          console.error("Error fetching driving license:", error); // Log the error if it's not a specific message
        }
        setBackUrl(null); // Reset the back URL on error
        setFrontUrl(null); // Reset the front URL on error
        setDrivingLicenseId(0); // Reset the driving license ID on error
        setValidationStatus(null); // Reset the validation status on error
        setIsLoading(false); // Set loading state to false
      }
    };
    fetchDrivingLicense(); // Fetch the driving license data
  }, [user]); // Effect to run when the user changes

  useEffect(() => {
    console.log("Validation status changed:", validationStatus); // Log the validation status change
  }, [validationStatus]); // Effect to run when the validation status changes

  if (!user) return null; // Return null if no user is selected

  const validatedUser = user.is_validated ? "Yes" : "No"; // Check if the user is validated

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-zapp/50">
      <div className="bg-primary p-6 rounded shadow-lg min-w-1/4 border-2 border-black-zapp flex flex-col justify-evenly items-center relative">
        <h1 className="font-bold mb-4 text-seabed-green">User Details</h1>
        {/* User details go here */}
        <div className="mb-4 text-secondary w-full flex flex-col items-start">
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
            <div className="mb-2 text-secondary flex gap-6 flex-col">
              <h4 className="text-xl text-center">Driving license:</h4>
              <div className="flex items-center justify-evenly mb-2 gap-8">
                {/* <p>Frontside:</p> */}

                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {!frontUrl && !backUrl ? (
                      <p className="text-secondary">No driving license found</p>
                    ) : (
                      <>
                        <div>
                          <p>Frontside:</p>
                          <Image
                            unoptimized
                            src={`/api/securefiles?fileurl=${frontUrl}`}
                            alt=""
                            // className="w-70 h-50"
                            width={400}
                            height={200}
                            onError={() => {
                              redirect("/unauthorized");
                            }}
                          />
                        </div>
                        <div>
                          <p>Backside:</p>
                          <Image
                            unoptimized
                            src={`/api/securefiles?fileurl=${backUrl}`}
                            alt=""
                            // className="w-70 h-50"
                            width={400}
                            height={200}
                            onError={() => {
                              redirect("/unauthorized");
                            }}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <Form
                validationSchema={DrivingLicenseValidationSchema}
                serverAction={(data) =>
                  drivingLicenseValidation({
                    ...data,
                    userId: user.id,
                    drivingLicenseId: drivingLicenseId,
                    validationStatus: validationStatus as
                      | "validated"
                      | "denied",
                  })
                }
                onSuccess={handleSuccess}
                // serverAction={drivingLicenseValidation}
                className="flex flex-col gap-4 w-1/2! self-center text-center"
              >
                <Input
                  type="date"
                  name="expiryDate"
                  label="Driving license expiration date"
                ></Input>

                <div className="flex gap-10 mt-4 items-center w-full justify-center">
                  <button
                    type="submit"
                    onClick={() => setValidationStatus("validated")}
                    className="bg-secondary text-white rounded-2xl p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer w-full"
                  >
                    Accept
                  </button>
                  <button
                    type="submit"
                    onClick={() => setValidationStatus("denied")}
                    className="bg-red-400 text-white rounded-2xl p-2 hover:bg-red-500 transition duration-300 ease-in-out cursor-pointer w-full"
                  >
                    Reject
                  </button>
                </div>
              </Form>
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
