import React, {  useState} from "react";
import PropTypes from "prop-types";
import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles";

const FABgroupScreen =  ({ 
    text, 
    select, 
    SearcheSelect, 
    writeSelect ,
    groupRoomId,
}) => {
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
                                `${writeSelect}`, { groupRoomId }) 
                        },{ 
                            icon: 'account-search', 
                            label: '찾기', 
                            onPress: () => navigation.navigate(
                                `${SearcheSelect}`, { groupRoomId }) 
                        },{ 
                            icon: 'account-multiple-check', 
                            label: `${text}`,  
                            onPress: () => navigation.navigate(
                                `${select}`, { groupRoomId }) 
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

FABgroupScreen.propTypes = {
    text: PropTypes.string.isRequired,
    select: PropTypes.string.isRequired,
    SearcheSelect: PropTypes.string.isRequired,
    writeSelect: PropTypes.string.isRequired,
    groupRoomId: PropTypes.string.isRequired,
};

export default FABgroupScreen;