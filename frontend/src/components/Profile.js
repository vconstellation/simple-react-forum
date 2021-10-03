import { Container, Typography, Paper, Grid, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "./AxiosAPI";
import UpdateProfile from "./UpdateProfile";


const Profile = () => {

    // styles

    const pageStyles = {
        backgroundColor: 'white',
        marginTop: '50px',
        paddingTop: '15px',
        paddingBottom: '15px',
    }

    // end of styles

    const { slug } = useParams();

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/users/profile/${slug}`).then((res) => {
            const data = res.data;
            setProfile(data);
        })
    }, [])
    
    // get current logged user's PK

    const [username, setUsername] = useState(null);

    useEffect(() => {
        axiosInstance.get('api/forum/user/').then((res) => {
            const data = res.data;
            const username = data.pk;
            setUsername(username);
        })
    }, [])

    // onClickDisplayUpdate handler

    const [updateProfile, setUpdateProfile] = useState(false);

    const displayEditProfileHandler = () => {
        setUpdateProfile(!updateProfile);
    }


    return (
        <div>
            
            { profile && 
                <Container maxWidth='lg' style={pageStyles} >
                    <Typography component={Paper}>
                        <p style={{textAlign: 'center', fontSize: 'large'}}>Profile Page - { slug } </p>
                        <Grid container spacing={2} style={{textAlign: 'center'}}>
                            <Grid item xs={6}>
                                Bio
                                <hr />
                            </Grid>
                            <Grid item xs={6}>
                                Additional information
                                <hr />
                            </Grid>
                            <Grid item xs={6}>{ profile.bio }</Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>No. of posts:</Grid>
                                    <Grid item xs={6}> {profile.posts }</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        { profile.username }
                        { username == profile.user ? <Button variant='text' onClick={displayEditProfileHandler}>Update</Button> : ''}
                        { username == profile.user && updateProfile ? <UpdateProfile value={ profile.user } /> : ''}
                    </Typography>
                </Container>
                // <div>
                //     name:
                //     { slug }
                //     <br />
                //     bio:
                //     { profile.bio }
                //     <br />
                //     No. of posts:
                //     { profile.posts } 
                //     <hr />
                //     Tu bedzie update:
                //     <br />
                //     <UpdateProfile value={ profile.user } />
                // </div> 
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