import React , {useState, useEffect} from 'react';
import { View, Keyboard,Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function WalkRecord(){
    const navigation = useNavigation();
    const route = useRoute();
    const { info } = route.params;
    const {time} = route.params;

    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedMinute, setSelectedMinute] = useState(null);
    const [selectedSecond, setSelectedSecond] = useState(null);
  
    // useEffect를 사용하여 초기 값을 설정
    useEffect(() => {
      if (time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        setSelectedHour(hours);
        setSelectedMinute(minutes);
        setSelectedSecond(seconds);
      }
    }, [time]);

    const hours = Array.from({ length: 24 }, (v, k) => ({ label: String(k).padStart(2, '0'), value: k }));
    const minutes = Array.from({ length: 60 }, (v, k) => ({ label: String(k).padStart(2, '0'), value: k }));
    const seconds = Array.from({ length: 60 }, (v, k) => ({ label: String(k).padStart(2, '0'), value: k }));
  
  
  

    const [text, setText] = useState('');
    const [isModified, setIsModified] = useState(false);
    
    useEffect(() => {
        // Check if there are any changes in the input or counts
        setIsModified(text !== '');
    }, [text]);
    

    return (
        <StyledView>
            <TitleWrap>
                <Title>{info}</Title>
                <ReLoadBtn>
                    <ReLoadImg source={require('../../assets/Home/reLoadIcon.png')}/>
                </ReLoadBtn>
            </TitleWrap>
            <Line/>
            <TypeText>사료 추가</TypeText>
            <RowView>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedHour(value)}
                    items={hours}
                    placeholder={{ label: 'Hour', value: null }}
                    value={selectedHour}
                    style={pickerSelectStyles}
                />
                <Component>시간</Component>


                <RNPickerSelect
                    onValueChange={(value) => setSelectedMinute(value)}
                    items={minutes}
                    placeholder={{ label: 'Minute', value: null }}
                    value={selectedMinute}
                    style={pickerSelectStyles}
                />
                <Component>분</Component>

                <RNPickerSelect
                    onValueChange={(value) => setSelectedSecond(value)}
                    items={seconds}
                    placeholder={{ label: 'Second', value: null }}
                    value={selectedSecond}
                    style={pickerSelectStyles}
                />
                <Component>초</Component>
            </RowView>


            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <TypeText>메모</TypeText>
            <InputWrap>
            <InputMemo
                value={text}
                onChangeText={setText}
                placeholder="내용을 입력하세요"
                placeholderTextColor="#d9d9d9"
                multiline={true} /* 여러 줄 입력을 허용 */
            />
            </InputWrap>
            <CompleteBtn disabled={!isModified} isModified={isModified}>
                <CompleText >완료하기</CompleText>

            </CompleteBtn>

        </View>
        </TouchableWithoutFeedback>
        </StyledView>
      );

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      fontWeight : 'bold',
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      textAlign: 'center',
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      marginBottom: 20,
      width: 200,
      textAlign: 'center',
    },
  });


const StyledView = styled.View`
    width : 85%;
    height : 100%;
    display : flex;
    align-self : center;
`;

const Line = styled.View`
    background-color : #d0d0d0;
    width : 100%;
    height : 1px;
    align-self : center;
    margin : 10px 0 ;
`;
const TypeText = styled.Text`
    font-size : ${props => props.size || '15px'};
    font-weight : ${props => props.weight || 'regular'};
    color : ${props => props.color || 'black'};
    margin-right : 20px;
;`
const InputWrap = styled.View`
    width : 95%;
    height : 200px;
    margin : 20px 0;
    align-self : center;
    border: 1px solid #989898;
    border-radius : 10px;
    padding : 10px;
`;
const InputMemo = styled.TextInput`
  width : 100%;
  height : 100%;
  font-size: 15px;
  color: black;
`;
const CompleteBtn = styled.TouchableOpacity`
    width :150px;
    height : 40px;
    background-color: ${props => props.isModified ? '#139989' : '#d9d9d9'};
    align-self : center;
    border-radius : 10px;
    justify-content : center;
    align-items : center;
    margin-top : 10px;
    margin-bottom : 30px;
`;
const CompleText = styled.Text`
    font-size:20px;
    font-weight : bold;
    color : white;
`;
const RowView = styled.View`
    width : 100%;
    display : flex;
    flex-direction : row;
    align-items : center;
    margin : 5px 0 ;
`;
const Component = styled.Text`
    font-size : 20px;
    font-weight : bold;
    margin-right : 10px;
    text-align : center;
    color : ${props => props.color || 'black'};
`;
const CountBtn = styled.TouchableOpacity`
    width : 22px;
    height : 22px;
    margin : 5px;
    background-color : #139989;
    border-radius : 50px;
    justify-content : center;
    
`;
const BtnImg = styled.Image`
    width : 100%;
    height : 100%;
`;
const InputKg = styled.TextInput`
    font-weight : bold;
    font-size : 20px;
    align-items: center;
    margin-right : 10px;
`;

const ColorBtn = styled.TouchableOpacity`
    width :30px;
    height:30px;
    border : ${({ selected }) => (selected ? '3px solid #139989' : '1px solid #B3B3B3')};
    border-radius : 50px;
    margin : 10px 10px 10px 0;
    background-color : ${props=>props.color || "white"};
`;
const StatusBtnWrap = styled.View`
    width : 50px;
    margin-right : 15px;
`
const StatusBtn = styled.TouchableOpacity`
    width : 50px;
    height : 50px;
    border : ${({ selected }) => (selected ? '3px solid #139989' : '1px solid #B3B3B3')};
    border-radius : 50px;
    margin : 10px 10px 0 0;
    justify-content : center;
    align-items : center;
`;
const StatusImg = styled.Image`
    width :85%;
    height : 85%;
    resize-mode : cover;
`
const StatusText = styled.Text`
    text-align : center;
    font-size : 12px;
    margin : 5px 0;
`;
const ColorImg = styled.Image`
    width : 100%;
    height : 100%;
`;
const XLine = styled.View`
    width : 2px;
    height : 100%;
    background-color : red;
    transform: rotate(45deg);
    align-self : center;
`;
const TextBtn = styled.TouchableOpacity`
    margin : 5px 0;
    
`;
const TitleWrap = styled.View`
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-top : 15px;
`;
const Title=styled.Text`
    font-size : 25px;
    font-weight : bold;
`;
const ReLoadBtn = styled.TouchableOpacity`
    width : 22px;
    height : 22px;
    margin-left : auto;
    margin-right : 0;
`;
const ReLoadImg = styled.Image`
    width : 100%;
    height : 100%;
    
`;