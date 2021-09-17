import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from "react-native";
import { fetchEpisodeById, getCharacter } from "../utils/Network";
import {styles} from "../utils/Styles";
import {baseUrl} from "../../package.json"

/*
* @classdesc CharacterDetailScreen class. This class will render character details from the Rick and Morty Show.
* */
class CharacterDetailScreen extends React.Component{
  constructor(props) {
    super(props);

    this.url = this.props.route.params.url;
    this.state = {
      characterDetail : null,
      episodes: null,
      isLoaded: false
    }
  }

  componentDidMount = async () => {
    const character = await getCharacter(this.url)
    const episodes = character.episode
    const ids = episodes.map(e =>  e.replace(baseUrl+"episode/", ""))
    const tempArr = []
    for(let id of ids){
      const episode = await fetchEpisodeById(id)
      tempArr.push(episode)
    }

    this.setState({characterDetail: character, episodes: tempArr, isLoaded: true})
  }

  /*
  * This is a function that creates items list of episodes.
  * @param {obj} obj - informations for rendering item.
  * @returns {component} - list item component that includes episodes of the character.
  * */
  renderListItem = (obj) =>{
    return(
      <View style={styles.listItem}>
        <View style={styles.listItemRow}>
          <Text>Name: </Text>
          <Text>{obj.item.name}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Episode: </Text>
          <Text>{obj.item.episode}</Text>
        </View>
      </View>
    )
  }

  render() {
    if(!this.state.isLoaded){
      return(
        <SafeAreaView>
          <Text style={styles.loadingText}>Loading...</Text>
        </SafeAreaView>
      )
    }

    return(
      <SafeAreaView style={styles.container}>
        <Image source={{uri: this.state.characterDetail.image}} style={[styles.image, {marginTop: 20, width: 100, height: 100}]}/>
        <View style={styles.listItemRow}>
          <Text>Name: </Text>
          <Text>{this.state.characterDetail.name}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Gender: </Text>
          <Text>{this.state.characterDetail.gender}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Species: </Text>
          <Text>{this.state.characterDetail.species}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Origin: </Text>
          <Text>{this.state.characterDetail.origin.name}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Status: </Text>
          <Text>{this.state.characterDetail.status}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Location: </Text>
          <Text>{this.state.characterDetail.location.name}</Text>
        </View>
        <Text style={{marginLeft: 10, marginBottom: 10}}>Episodes</Text>
        <FlatList data={this.state.episodes} renderItem={this.renderListItem} keyExtractor={obj =>  obj.id} showsVerticalScrollIndicator={false} />
      </SafeAreaView>
    )
  }

}

export default CharacterDetailScreen
