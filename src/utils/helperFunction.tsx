const getUserId = () => {
  // Check if window object is available (indicates client-side)
  if (typeof window !== "undefined") {
    // Retrieve userId from local storage (assuming key is "profile")
    const user = JSON.parse(localStorage.getItem("profile")!);
    return user;
  } else {
    // Handle case where window is not defined (server-side)
    console.log("Window is undefined (server-side)");
    return null; // Or any default value you prefer
  }
};

export default getUserId;

export const truncateText = (text: string, limit: number) => {
  if (text?.length > limit) return text.slice(0, limit) + "...";
  return text;
};
