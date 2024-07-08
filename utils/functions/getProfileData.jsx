export const getProfileData = async (id, supabase) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("user_id", id);
    if (error) {
      console.log(error);
    } else {
      return data[0];
    }
  };