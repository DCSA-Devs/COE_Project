// import React, { Component } from "react";
// import {
//   Container,
//   Header,
//   Content,
//   Left,
//   Body,
//   Icon,
//   Text,
//   ListItem,
//   Item,
//   Input,
//   Right,
// } from "native-base";
// import { TouchableOpacity } from "react-native";
// let helperArray = require("../../userList.json");
// export default class DepartmentChoose extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allUsers: helperArray,
//       usersFiltered: helperArray,
//     };
//   }
//   componentDidMount() {}
//   searchUser = (text) => {
//     this.setState({
//       usersFiltered: this.state.allUsers.filter((i) =>
//         i.name.toLowerCase().includes(text.toLowerCase())
//       ),
//     });
//   };

//   render() {
//     return (
//       <Container>
//         <Header searchBar rounded>
//           <Item>
//             <Icon name="key" />
//             <Input
//               placeholder="Search"
//               onChangeText={(text) => this.searchUser(text)}
//             />
//           </Item>
//         </Header>
//         <Content>
//           {this.state.usersFiltered.map((item) => (
//             <TouchableOpacity
//               onPress={() => {
//                 props.navigation.navigate("DepartmentScreen", item.name);
//               }}
//             >
//               <ListItem avatar>
//                 <Left>
//                   <Image
//                     source={require("../../assets/images/Ebooks.png")}
//                     style={{ height: 20, width: 20 }}
//                   />
//                 </Left>
//                 <Body>
//                   <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//                   <Text style={{ fontWeight: "300" }}>{item.class}</Text>
//                   <Text style={{ fontWeight: "300" }}>{item.semester}</Text>
//                 </Body>
//                 <Right style={{ justifyContent: "center" }}>
//                   <Icon name="arrow-forward" />
//                 </Right>
//               </ListItem>
//             </TouchableOpacity>
//           ))}
//         </Content>
//       </Container>
//     );
//   }
// }

// import React, { Component } from "react";
// import { Avatar, TextInput } from "react-native-paper";
// import { TouchableOpacity, View, Image } from "react-native";
// let helperArray = require("../../userList.json");
// export default class DepartmentChoose extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allUsers: helperArray,
//       usersFiltered: helperArray,
//     };
//   }
//   componentDidMount() {}
//   searchUser = (text) => {
//     this.setState({
//       usersFiltered: this.state.allUsers.filter((i) =>
//         i.name.toLowerCase().includes(text.toLowerCase())
//       ),
//     });
//   };

//   render() {
//     return (
//       <View>
//         <TextInput
//           placeholder="Search"
//           onChangeText={(text) => this.searchUser(text)}
//         />

//         {this.state.usersFiltered.map((item) => (
//           <TouchableOpacity
//             onPress={() => {
//               props.navigation.navigate("DepartmentScreen", item.name);
//             }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <Image
//                 source={require("../../assets/images/Ebooks.png")}
//                 style={{ height: 20, width: 20 }}
//               />
//               <View>
//                 <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//                 <Text style={{ fontWeight: "300" }}>{item.class}</Text>
//                 <Text style={{ fontWeight: "300" }}>{item.semester}</Text>
//               </View>
//               <Avatar.Icon name="arrow-forward" />
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   }
// }

import React from "react";
import { Avatar, Searchbar, Divider } from "react-native-paper";
import { TouchableOpacity, Text, View, Image } from "react-native";
let helperArray = require("../../userList.json");
import { Ionicons } from "@expo/vector-icons";
const IMAGE = {
  Arts: require("../../assets/images/subjects/arts.jpg"),
  Chemistry: require("../../assets/images/subjects/chemistry.jpg"),
  MCA: require("../../assets/images/subjects/computer.jpg"),
  MSC: require("../../assets/images/subjects/science.jpg"),
  PGDCA: require("../../assets/images/subjects/hindi.jpg"),
  English: require("../../assets/images/subjects/english.jpg"),
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
  );
}
