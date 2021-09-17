import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from "react-native";
import { fetchEpisodeById, getCharacter } from "../utils/Network";
import {styles} from "../utils/Styles";

/*
* @classdesc EpisodeDetailScreen class. This class will render episode details from the Rick and Morty Show.
* */
class EpisodeDetailScreen extends React.Component{
  constructor(props) {
    super(props);

    this.episodeId = this.props.route.params.episodeId;
    this.state = {
      episodeDetail: null,
      chars: null,
      isLoaded: false
    }
  }

  componentDidMount = async () =>{
    const episode = await fetchEpisodeById(this.episodeId)
    const characters = episode.characters
    const list = []
    for(let character of characters){
      const resp = await getCharacter(character)
      list.push(resp)
    }
    this.setState({episodeDetail: episode, chars: list, isLoaded: true})
  }

  /*
  * This is a function that creates items list of episodes.
  * @param {obj} obj - informations for rendering item.
  * @returns {component} - list item component that includes character informations of episode.
  * */
  renderListItem = (obj) =>{
    return(
      <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate("CharacterDetailScreen", {url: obj.item.url})}>
        <Image source={{uri: obj.item.image}} style={styles.image}/>
        <View style={styles.listItemRow}>
          <Text>Name: </Text>
          <Text>{obj.item.name}</Text>
        </View>
        <View style={styles.listItemRow}>
          <Text>Satatus: </Text>
          <Text>{obj.item.status}</Text>
        </View>
      </TouchableOpacity>
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
        <View style={styles.episodeIdentity}>
          <View style={[styles.identityRow, {marginTop: 15}]}>
            <Text>Name: </Text>
            <Text>{this.state.episodeDetail.name}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text>Episode: </Text>
            <Text>{this.state.episodeDetail.episode}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text>Air date: </Text>
            <Text>{this.state.episodeDetail.air_date}</Text>
          </View>
        </View>
        <Text style={{marginLeft: 20, marginBottom: 10}}>Episode Characters</Text>
        <FlatList data={this.state.chars} renderItem={this.renderListItem} keyExtractor={obj =>  obj.id} showsVerticalScrollIndicator={false} />
      </SafeAreaView>
    )

  }

}
export default EpisodeDetailScreen
