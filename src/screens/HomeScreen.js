import React from "react";
import {SafeAreaView, View, Text,FlatList, StyleSheet,Dimensions, Button, TouchableOpacity} from "react-native";
import { fetchEpisodes } from "../utils/Network";
import {baseUrl} from "../../package.json"
import {styles} from "../utils/Styles";

/*
* @classdesc HomeScreen class. This class will render all the episodes of Rick and Morty Show.
* */
class HomeScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      url: baseUrl+"episode",
      episodes: [],
    }
  }

  componentDidMount() {
    this.loadEpisodes()
  }

  /*
  * This is a function that load all episodes from network layer.
  */
  loadEpisodes = async () => {
    const episodes = await fetchEpisodes(this.state.url)
    let tempArr = [...this.state.episodes]
    for(let episode of episodes.results){
      tempArr.push(episode)
    }
    this.setState({episodes: tempArr, url: episodes.info.next, isLoaded: true})

  }

  /*
  * This is a function that creates items list of episodes.
  * @param {obj} obj - informations for rendering item.
  * @returns {component} - list item component that includes episode informations.
  * */
  renderListItem = (obj) =>{
    return(
          <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate("EpisodeDetailScreen", {episodeId: obj.item.id})}>
            <View style={styles.listItemRow}>
              <Text>Name: </Text>
              <Text>{obj.item.name}</Text>
            </View>
            <View style={styles.listItemRow}>
              <Text>Episode: </Text>
              <Text>{obj.item.episode}</Text>
            </View>
            <View style={styles.listItemRow}>
              <Text>Air date: </Text>
              <Text>{obj.item.air_date}</Text>
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
        <FlatList data={this.state.episodes} renderItem={this.renderListItem} keyExtractor={obj =>  obj.id} showsVerticalScrollIndicator={false} />
        {
          this.state.url &&
          <Button title="Load More" onPress={() => this.loadEpisodes()}/>
        }
      </SafeAreaView>
    )
  }

}

export default HomeScreen
