import React, {  useState } from "react";
import PropTypes from "prop-types";
import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";

const FABgroupRoom =  ({ writeSelect, SearcheSelect }) => {
    const navigation = useNavigation();    
    const [open, setOpen] = useState(false);

    const onStateChange = ({ open })=> {
        setOpen(!open);
        if(open === true) {
            return setOpen(open);
        } else {
            return setOpen(false);
        }
    };

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? 'close' : 'menu'}
                    color="#fff"
                    fabStyle={{
                        backgroundColor: styles.melonaColor
                    }}
                    actions={[
                        { 
                            icon: 'plus', 
                            onPress: () => navigation.navigate(
                                "WriteNavigation", { writeSelect }) 
                        },{ 
                            icon: 'account-search', 
                            label: '친구 목록 보기', 
                            onPress: () => navigation.navigate(
                                "SearchNavigation", { SearcheSelect }) 
                        }
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </Portal>
        </Provider>
    );
}

FABgroupRoom.propTypes = {
    SearcheSelect: PropTypes.string.isRequired,
    writeSelect: PropTypes.string.isRequired,
};

export default FABgroupRoom;