import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import IconTab from "../../componentsConfirm/IconTab";
import ApplyRes from "../../componentsConfirm/ApplyRes";
import ApplyReq from "../../componentsConfirm/ApplyReq";

export default () => {
    const [tab, setTab] = useState("applyRes");
    const [refreshing, setRefreshing] = useState(false);
    
    const refresh = async () => {
        try {
            setRefreshing(true);
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
            <IconTab 
                tab={tab}
                setTab={setTab}
                anotherPage={true}
            />
            {tab === "applyRes"
                ?   <ApplyRes 
                        tab="daughter"
                    />
                :   <ApplyReq />
            }
        </ScrollView>
    );
};