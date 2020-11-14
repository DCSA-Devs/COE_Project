import React from "react";
import { Avatar, Searchbar, Divider } from "react-native-paper";
import { TouchableOpacity, Text, View, Image } from "react-native";
let helperArray = require("../../userList.json");
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
const IMAGE = {
  Arts: require("../../assets/images/subjects/arts.jpg"),
  Chemistry: require("../../assets/images/subjects/chemistry.jpg"),
  MCA: require("../../assets/images/subjects/computer.jpg"),
  Msc: require("../../assets/images/subjects/computer.jpg"),
  PGDCA: require("../../assets/images/subjects/computer.jpg"),
  English: require("../../assets/images/subjects/english.jpg"),
  Hindi: require("../../assets/images/subjects/Hindi.jpg"),
  Maths: require("../../assets/images/subjects/maths.jpg"),
  Panjabi: require("../../assets/images/subjects/panjabi.jpg"),
  Pharmaceutical: require("../../assets/images/subjects/Pharmaceutical.jpg"),

};
export default function DepartmentChoose({ navigation }) {
  const [allUsers, setAllUsers] = React.useState(helperArray);
  const [usersFiltered, setUserFiltered] = React.useState(helperArray);
  const searchUser = (text) => {
    const filter = allUsers.filter((i) =>
      i.name.toLowerCase().includes(text.toLowerCase())
    );
    setUserFiltered(filter);
  };

  return (
    <ScrollView>
      <View style={{ margin: 10 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => searchUser(text)}
        />
        {usersFiltered.map((item) => (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.navigate ? item.navigate : "");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingVertical: 15,
                }}
              >
                <Image
                  source={IMAGE[item.class]}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  <Text style={{ fontWeight: "500" }}>{item.class}</Text>
                  <Text style={{ fontWeight: "500" }}>{item.semester}</Text>
                </View>
                <Ionicons
                  name="md-arrow-forward"
                  color="grey"
                  size={25}
                  style={{ marginRight: 10 }}
                />
              </View>
            </TouchableOpacity>
            <Divider />
          </>
        ))}
      </View>
    </ScrollView>
  );
}
