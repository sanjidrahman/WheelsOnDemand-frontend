import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ImgResolution, ImgCropperConfig, ImgCropperEvent, LyImageCropper } from '@alyle/ui/image-cropper';
import { lyl, StyleRenderer } from '@alyle/ui';

const styles = () => {
  return {
    actions: lyl `{
      display: flex
    }`,
    cropper: lyl `{
      max-width: 400px
      height: 300px
    }`,
    flex: lyl `{
      flex: 1
    }`
  };
};

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class ImageCropperComponent {
  classes = this.sRenderer.renderSheet(styles);
  croppedImage?: string;
  ready!: boolean;
  result!: string;
  myConfig: ImgCropperConfig = {
    width: 150, // Default `250`
    height: 150, // Default `200`,
    // output: ImgResolution.OriginalImage,// Default ImgResolution.Default
    round: true,
    output: {
      width: 200,
      height: 250
    },
  };
  @ViewChild(LyImageCropper, { static: true }) readonly cropper!: LyImageCropper;

  constructor(
    readonly sRenderer: StyleRenderer
  ) { }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
  }

}
