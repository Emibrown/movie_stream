import { create } from 'zustand';
import { collection, getDocs, getFirestore } from '@react-native-firebase/firestore';

interface Video {
  id: string;
  videoUrl: string;
  title: string;
  thumbnail: string | null;
}

interface VideoState {
  videos: Video[];
  selectedVideoId: string | null;
  videoProgress: number | null;
  setSelectedVideo: (videoId: string, progress?: number) => void;
  loading: boolean;
  fetchVideos: () => Promise<void>;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  selectedVideoId: null,
  videoProgress: null,
  loading: true,
  setSelectedVideo: (videoId, progress = 0) =>
    set(() => ({
      selectedVideoId: videoId,
      videoProgress: progress,
    })),
  fetchVideos: async () => {
    set({ loading: true });
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'videos'));
      const videos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      set({ videos, loading: false });
      console.log('fetching videos:', videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      set({ loading: false });
    }
  },
}));
