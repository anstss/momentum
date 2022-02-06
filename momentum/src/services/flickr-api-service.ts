import axios from "axios";
import IFlickrPhoto from "../types/IFlickrPhoto";

interface IPhotoResponse {
  photos: IPhotoInfo;
}

interface IPhotoInfo {
  photo: IFlickrPhoto[];
}

const FLICKR_BASE_URL = "https://www.flickr.com/services/rest/";

export class FlickrApiService {
  getImageList = async (timeOfDay: string) => {
    const params = {
      method: "flickr.photos.search",
      api_key: "d00bdb3b02450e6914ccf2df29b86050",
      tags: `nature,${timeOfDay}`,
      tag_mode: "all",
      format: "json",
      nojsoncallback: 1,
      extras: "url_h",
      per_page: 500,
    };
    try {
      const res = await axios.get<IPhotoResponse>(FLICKR_BASE_URL, { params });
      return res.data.photos.photo;
    } catch (error) {
      return error;
    }
  };

  filterImageList = (imageList: IFlickrPhoto[]): IFlickrPhoto[] => {
    const onlyBigImages = imageList.filter(
      (img: IFlickrPhoto) => img.width_h >= 1600
    );
    return onlyBigImages;
  };

  getFilteredBackgroundImageList = async (timeOfDay: string) => {
    const res = await this.getImageList(timeOfDay);
    if (res instanceof Error)
      throw new Error(
        `Unable to load background image. Error: ${res.message}. Please try reloading the page or try again later`
      );
    const imageList = this.filterImageList(res);
    if (imageList.length === 0)
      throw new Error(
        "Unable to load background image. Please try reloading the page or try again later"
      );
    return imageList;
  };
}
