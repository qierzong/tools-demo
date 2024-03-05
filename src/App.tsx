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
          <MainContent>
          <InputWrapper
              tagValue={store.currentShape}
            />
          </MainContent>
          <SidePanel>
          <Annotation
              onChange={(shapes) => store.setShapes(shapes)}
            />
            <Sidebar>
              <AnnotationResultPanel>
                <AnnotationResult
                  value={store.shapes}
                  onselect={(shape) => store.setCurrentShape(shape)}
                  currentShape={store.currentShape} />
              </AnnotationResultPanel>
            </Sidebar>
          </SidePanel>
        </Layout>
      </LayoutWrapper>
    );
  }
}

export default observer(App);