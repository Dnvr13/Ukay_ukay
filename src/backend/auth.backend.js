import supabase from "../config/supabase.config";
import Cookies from 'js-cookie';


export const loginBackend = async (emailOrUsername, password) => {
    try {
        const { data, error } = await supabase
            .from("customers")
            .select("id,username")
            .or(`username.eq.${emailOrUsername},email.eq.${emailOrUsername}`)
            .eq("password", password);

        if (error) {
            throw new Error(`Error occurred: ${error.message}`);
        }

        if (data.length === 0) {
            return { success: false, message: "Invalid credentials." };
        }
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 3);
        Cookies.set("token", `${data[0].id}-${data[0].username}`, { expires:expirationDate });
        return { success: true, data };
    } catch (err) {
        return { success: false, message: err.message };
    }
};


export const signupBackend = async (username, password) => {
    try {

        const { data, error: fetchError } = await supabase
            .from("customers")
            .select("username")
            .eq("username", username);

        if (fetchError) {
            throw new Error(`Error fetching username: ${fetchError.message}`);
        }

        if (data.length > 0) {
            return { success: false, message: "Username is already taken!" };
        }
     
        const { error: insertError } = await supabase
            .from('customers')
            .insert({ username, password });

        if (insertError) {
            throw new Error(`Error inserting user: ${insertError.message}`);
        }

        return { success: true, message: "You registered successfully!" };

    } catch (error) {
        return { success: false, message: error.message };
    }
};


export const logoutBackend = ()=>{
    const token = Cookies.get("token")
    if(token)
        Cookies.remove("token")    
}


