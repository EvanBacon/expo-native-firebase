import React from 'react';
import { createAnimatableComponent } from 'react-native-animatable';
import {Image} from 'react-native';

const ProgressFadeInImage = createAnimatableComponent(Image);

export default class ProgressImage extends React.PureComponent {
  render() {
    const { onLoad, ...props } = this.props;
    return (
      <ProgressFadeInImage
        ref={e => (this.imageRef = e)}
        {...props}
        onLoad={() => {
          if (onLoad) onLoad();
          if (this.imageRef.fadeIn) this.imageRef.fadeIn();
        }}
      />
    );
  }
}
