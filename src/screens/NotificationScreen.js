import React, { useContext, useEffect, useState } from "react";
import { View, SectionList, TouchableOpacity } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { Context as NotificationContext } from "../context/NotificationContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import AppHeader from "../components/AppHeader";
import { secondaryColor, captionColor } from "../utils/Colors";

const NotificationScreen = () => {
  const {
    state: { notifications, notificationsLength },
    fetchNotifications,
  } = useContext(NotificationContext);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    if (refreshing) {
      fetchNotifications({ page });
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <>
      <AppHeader title="Notificaciones" />

      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: secondaryColor,
              flexDirection: "row",
              padding: 10,
              paddingTop: 15,
            }}
          >
            <Icon
              raised
              size={18}
              name="calendar-week"
              color={captionColor}
              style={{ padding: 3 }}
            />
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <ListItem
              title={item.title}
              subtitle={item.messageBody}
              rightSubtitle={item.sendDate}
              leftAvatar={{ source: require("../../assets/logo.png") }}
              bottomDivider
              chevron
            />
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setPage(0);
        }}
        onEndReachedThreshold
        onEndReached={() => {
          if (notificationsLength >= 25) {
            setRefreshing(true);
            setPage((current) => current + 1);
          }
        }}
      />
    </>
  );
};

export default NotificationScreen;
