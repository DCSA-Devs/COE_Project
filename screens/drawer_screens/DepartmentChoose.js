// import React, { Component } from 'react';
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
// } from 'native-base';
// import { TouchableOpacity } from 'react-native';
// let helperArray = require('../../userList.json');
// export default class DepartmentChoose extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allUsers: helperArray,
//       usersFiltered: helperArray,
//     };
//   }
//   componentDidMount() { }
//   searchUser = text => {
//     this.setState({
//       usersFiltered: this.state.allUsers.filter(i =>
//         i.name.toLowerCase().includes(text.toLowerCase()),
//       ),
//     });
//   };

//   render() {
//     return (
//       <Container>
//         <Header searchBar rounded>
//           <Item>
//             <Icon name="ios-search" />
//             <Input
//               placeholder="Search"
//               onChangeText={text => this.searchUser(text)}
//             />
//           </Item>
//         </Header>
//         <Content>
//           {this.state.usersFiltered.map(item => (
//             <TouchableOpacity onPress={() => { props.navigation.navigate('DepartmentScreen', item.name) }}>
//               <ListItem avatar>
//                 <Left>
//                   <Image source={require("../../assets/images/Ebooks.png")}
//                     style={{ height: 20, width: 20 }}
//                   />
//                 </Left>
//                 <Body>
//                   <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
//                   <Text style={{ fontWeight: '300' }} >{item.class}</Text>
//                   <Text style={{ fontWeight: '300' }}>{item.semester}</Text>
//                 </Body>
//                 <Right style={{ justifyContent: 'center' }}>
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