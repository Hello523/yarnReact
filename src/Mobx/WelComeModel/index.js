
import {observable, useStrict, action, computed} from "mobx";


class WelComeModel {
  @observable info = {};
  @observable birthday = "hello Mobx";

  constructor() {
  }

}

export default new WelComeModel();