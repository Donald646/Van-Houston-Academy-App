import { supabase } from "../../lib/supabase"

export const userInfo = async() => {
    const {data, error} = await supabase.from("profiles").select("*")
    if (error){
        console.log(error.message)
    }else{
        return data[0]
    }
}
