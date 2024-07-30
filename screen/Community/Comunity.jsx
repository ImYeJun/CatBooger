import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, SafeAreaView, Alert, Pressable, TextInput } from "react-native";
import styled from "styled-components/native";
import { HorizontalLine, LikeTag, ScrapeTag } from "./CommunityCommonStyles.jsx";
import {Posts, originPosts, setOriginPosts} from './CommunityCommonData.jsx'

/**이미지 데이터 */
xIcon = require('../../assets/community/x_icon.png');
penIcon = require('../../assets/community/pen_icon.png');

// 태그 데이터
const initialAnimalTags = [
  { name: "강아지", isSelected: false },
  { name: "고양이", isSelected: false },
];
const initialCategoryTags = [
  { name: "QnA", isSelected: false },
  { name: "건강", isSelected: false },
  { name: "간식", isSelected: false },
  { name: "일상", isSelected: false },
];

const Community = ({ navigation }) => {
  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);
  /**태그를 눌렀을 때, 태그가 활성화 되어있는 상태면 끄고, 비활성화 된 상태면 키는 함수 */
  const SelectTag = (tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
  };
  /**태그 초기화 버튼에 해당하는 기능을 담은 함수 */
  const ResetTag = () => {
    const resetAnimalTags = animalTags.map((tag) => ({ ...tag, isSelected: false }));
    setAnimalTags(resetAnimalTags);

    const resetCategoryTags = categoryTags.map((tag) => ({ ...tag, isSelected: false }));
    setCategoryTags(resetCategoryTags);
  };
  

  /**커뮤니티의 상단 부분을 담는 태그 */
  const CommunityTopContainer = () => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/**커뮤니티 제목을 담는 태그 */}
      <Text style={{fontSize: 25, fontWeight:'bold'}}>커뮤니티</Text>
      
      {/**커뮤니티 검색 버튼을담는 태그*/}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={isSearchingBoxOpened ? closeSearching : openSearching}>
          <Image source={require('../../assets/community/search_logo.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      {/**커뮤니티 필터 버튼을 담는 태그*/}
        <TouchableOpacity onPress={OpenFilter}>
          <Image source={require('../../assets/community/filter_logo.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  /**커뮤니티 창에서 태그를 띄우는 부분을 담는 태그*/
  const CommunityTagsContainer = () => (
    <View style={{ gap: 3, flexDirection: 'row', flexWrap: 'wrap'}}>
      {/**동물 태그들을 띄우는 태그 */}
      <View style={{ flexDirection: "row", gap: 5 }}>
        {animalTags.map((tag, index) => (
          tag.isSelected && (
            <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
              <View style={{ borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: 60, height: 25, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                <Text style={{ textAlign: 'center', color:'#595959' }}>{tag.name}</Text>
                <Image source={xIcon} style={{width:15, height:15}}/>
              </View>
            </TouchableOpacity>
          )
        ))}
      </View>

      {/**카테고리 태그들을 띄우는 태그 */}
      <View style={{ flexDirection: "row", gap: 5}}>
        {categoryTags.map((tag, index) => (
          tag.isSelected && (
            <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
              <View style={{ borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: 60, height: 25, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                <Text style={{ textAlign:'center', color:'#595959'}}>{tag.name}</Text>
                <Image source={xIcon} style={{width:15, height:15}}/>
              </View>
            </TouchableOpacity>
          )
        ))}
      </View>
    </View>
  );

  /**활성화된 태그들을 가져오는 함수 */
  const getSelectedTags = (tags) => tags.filter(tag => tag.isSelected).map(tag => tag.name);

  /**게시물 데이터를 필터링하는 함수 */
  const filterPosts = () => {
    const selectedAnimalTags = getSelectedTags(animalTags);
    const selectedCategoryTags = getSelectedTags(categoryTags);

    // 모든 태그가 비활성화된 경우 모든 게시물을 반환
    if (selectedAnimalTags.length === 0 && selectedCategoryTags.length === 0) {
      return Posts;
    }

    // 활성화된 태그와 일치하는 게시물을 필터링
    return Posts.filter(post =>
      post.tags.some(tag => selectedAnimalTags.includes(tag) || selectedCategoryTags.includes(tag))
    );
  };

  /**필터링된 게시물 데이터를 반환 */
  const filteredPosts = filterPosts();

  /**게시물을 렌더링하는 함수 */
  const PostsTag = (postsData) => {
    // 선택된 태그를 가져옴
    const selectedAnimalTags = getSelectedTags(animalTags);
    const selectedCategoryTags = getSelectedTags(categoryTags);
    // 게시물을 필터링함
    const filteredPosts = filterPosts(postsData, selectedAnimalTags, selectedCategoryTags);
    return (
      filteredPosts.map((postData, index) => (
        <Post key={index}>
          <StyledButton onPress={() => MoveToPost(postData)} style={{flexDirection:'row', alignItems:'center', gap: 5}}>
            <View style={{flex:3}}>
                  <PostTitle numberOfLines={1} ellipsizeMode="tail">
                  {postData.tags.includes("QnA")
                  ? 
                    <Text >Q. {postData.title}</Text>
                  : 
                    <Text>{postData.title}</Text>}
                  </PostTitle>
 
                  <PostContent numberOfLines={2} ellipsizeMode="tail">{postData.content}</PostContent>
                  <TagsContainer>
                  {postData.tags.map((tag, index) => (
                  <Tag key={index}>{'#' + tag}</Tag>
                ))}
              </TagsContainer>
              <PostUnderContent>
                <NickNameText>{postData.profileNickName}</NickNameText>
                <LikeTag likeNumber={postData.likeNumber} />
                <ScrapeTag scrapeNumber={postData.scrapeNumber} />
              </PostUnderContent>
            </View>

            {postData.img !== null ? <PostImg source={postData.img}/> : null}
          </StyledButton>
          <HorizontalLine />
        </Post>
      ))
    );
  };

  /**검색 모달창의 열고 닫음에 대한 State*/
  const [isSearchingBoxOpened, setIsSearchingBoxOpened] = useState(false);
  /**검색 모달창을 여는 함수 */
  const  openSearching = () => setIsSearchingBoxOpened(true);
  /**검색 모달창을 닫는 함수 */
  const  closeSearching = () => setIsSearchingBoxOpened(false);
  /**검색창에서 입력한 내용에 대한 State */
  const [searchingText, setSearchingText] = useState("")

  /** 검색창 대한 모든 정보를 담은 태그 */
  const SearchingBox = () => {
    return (
      isSearchingBoxOpened 
      ?
        <View style={{
          position:'absolute', bottom : 0, width : '100%',
          width : '100%', borderTopWidth : 3, backgroundColor : '#ffffff', borderColor : '#c2c2c25c'}}>
          <View style={{paddingLeft : 5 ,margin : 10,borderWidth : 2, borderRadius : 10 , backgroundColor:'#ffffffed', margin : 10}}>
            <TextInput 
            value={searchingText}
            onChangeText={(newText) => {setSearchingText(newText)}}
            placeholder="게시물 검색" autoFocus={true} multiline={true} 
            style={{height : 40}}></TextInput>
          </View>
        </View>
      : null
    )
  }


  /**필터 모달창의 열고 닫음에 대한 State */
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  /**필터 모달창을 여는 함수 */
  const OpenFilter = () => setIsFilterOpened(true);
  /**필터 모달창을 닫는 함수 */
  const CloseFilter = () => setIsFilterOpened(false);
  /**필터 모달창에 해당하는 태그 */
  const FilterModalTag = () => (
    <Modal 
      visible={isFilterOpened} 
      onRequestClose={CloseFilter}
      transparent={true}
      animationType="fade"
    >
        <FilterContainer onPress={CloseFilter}>
          <FilterContent>
            {/**제목에 해당하는 태그 */}
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <TouchableOpacity onPress={CloseFilter}> 
                <Image source={require("../../assets/community/x_icon.png")} style={{width:20, height: 20}}/>
              </TouchableOpacity>
              <Text style={{fontSize:25, textAlign: 'center', fontWeight:'bold'}}>
                필터
              </Text>
            </View> 

            <HorizontalLine/>

            <Text style={{fontSize: 18, fontWeight:'bold'}}>동물</Text>
            {/**동물 태그들을 담은 태그 */}
            <HorizontalLine/>
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap"}}>
              {animalTags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
                  <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 50, height: 25 }}>
                    <Text style={{ textAlign: 'center', color: tag.isSelected ? '#139989' : 'black'}}>{tag.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={{fontSize: 18, marginTop: 10, fontWeight:'bold'}}>카테고리</Text>

            <HorizontalLine/>

            {/**카테고리 태그들을 담은 태그 */}
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap"}}>
              {categoryTags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                  <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 40, height: 25 }}>
                    <Text style={{ textAlign: 'center', color: tag.isSelected ? '#139989' : 'black'}}>{tag.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <HorizontalLine/>

            {/** 필터창 내에서 선택한 태그들을 보게 해주는 태그 */}
            <View style={{ gap: 3, flexDirection: 'row', flexWrap: 'wrap'}}>
            {/** 선택한 동물 태그들을 보여줌 */}
              <View style={{ flexDirection: "row", gap: 5 }}>
                {animalTags.map((tag, index) => (
                  tag.isSelected && (
                    <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
                      <View style={{ borderWidth: 1, borderColor: '#139989', borderRadius: 5, backgroundColor: '#139989', width: 60, height: 25, flexDirection:'row', alignItems :'center', justifyContent:'space-evenly'}}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>{tag.name}</Text>
                        <Image source={xIcon} style={{width:15, height:15}}/>
                      </View>
                    </TouchableOpacity>
                  )
                ))}
              </View>
          
            {/** 선택한 카테고리 태그들을 보여줌 */}
              <View style={{ flexDirection: "row", gap: 5, flexWrap:'wrap'}}>
                {categoryTags.map((tag, index) => (
                  tag.isSelected && (
                    <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                      <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, backgroundColor: '#139989', width: 60, height: 25, flexDirection :'row', alignItems :'center', justifyContent:'space-evenly'}}>
                        <Text style={{ textAlign: 'center', color: 'white'}}>{tag.name}</Text>
                        <Image source={xIcon} style={{width:15, height:15}}/>
                      </View>
                    </TouchableOpacity>
                  )
                ))}
              </View>

            </View>
            
            {/**초기화 버튼을 담은 태그 */}
            <View style={{alignItems:'center', justifyContent : 'flex-end', flex : 1}}>
              <TouchableOpacity onPress={() => ResetTag()}>
                <View style={{borderWidth :2, borderColor:'#D9D9D9', borderRadius : 5, padding : 2, marginBottom : 20}}>
                  <Text style={{fontSize : 20, color : '#595959'}}>
                    초기화
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </FilterContent>
        </FilterContainer>
    </Modal>
  );

  /**글쓰기 버튼에 해당하는 태그 */
  const WritePostButton = () => {
    return(
      <TouchableOpacity 
      onPress={MoveToWritingPost}
      style={{
        position:'absolute', 
        bottom:20, right:20, 
        backgroundColor:'#ffffff90',
        flexDirection:'row', 
        justifyContent:'space-around', 
        borderWidth:1, 
        borderRadius:5, 
        padding : 1}}
        >
        <Image source={penIcon} style={{width:40,height:40}}/>
      </TouchableOpacity>
    )
  }
  
  /**-------------------------------커뮤니티 화면-------------------------------*/
  const MoveToPost = (data) => navigation.navigate('CommunityPost', {postData : data});
  const MoveToWritingPost = () => navigation.navigate('CommunityWritingPost')
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{ backgroundColor: 'white'}}>
        <StatusBar />
        
        <CommunityContainer>
          <CommunityTopContainer />
          <HorizontalLine />
          <CommunityTagsContainer />

          <PostsTag postsData={filteredPosts}/>

          <FilterModalTag />
        </CommunityContainer>
      </ScrollView>

      <WritePostButton/>
      <SearchingBox/>
    </SafeAreaView>
  );
};

const CommunityContainer = styled.View`
  border-radius: 5px;
  margin: 15px;
  flex : 1;
`;

const StyledButton = styled.TouchableOpacity`
`;

const Post = styled.View`
  margin: 0px 10px;
`;

const PostTitle = styled.Text`
  font-size: 17px;
`;

const PostContent = styled.Text`
  font-size: 13px;
  color: #787878;
  margin: 5px 0px;
`;

/**--게시물에 등록된 사진을 담을 태그--*/
const PostImg = styled.Image`
  border: 2px solid #78787850;
  border-radius : 10px;
  width : 75px;
  height : 75px;
  flex:1;
`;


const PostUnderContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const NickNameText = styled.Text`
  flex-wrap: wrap;
  text-align: center;
  font-size: 13px;
`;

const FilterContainer = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FilterContent = styled.Pressable`
  width: 70%;
  height: 100%;
  background-color: white;
  padding: 20px;
`;

/**----게시물의 모든 태그들을 담을 컨테이너----*/
const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

/**--한 게시물 태그의 텍스트를 담을 태그--*/
const Tag = styled.Text`
  color: #139989;
  font-size: 13px;
  margin-right: 5px;
  line-height: 20px;
`;


export default Community;