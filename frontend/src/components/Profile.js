import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "./AxiosAPI";
import UpdateProfile from "./UpdateProfile";


const Profile = () => {

    const { slug } = useParams();

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/users/profile/${slug}`).then((res) => {
            const data = res.data;
            setProfile(data);
        })
    }, [])


    return (
        <div>
            
            { profile && 
                <div>
                    { slug }
                    <br />
                    { profile.bio }
                    { profile.id }
                    <hr />
                    Tu bedzie update:
                    <br />
                    <UpdateProfile value={ profile.user } />
                </div> 
            }
            {/* { profile.user.username } */}
            {/* since there is only one field in the Profile API, I can't map over it */}
            {/* { profile && profile.map((item) => (
                <div>
                    { item.bio }
                </div>
            ))} */}
        </div>
    )
}

export default Profile;