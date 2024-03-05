import React from 'react';
import Layout, { InputArea, MainContent, SidePanel } from '../components/layout/Layout';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import Sidebar, { AnnotationResultPanel } from '../components/layout/sidebar';
import store, { GroupItem } from './store';
import AnnotationVideoResult from '../components/annotationVideoResult/AnnotationVideoResult';
import { observer } from 'mobx-react';
import InputWrapper from '../components/input/InputWrapper';
import Instruction from '../components/instruction/Instruction';
import AnnotationVideo from '../components/annotationVideo/AnnotationVideo';
import { Rect } from '../components/shapes/rect';
import '../app.scss';

interface VideoCompProps {
}

class VideoComp extends React.Component<VideoCompProps> {

  constructor(props: VideoCompProps) {
    super(props);
  }

  async componentDidMount() {
    await store.init();
  }

  updateShapes = (value: { time: string, shape: Rect[] }) => {
    store.updateShapes(value)
  }

  timeUpdated = (time: string) => {
    const { shapes } = store;
    if (shapes && time && shapes[time] && shapes[time].shape) {
      store.setCurrentGroup(time)
    }
  }
  render() {
    return (
      <LayoutWrapper
        className="demo-app"
      >
        <Layout>
          <SidePanel>
            <AnnotationVideo
              onChange={this.updateShapes}
              onTimeUpdate={this.timeUpdated}
            />
            <Sidebar>
              <AnnotationResultPanel>
                <AnnotationVideoResult
                  value={store.shapes}
                  currentGroupKey={store.currentGroup}
                  onSelect={(shape, index) => store.setCurrentShape(shape, index)}
                  onSelectGroup={(groupKey: string) => store.setCurrentGroup(groupKey)}
                />
              </AnnotationResultPanel>
            </Sidebar>
          </SidePanel>
          <MainContent>
            <Instruction />
            <InputWrapper
              value={store.shapes && store.currentGroup ? store.shapes[store.currentGroup].inputValue : ''}
              onChange={(val: string) => store.setInputValue(val)}
            />
          </MainContent>
        </Layout>
      </LayoutWrapper>
    );
  }
}

export default observer(VideoComp);
