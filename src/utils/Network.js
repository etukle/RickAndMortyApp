import axios from 'axios';
import {baseUrl} from '../../package.json';

const api = axios.create({
  baseURL : baseUrl
})

api.interceptors.response.use(function(response) {
  return response
}, function(err) {
  return Promise.reject(err)
})

/*
* This is a function that receive all episodes.
* @param {string} url - url information for all episodes.
* @returns {object} - object containing all episodes.
* */
const fetchEpisodes = async (url) =>{
  const ep = url.replace(baseUrl, "")
  const resp = await api.get(ep)

  return resp.data
}

/*
* This is a function that receive single episode by id.
* @param {string} id - id of single episode.
* @returns {object} - object containing all the information about the episode.
* */
const fetchEpisodeById = async (id) =>{
  const resp = await api.get("episode/"+id)

  return resp.data
}

/*
* This is a function that receive single character.
* @param {string} url - url information for character.
* @returns {object} - object containing all the information about the character.
* */
const getCharacter = async (url) => {
  const resp = await api.get(url)
  if(!resp){
    return null
  }

  return resp.data
}

export{
  fetchEpisodes,
  fetchEpisodeById,
  getCharacter
}
