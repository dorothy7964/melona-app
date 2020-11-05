import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { useLogOut } from "../../AuthContext";
import Loader from "../../components/Loader";
import ProfileBox from "../../components/ProfileBox";
import ProfileEditBox from "../../components/ProfileEditBox";
import ProfileLoadingtBox from "../../components/ProfileLoadingtBox";
import { ME } from "./TabsQueries";

export default () => {
    const logOut = useLogOut();
    const { data, loading, refetch } = useQuery(ME);
    const [editBt, setEditBt] = useState(false);
    const [loadingBt, setLodaingBt] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLogOut = async() => {
        try {
            Alert.alert("로그아웃이 되었습니다.")
            await logOut();
        } catch (e) {
            console.log(e);
        }
    };

    const toggleLoadingBt = (bool) => {
        setLodaingBt(bool)
    };

    const toggleEditAvatar = (bool) => {
        setEditBt(bool)
    }

    useEffect(() => {
        refresh();
    }, []);
    
    if (loading) {
        return  <Loader />

    } else if (!loading && data && data.me) {
        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                }
            >
                {loadingBt
                    ?   <ProfileLoadingtBox 
                            avatarMe={data.me.avatar}
                            emailMe={data.me.email}
                        />
                    :   editBt
                        ?   <ProfileEditBox
                                loadingBt={loadingBt}
                                avatarMe={data.me.avatar}
                                toggleLoadingBt={toggleLoadingBt}
                                toggleEditAvatar={toggleEditAvatar}
                            />
                        :   <ProfileBox 
                                avatarMe={data.me.avatar}
                                userNameMe={data.me.userName}
                                emailMe={data.me.email}
                                loadingBt={loadingBt}
                                handleLogOut={handleLogOut}
                                toggleLoadingBt={toggleLoadingBt}
                                toggleEditAvatar={toggleEditAvatar}
                            />
                }
            </ScrollView>
        );
    }
};