import React from 'react';
import Layout, { MainContent, SidePanel } from '../components/layout/Layout';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import Sidebar, { AnnotationResultPanel } from '../components/layout/sidebar';
import Annotation from '../components/annotation/Annotation';
import store from './store';
import AnnotationResult from '../components/annotationResult/AnnotationResult';
import { observer } from 'mobx-react';
import InputWrapper from '../components/input/InputWrapper';
import Instruction from '../components/instruction/Instruction';
import '../app.scss';

interface ImageCompProps {
}

class ImageComp extends React.Component<ImageCompProps> {

  constructor(props: ImageCompProps) {
    super(props);
  }

  async componentDidMount() {
    await store.init();
  }

  render() {
    return (
      <LayoutWrapper
        className="demo-app"
      >
        <Layout>
          <SidePanel>
            <Annotation
              onChange={(shapes) => store.setShapes(shapes)}
              imageSrc= 'https://oss-prd.appen.com.cn:9001/appen-matrixgo/test/dogs.jpg'
            />
            <Sidebar>
              <AnnotationResultPanel>
                <AnnotationResult
                  value={store.shapes}
                  onSelect={(shape, index) => store.setCurrentShape(shape, index)}
                />
              </AnnotationResultPanel>
            </Sidebar>
          </SidePanel>
          <MainContent>
            <Instruction />
            <InputWrapper
              value={store.inputValue}
              onChange={(val: string) => store.setInputValue(val)}
            />
          </MainContent>
        </Layout>
      </LayoutWrapper>
    );
  }
}

export default observer(ImageComp);
