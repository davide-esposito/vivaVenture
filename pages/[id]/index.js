import { useRouter } from "next/router";
import ActivityDetails from "@/components/ActivityDetails";
import { ConfirmModal } from "@/components/ConfirmModal";
import { toast } from "react-toastify";
import { useState } from "react";
import useSWR from "swr";

export default function Activity({
  activityData,
  onToggleFavorite,
  favoriteActivitiesList,
}) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/activities/${id}`);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activity = activityData.find((activity) => activity._id === id);

  const isFavorite = favoriteActivitiesList.find(
    (favActivity) => favActivity._id === id
  )?.isFavorite;

  async function confirmDeleteActivity() {
    setIsModalOpen(false);
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate();
      router.push("/");
      toast.success("Activity deleted successfully!");
    }
  }

  async function handleDeleteActivity() {
    setIsModalOpen(true);
  }
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {activity ? (
        <ActivityDetails
          activity={activity}
          onDeleteActivity={handleDeleteActivity}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <p>Activity not found</p>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteActivity}
      >
        Are you sure you want to delete this activity?
      </ConfirmModal>
    </>
  );
}
