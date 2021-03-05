import axios from 'axios';

const GOOGLE_API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = 'https://tcmhack.in:5000/api/youtube';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';

export const getTrendingVideos = async () => {
  try {
    const result = await axios.get(BASE_URL + 'videos', {
      params: {
        maxResults: 24,
        regionCode: 'IN',
        key: GOOGLE_API_KEY,
        chart: 'mostPopular',
        part: 'snippet, contentDetails, statistics',
      },
    });

    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoInfo = async (videoId) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const result = await axios.post(`${API_BASE_URL}/info`, JSON.stringify({ videoId }), config);
    const { related_videos, formats, videoDetails } = result.data;
    return { related_videos, formats, videoDetails };
  } catch (error) {
    console.log(error);
  }
};

export const searchVideo = async (value) => {
  try {
    const result = await axios.get(BASE_URL + 'search', {
      params: { q: value, maxResults: 10, part: 'snippet', key: GOOGLE_API_KEY },
    });

    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteVideos = async () => {
  try {
    const yt_videos = localStorage.yt_videos ? JSON.parse(localStorage.yt_videos) : [];
    if (yt_videos.length === 0) return [];

    const result = await axios.get(BASE_URL + 'videos', {
      params: {
        regionCode: 'IN',
        key: GOOGLE_API_KEY,
        id: yt_videos.toString(),
        part: 'snippet, contentDetails, statistics',
      },
    });

    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const getChannelVideos = async (id) => {
  try {
    const params = { regionCode: 'IN', key: GOOGLE_API_KEY };
    const result = await axios.get(BASE_URL + 'channels', { params: { id, part: 'snippet, statistics', ...params } }); // Get Channel
    const result2 = await axios.get(BASE_URL + 'search', { params: { channelId: id, part: 'snippet', ...params } }); // Get Videos

    const videos = result2.data.items.filter((item) => item.id.videoId);

    return { channel: result.data.items[0], videos };
  } catch (error) {
    console.log(error);
  }
};

export const formatVideoDuration = (duration) => {
  return duration
    .replace('M', ':')
    .replace('H', ':')
    .replace(/[a-zA-Z]/g, '');
};

export const formatVideoViews = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.abs(Number(labelValue)) / 1.0e6 + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + 'K'
    : Math.abs(Number(labelValue));
};

export const newLineToBr = (string) => string.replace(/\n/g, '<br />');

export const addToFavorite = (videoId) => {
  let yt_videos = localStorage.yt_videos ? JSON.parse(localStorage.yt_videos) : [];
  yt_videos = yt_videos.includes(videoId) ? yt_videos.filter((v) => v !== videoId) : [...yt_videos, videoId];
  localStorage.yt_videos = JSON.stringify(yt_videos);
};

export const isFavorite = (videoId) => localStorage.yt_videos && JSON.parse(localStorage.yt_videos).includes(videoId);

export const getVideoThubmnailURL = (thumbnails, resoltion = null) => {
  if (resoltion && thumbnails[resoltion]) return thumbnails[resoltion].url;

  const { high, standard, medium, maxres } = thumbnails;
  if (standard) return standard.url;
  if (high) return high.url;
  if (medium) return medium.url;
  if (thumbnails.default) return medium.url;
  if (maxres) return maxres.url;
  return '';
};
