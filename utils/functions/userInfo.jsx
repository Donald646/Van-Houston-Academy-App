export const userInfo = async(supabase) => {
    const {data, error} = await supabase.from("profiles").select("*")
    if (error){
        console.log(error.message)
    }else{
        return data[0]
    }
}
