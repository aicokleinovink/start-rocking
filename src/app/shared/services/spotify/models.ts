export interface SpotifyAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface SpotifyTracksResponse {
  tracks: {
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
  }[];
}
