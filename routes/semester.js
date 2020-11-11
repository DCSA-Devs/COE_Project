import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Semester from '../screen/Semester';
import Semester_1 from '../screen/Semester_1';
import Semester_2 from '../screen/Semester_2';
import Semester_3 from '../screen/Semester_3';
import Semester_4 from '../screen/Semester_4';
import Semester_5 from '../screen/Semester_5';
import Semester_6 from '../screen/Semester_6';

const screens = {
  Semester: {
    screen: Semester
  },
  Semester_1: {
    screen: Semester_1
  },
  Semester_2: {
    screen: Semester_2
  },
  Semester_3: {
    screen: Semester_3
  },
  Semester_4: {
    screen: Semester_4
  },
  Semester_5: {
    screen: Semester_5
  },
  Semester_6: {
    screen: Semester_6
  }
}
const Note = createStackNavigator(screens);

export default createAppContainer(Note);