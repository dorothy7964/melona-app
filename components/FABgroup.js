import React, {  useState} from "react";
import PropTypes from "prop-types";
import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const FABgroup =  ({ text, select, SearcheSelect, writeSelect }) => {
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
                        backgroundColor: "#b9dd39"
                    }}
                    actions={[
                        { icon: 'plus', onPress: () => navigation.navigate("WriteNavigation", { writeSelect }) },
                        { icon: 'account-search', label: '찾기', onPress: () => navigation.navigate("SearchNavigation", { SearcheSelect }) },
                        { icon: 'account-multiple-check', label: `${text}`,  onPress: () => navigation.navigate("ConfirmNavigation", { select }) },
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

FABgroup.propTypes = {
    text: PropTypes.string.isRequired,
    select: PropTypes.string.isRequired,
    SearcheSelect: PropTypes.string.isRequired,
    writeSelect: PropTypes.string.isRequired,
};

export default FABgroup;