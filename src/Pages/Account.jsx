import React, { useState } from "react";

const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleDelete = () => {
    // Add delete logic here (e.g., API call)
    console.log("Account deleted");
    closeModal();
  };

  return (
    <main className="p-4 max-w-xl ml-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold px-4 py-3">Account Settings</h1>

      <div className="space-y-4 px-4 pb-4">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <p className="text-gray-600">Update your personal details.</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">
            Edit Profile
          </button>
        </div>

        <div className="pb-4">
          <h2 className="text-lg font-semibold">Security</h2>
          <p className="text-gray-600">Change your password or enable two-factor authentication.</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">
            Manage Security
          </button>
        </div>

        <div className="pb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-gray-600">Manage your email and push notifications.</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">
            Notification Settings
          </button>
        </div>

        {/* Delete Account Section */}
        <div className="pt-4">
          <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>
          <p className="text-gray-600">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={openModal}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Account;
