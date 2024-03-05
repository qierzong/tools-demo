import React from 'react';
import Layout, { InputArea, MainContent, SidePanel } from './components/layout/Layout';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Sidebar, { AnnotationResultPanel } from './components/layout/sidebar';
import Annotation from './components/annotation/Annotation';
import store from './components/store';
import AnnotationResult from './components/annotationResult/AnnotationResult';
import { observer } from 'mobx-react';
import './app.scss';
import InputWrapper from './components/input/InputWrapper';
import Instruction from './components/instruction/Instruction';

interface AppProps {
}

class App extends React.Component<AppProps> {

  constructor(props: AppProps) {
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
            />
            <Sidebar>
              <AnnotationResultPanel>
                <AnnotationResult
                  value={store.shapes}
                  onselect={(shape, index) => store.setCurrentShape(shape, index)}
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

export default observer(App);