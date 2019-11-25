import endpoints from '../config/api';
import constants from '../constants/constants';
import { observable, runInAction, action } from 'mobx';
import { random, concat, map, shuffle } from 'lodash';
import { ImageClass } from '../helpers/imageClass';
export default class ImagesStore {
  isLoading = observable.box(true);
  imagesList = observable.map();
  checkedList = observable.map();
  showPopUp = observable({
    value: false,
    text: '',
  });
  getImgList = action(async () => {
    const topicAmount = random(constants.DEFAULT_MIN, constants.DEFAULT_MAX);
    const randomAmount = constants.ALL_AMOUNT - topicAmount;
    let topicImages = await this.getImageData(topicAmount, constants.TOPIC);
    let randomImages = await this.getImageData(randomAmount);
    if (
      randomImages.hits.find(hit => hit.tags.includes(`${constants.TOPIC}`))
    ) {
      randomImages = await this.getImageData(randomAmount);
    }
    runInAction(() => {
      const temp = map(
        topicImages.hits,
        im =>
          new ImageClass(
            im.webformatURL,
            im.webformatWidth,
            im.webformatHeight,
            'valid',
            im.id,
          ),
      );
      const temp1 = map(
        randomImages.hits,
        im =>
          new ImageClass(
            im.webformatURL,
            im.webformatWidth,
            im.webformatHeight,
            '',
            im.id,
          ),
      );
      this.imagesList.set('images', shuffle(concat(temp, temp1)));
      this.isLoading.set(false);
    });
  });

  toggleIsSelected = action((id, value) => {
    this.checkedList.set(id, value);
  });

  handleReset = action(() => {
    this.imagesList.clear();
    this.checkedList.clear();
    this.getImgList();
  });
  handleVerify = action(() => {
    let valid = false;
    const correctList = this.imagesList.get('images').filter(img => img.valid);
    if (this.checkedList.size !== correctList.length) {
      valid = false;
    } else {
      correctList.forEach(img => {
        valid = this.checkedList.get(img.id) ? true : false;
      });
    }

    this.setResultPopup(valid);
  });

  setResultPopup = action(valid => {
    this.togglePopUp(true);
    this.showPopUp.text = valid ? 'Success' : 'Please, try again';
  });

  togglePopUp = action(value => {
    this.showPopUp.value = value;
    !value && this.handleReset();
  });

  getImageData = async (amount, topic) => {
    try {
      const pageNumber = random(1, 50);
      const phrase = topic ? `&q=${topic}` : '';
      this.isLoading.set(true);
      let imageData = await fetch(
        `${endpoints.endpoint}&page=${pageNumber}&per_page=${amount}${phrase}`,
        {
          method: 'GET',
        },
      );
      let res = await imageData.json();
      if (parseInt(res.totalHits) > 0) {
        return res;
      } else {
        throw new Error('No hits');
      }
    } catch (error) {
      runInAction(() => {
        this.isLoading.set(false);
      });
    }
  };
}
