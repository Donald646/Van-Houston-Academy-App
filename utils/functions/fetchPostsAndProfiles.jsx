import { getProfileData } from "../../utils/functions/getProfileData";
import { userInfo } from "./userInfo";

export const fetchPostsAndProfiles = async (
  supabase,
  setError,
  setAnnouncements,
  page
) => {
  try {
    let newData;
    if (page === "home") {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2); // Limit to the latest 3 rows
      if (error) throw error;
      newData = data;
    } else if(page === "admin") {
      const currentUser = await userInfo(supabase)
      const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false })
      .limit(3)
      .eq("creator_id", currentUser.user_id )
      
      if (error) throw error;
      newData = data;
    } else {
      const { data, error } = await supabase.from("announcements").select("*");
      if (error) throw error;
      newData = data;
    }

    const announcementsWithProfiles = await Promise.all(
      newData.map(async (announcement) => {
        const profile = await getProfileData(announcement.creator_id, supabase);
        return { ...announcement, username: profile.username };
      })
    );

    setAnnouncements(announcementsWithProfiles);
  } catch (error) {
    setError("Error: " + error.message);
    setTimeout(() => {
      setError("");
    }, 5000);
  }
};
