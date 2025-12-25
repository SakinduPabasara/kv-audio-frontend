import { createClient } from "@supabase/supabase-js"

const anon_key = "sb_publishable_oKDJO1yAdQT4JPetEFfa9w_d8ecbPH8"
const supabase_url = "https://pgjssrcxddoagcaayffr.supabase.co"

const supabase = createClient(supabase_url, anon_key) // Create a single supabase client for interacting with your database

export default function mediaUpload(file){

    // if no file is selected,
    return new Promise((resolve, reject)=>{
        if(file == null){
            reject("No file selected");
        }

        const timestamp = new Date().getTime(); // to make the file name unique
        const fileName = timestamp + file.name; // to make the file name unique

        supabase.storage
          .from("images_")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false, // if a file with the same name exists, do not overwrite it
          })
          .then(() => {
            const publicUrl = supabase.storage
              .from("images_")
              .getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
          }).catch(()=>{
            reject("Error uploading file");
          })
    });

    
}


