"use client";
import { Form } from "@/components/ui/Form";
import { TokenCreateSchema } from "@/lib/schemas/tokenCreateSchema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { use, useEffect } from "react";
import { redirect } from "next/navigation";
import { createInviteTokenAction } from "@/actions/tokenActions";

export default function CreateTokenTestPage() {
  const handleSuccess = () => {
    alert("Token created successfully!");
    // Replace with real redirect path
    redirect("/admin/invite-tokens/success");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 ">
      <h1 className="text-2xl font-bold mb-4">Create Token Test Page</h1>
      <p className="text-lg">This is a test page for creating tokens.</p>

      <Form
        validationSchema={TokenCreateSchema}
        serverAction={createInviteTokenAction}
        onSuccess={handleSuccess}
        className="flex flex-col gap-6 max-w-sm h-2/3 justify-center bg-secondary p-4 rounded-lg shadow-lg"
      >
        <h3 className="text-seabed-green font-bold">TOKEN CREATION FORM</h3>

        <Input
          label="Invite Code"
          name="inviteCode"
          type="text"
          placeholder="Enter invite code"
        />

        <Input
          label="Expiry Date"
          name="expiryDate"
          type="datetime-local"
          placeholder="Enter expiry date"
        />

        <Select
          name="roleToAssign"
          label="Role to Assign"
          defaultValueText="Select role to assign"
          options={[
            { value: "admin", label: "Admin" },
            { value: "dealer", label: "Dealer" },
          ]}
        />

        <button
          type="submit"
          className="bg-seabed-green text-white rounded-2xl p-2 hover:bg-black-zapp transition duration-300 ease-in-out cursor-pointer"
        >
          Luo Token
        </button>
      </Form>
    </div>
  );
}
