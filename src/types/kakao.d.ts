export {};

declare global {
  interface Window {
    Kakao: {
      Auth: {
        login(options: {
          success: () => void;
          fail: (err: unknown) => void;
        }): void;
      };
      API: {
        request(options: {
          url: string;
          success: (res: KakaoUserResponse) => void;
          fail: (err: unknown) => void;
        }): void;
      };
      isInitialized(): boolean;
      init(key: string): void;
    };
  }

  interface KakaoUserResponse {
    id: number;
    kakao_account: {
      profile: {
        nickname: string;
        profile_image_url: string;
      };
    };
  }
}
