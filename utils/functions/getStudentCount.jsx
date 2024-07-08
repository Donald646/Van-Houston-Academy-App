export const getStudentCount = async (supabase) => {
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .eq("role", "student");
  
    if (error) {
      console.error(error);
      return 999; // or throw error, depending on your error handling strategy
    } else {
      return count;
    }
  };